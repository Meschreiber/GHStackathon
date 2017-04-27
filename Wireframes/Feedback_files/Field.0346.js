/* global jQuery:true, _:true, __FIELD_TOP:true, __PF:true, __MNG:true , fieldHighlight: true */
;(function (window, document, $, _) {
  'use strict';

  function WufooFieldLogic() {

  }

  _.merge(WufooFieldLogic.prototype, {
    
    // show instructions. add class name of focus to field. on blur remove focus.
    // for radio and checkboxes, they have to be cleared manually, so they are added to the
    // global array highlightArray so we dont have to loop through the dom every time.
    initializeFocus: function(){
      var fields = $('.field');

      // This whole thing is insane.
      _.forEach(fields, function (field) {
        var $field = $(field);
        var type = $field.attr('type');

        if (type === 'radio' || type === 'checkbox') {
          $field.on('click', function () {
            fieldHighlight(this, 4);
          });

          $field.on('focus', function () {
            fieldHighlight(this, 4);
          });
        } else if ( $field.hasClass('addr') || $field.hasClass('other') ) {
          $field.on('focus', function () {
            fieldHighlight(this, 3);
          });
        } else {
          $field.on('focus', function () {
            fieldHighlight(this, 2);
          });
        }
      });
    },
    
    highlight: function(el, depth) {
      var fieldContainer;

      fieldContainer = (depth === 2) ?
        el.parentNode.parentNode
        :(depth === 3) ?
        el.parentNode.parentNode.parentNode
        :(depth === 4) ?
        el.parentNode.parentNode.parentNode.parentNode
        :null;
      
      var $fieldContainer = $(fieldContainer);
      var $focusedFields = $('.focused');
      var $lola = $('#lola');

      $fieldContainer.addClass('focused');

      _.forEach($focusedFields, function (field) {
        if (field !== $fieldContainer[0]) {
          $(field).removeClass('focused');
        }
      });

      if ( $(document.getElementsByTagName('html')[0]).hasClass('embed') && $lola.length ) {
        var __FIELD_TOP = window.__FIELD_TOP = -5;

        var getOffsetTop = function( elem ){
          var offsetTop = 0;
          do {
            if ( !isNaN( elem.offsetTop ) ) {
              offsetTop += elem.offsetTop;
            }
            elem = elem.offsetParent
          } while ( elem );
          return offsetTop;
        }

        __FIELD_TOP += getOffsetTop($fieldContainer[0]);

        var offset = $('#header')[0].offsetHeight;
        $lola.css('margin-top', __FIELD_TOP - offset);
      }
    },
    
    showRangeCounters: function(){
      var $counters = $('em.currently');
      _.forEach($counters, function( counter ) {
        $(counter).css('display', 'inline');
      });
    },
    
    validateRange: function(ColumnId, RangeType) {
      var $msg = $('#rangeUsedMsg'+ ColumnId);
      var field = document.getElementById('Field'+ColumnId);

      if ($msg.length) {
        if (RangeType === 'character') {
          $msg.html(this.getCharacterMessage( field ));
        } else if (RangeType === 'word') {
          $msg.html(this.getWordMessage(field));
        } else if (RangeType === 'digit') {
          $msg.html(this.getDigitMessage(field));
        }
      }
    },
    
    getCharacterMessage: function(field) {
      return field.value.length;
    },
    
    getWordMessage: function(field) {
      var val = trim($(field).val().replace(/\n/g, ' '));
      var words = val.split(' ');
      var used = 0;
      var i =0;

      for (; i < words.length; i++) {
        if (words[i].replace(/\s+$/,'') !== '') {
          used++;
        }
      }

      return used;
    },

    getDigitMessage: function(field) {
      return field.value.length;
    },

    ratingToggle: function() {
      this.setRating();
    },

    /* todo: revisit this */
    setRating: function() {
      var self = this;
      // live binding to document because entryManager uses ajax
      $(document).on('click', function(e) {
        var $ratings = $(e.target).closest('.rating');
        if ( $ratings.length ) {
          var el = $ratings[0],
              inputEl = $(el.getElementsByTagName('input')[0]),
              currentRating = inputEl.attr('value') || 0,
              newRating = $(e.target).attr('value'),
              elems = el.getElementsByTagName('span');

          self.toggleRatingElement(inputEl[0], newRating, currentRating, elems);
        }
      });
    },

    toggleRatingElement: function(inputEl, newRating, currentRating, elems) {
      var $inputEl = $(inputEl);
      // toggle between value and 0
      if (newRating === currentRating) {
        newRating = 0;
      }

      // set clicked value for css
      _.forEach(elems, function (el) {
        var $el = $(el);
        // add or remove 'clicked' class
        $el[ (($el.attr('value') <= newRating)?'add':'remove') + 'Class' ]('clicked');
      });
      
      $inputEl.val( ((newRating > 0)? newRating : '') );
      this.attachRatingRulesHandler(inputEl);
    },

    attachRatingRulesHandler: function(el) {
      var env = (typeof __PF !== 'undefined')? '__PF':'__MNG';
      if (window[env] && window[env].handleInput) {
        window[env].handleInput(el);
      }
    },

    checkFileSize: function() {
      // only run if browser has File API
      if (!window.File || !window.FileList) {
        return;
      }

      function onChangeHandler (el) {
        return function (evt) {
          var $parentLi = $(el.parentNode.parentNode);
          var file = evt.target.files[0];

          // reset error status on change
          $parentLi.removeClass('error');
          $parentLi.find('.error').remove();
          // if (errorMessages.length > 0) {
          //   errorMessages[0].parentNode.removeChild(errorMessages[0]);
          // }

          if (file && file !== undefined) {
            // convert size from bytes
            var size = file.size / 1000 / 1000;
            size = Math.round(size * 100) / 100;

            if (size > 10) {
              // set error message
              var errorMessage = 'File must be below 10MB. That one was ' + size + 'MB!';
              setLocalFieldError($parentLi, errorMessage);
              // reset the input field.
              // getting crazy for IE's
              var clone = el.cloneNode();
              $(clone).on('change', onChangeHandler(clone));
              $(el).replaceWith(clone)
              
              if (clone.value) {
                clone.value = '';
              }
            }

          }
        };
      }

      _.forEach($('.file'), function(el) {
        $(el).on('change', onChangeHandler(el) )
      });
    }
  });

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  function setLocalFieldError ($container, message) {
    var newError = document.createElement('p');
    $(newError).addClass('error').html(message);
    $container.addClass('error');
    $container.append(newError);
  }

  /* exports */
  window.WufooFieldLogic = WufooFieldLogic;

}(window, document, jQuery, _ ));
