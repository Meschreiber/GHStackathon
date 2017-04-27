/* global jQuery:true, _:true, __RULES:true, __EMBEDKEY:true */
/* 
  requires:
      jQuery  1.x   https://github.com/jquery/jquery/tree/1.x-master
      lodash  *     https://github.com/lodash/lodash
      JSON    *     https://github.com/douglascrockford/JSON-js
*/
;(function (window, document, $, _) {
  'use strict';
  
  function lambda() {}
  function preventDefault(e){e.preventDefault()}

  function WufooFormLogic() {}

  _.merge(WufooFormLogic.prototype, {
    offset: 0,
    startTime: 0,
    endTime: 0,
    loadTime: 0,

    resizeCallFromParent: function(event) {
      if (event.data === 'resize') {
        this.initAutoResize();
      }
    },

    observeFormSubmit: function() {
      var $activeForm = $('form').eq(0);
      var self = this;

      $activeForm.on('submit', function() {
        // stop all actions from happening from now on.
        $activeForm.off();
        // prevent double clicking the submit button
        $activeForm.on('submit', preventDefault);

        self.disableSubmitButton();
        // on any submit, send additional message to notify parent
        if (parent.postMessage) {
          // window.console.log('formSubmitted was fired');
          parent.postMessage('formSubmitted', '*');
        }
      });

      // This tells the browser to start a fresh new view the page
      // even if the user clicks the back button.
      // This ensures the submit button is always enabled.
      $(window).on('unload', lambda);
      // if (typeof(Event) !== 'undefined') {
      //   if (Event.observe) {
      //     Event.observe(window, 'unload', function() {});
      //   } else {
      //     Object.observeEvent(window, 'unload', function() {});
      //   }
      // } else {
      //   Object.observeEvent(window, 'unload', function() {});
      // }

    },

    disableSubmitButton: function() {
      // todo:  revisit how we determine this
      //        we shouldn't be looking for an element
      //        to determine our state
      if($('#previousPageButton').length !== 0) {
        $('#saveForm').attr('disabled', 'disabled');
      }
    },

    // If Container is less than 450pixels show alt instructs
    ifInstructs: function() {
      var $container = $('#public');

      if ($container.length) {
        if($container.offsetWidth <= 450){
          $container.addClass('altInstruct');
        }
      }
    },

    // on submit, we set a hidden field to click
    // if they us Enter to submit, this will be blank
    setClick: function() {
      $('#clickOrEnter').val('click');
    },

    /*---------------------------------
      TIMER FOR STATS
    -----------------------------------*/

    beginTimer: function() {
      this.startTime = new Date().getTime() - this.loadTime;
    },

    /* refactored */
    endTimer: function() {
      this.endTime = new Date().getTime() - this.loadTime;
      var $stats = $('#stats');
      var stats = JSON.parse($stats.val()) || {};
      stats.endTime += this.endTime;

      if (stats.startTime === 0) {
        stats.startTime = this.startTime;
      }

      $stats.val(JSON.stringify(stats));
    },

    setLoadTime: function() {
      this.loadTime = new Date().getTime();
    },

    // allow iframe to resize


    // dont resize    if in entry manager which has element submit_form_here
    initAutoResize: function(additionalOffset) {
      var key = (typeof __EMBEDKEY !== 'undefined') ? __EMBEDKEY : 'wufooForm';

      if (this.isEmbeddedForm() && key !== 'false') {
        additionalOffset = this.getAdditionalOffset(additionalOffset);

        if (parent.postMessage) {
          parent.postMessage((document.body.offsetHeight + additionalOffset)+'|'+key, '*');
        } else {
          if (this.childProxyFrameExist()) {
            this.saveHeightOnParent(document.body.offsetHeight + this.offset);
          } else {
            this.saveHeightOnServer(key, (document.body.offsetHeight + this.offset));
          }
        }
      }
    },

    getAdditionalOffset: function(additionalOffset) {
      additionalOffset = additionalOffset || 0;

      // IE7 requires a taller form
      if (navigator.userAgent.toUpperCase().indexOf('MSIE 7') !== -1) {
        additionalOffset += 70;
      }

      this.offset = additionalOffset;

      return this.offset;
    },

    isEmbeddedForm: function() {
      if ($('#submit_form_here').length) {
        return false; // in entry manager
      }

      if (parent.frames.length < 1) {
        // parent has no frames. file not embedded
        return false;
      }

      return true;
    },

    childProxyFrameExist: function() {
      var childProxyFrameExist = false;

      try {
        var childProxyFrame = parent.frames['wufooProxyFrame' + this.getFormHash()];

        // if you can read this, it's because the child proxy exist
        if (childProxyFrame.location.href.length > 0) {
          childProxyFrameExist = true;
        }
      } catch (e) {}

      return childProxyFrameExist;
    },

    /*---------------------------------
      SAVE HEIGHT ON PARENT
    -----------------------------------*/

    saveHeightOnParent: function(frameHeight) {
      try {
        var url = this.getURLToParent();
        parent.location.href = this.addFragment(url, '_h', frameHeight);
      } catch (e) {}// suppress errors that occur on integrated payment page
    },

    // child frame url is: http://user.wufoo.com/forms/blank.htm#http://particletree.com
    getURLToParent: function() {
      var url = parent.frames['wufooProxyFrame' + this.getFormHash()].location.href;
      url = url.substring(url.indexOf('#') + 1, url.length);

      return url;
    },

    getFormHash: function() {
      // formHash element exist only on integrated payment page
      var formHashLink = document.getElementById('formHash');

      if (formHashLink) {
        return formHashLink.value;
      } else {
        var href = document.location.href;
        var hrefArray = href.split('/');
        return hrefArray[4];
      }
    },

    addFragment: function(url, fragment, frameHeight) {
      url = this.removeFragment(url, fragment);
      url += '#' + fragment + '=' + frameHeight;

      return url;
    },

    removeFragment: function(url) {
      var urlArray = url.split('#');
      return urlArray[0];
    },

    /*---------------------------------
      SAVE HEIGHT ON SERVER
    -----------------------------------*/

    saveHeightOnServer: function(name, value) {
      // attempt both cookie and save to server.
      this.createTempCookie(name, value);
      document.body.appendChild(this.getScriptEl(name, value));
    },

    getScriptEl: function(name, value) {
      var rules = (this.hasRules()) ? 1 : 0;
      var $script = $(document.createElement('script'));
      var src = document.location.protocol+'//wufoo.com/forms/height.js?action=set&embedKey=';
      src += name+'&height='+value+'&rules='+rules+'&protocol='+document.location.protocol+'&timestamp='+ new Date().getTime().toString();
      $script.attr('src', src);
      //$script.attr('type','text/javascript');

      return $script[0];
    },

    hasRules: function() {
      var hasRules = false;

      if (typeof __RULES !== 'undefined') {
        if (!_.isArray(__RULES)) {
          hasRules = true;
        }
      }

      return hasRules;
    },

    isArray: function(object) {
      return _.isArray(object);
    },

    createTempCookie: function(name, height) {
      var date = new Date();
      date.setTime(date.getTime()+(60*1000));

      var expires = '; expires='+date.toGMTString();

      var rules = (this.hasRules()) ? 1 : 0;
      var value = height + '|' + rules + '|' + document.location.protocol;
      document.cookie = name+'='+value+expires+'; domain=.wufoo.com; path=/';
    },

    readTempCookie: function(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');

      for (var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1,c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length,c.length);
        }
      }
      return '';
    }
  });


  /* exports */
  window.WufooFormLogic = WufooFormLogic;

}(window, document, jQuery, _));
