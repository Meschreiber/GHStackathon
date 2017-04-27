/* globals
    jQuery:true, _:true,
    WufooRuleLogic:true,
    RunningTotal:true,
    WufooFormLogic:true,
    WufooFieldLogic:true,
    selectEuroDateOnForm:true,
    selectDateOnForm:true,
    finishDeleteFile: true,
    selectEuroDate: true */
;(function (window, document, $, _, undefined ){
  'use strict';

  function PublicForm (runInit, isEntryManager) {
    this.isEntryManager = isEntryManager;

    if ( runInit ) {
      this.runInit();
    }

    this.ruleLogic = new WufooRuleLogic(this);
    this.runningTotal = new RunningTotal(this);
  }

  _.merge(PublicForm.prototype, {

    formLogic: new WufooFormLogic(),
    fieldLogic: new WufooFieldLogic(),
    runningTotal: '',
    ruleLogic: '',
    formHeight: '',
    timerActive: false,
    genericInputs: {},
    sortedTabindexes: [],
    isEntryManager: false,

    // alextodo translate
    unableToChangeFile: 'We were unable to change your file.',

    runInit: function() {
      var redirectingToPaymentPage = this.continueToPaypal();
      this.initCalendars();
      this.formLogic.setLoadTime();
      this.formLogic.observeFormSubmit();
      this.fieldLogic.initializeFocus();
      this.fieldLogic.showRangeCounters();
      if (!redirectingToPaymentPage) {
        this.formLogic.initAutoResize(0);
      }
      this.setFormHeight();
      this.handleTabs();
      this.addOffsetForCaptcha();
      this.formLogic.initAutoResize(this.formLogic.offset);
      this.fieldLogic.ratingToggle();
      this.fieldLogic.checkFileSize();
    },

    addOffsetForCaptcha: function() {
      var IE6 = (navigator.userAgent.indexOf('MSIE 6') >= 0);

      if ( IE6 && $('.captcha').length > 0 ) {
        this.formLogic.offset = 30;
      }
    },

    // Bind the calendar.js to the calendar objects.
    initCalendars: function() {
      var $dateLIs = $('li.date, li.eurodate');

      _.forEach($dateLIs, function (li) {
        var start = li.id.indexOf('li') +2;
        var calendaFieldID = li.id.substring(start);
        var $field1 = $('#Field'+ calendaFieldID +'-1');
        var $field2 = $('#Field'+ calendaFieldID +'-2');
        var $field3 = $('#Field'+ calendaFieldID );
        //var selectFn =  ($(li).hasClass('eurodate')) ? selectEuroDateOnForm : selectDateOnForm;

        $(li).find('.datepicker').datepicker().on('changeDate', function(ev) {
          var newDate = new Date(ev.date);
          var mo = padNumberArray(newDate.getMonth()+1, 2);
          var day = padNumberArray(newDate.getDate(), 2);
          var year = padNumberArray(newDate.getFullYear(), 4);

          if ($(this).data('date-format') === 'yyyy-mm-dd') {
            if ($field1.val() !== mo) {
              $field1.val(mo).trigger('change');
            }

            if ($field2.val() !== day) {
              $field2.val(day).trigger('change');
            }

            if ($field3.val() !== year) {
              $field3.val(year).trigger('change');
            }
          } else {
            if ($field1.val() !== day) {
              $field1.val(day).trigger('change');
            }

            if ($field2.val() !== mo) {
              $field2.val(mo).trigger('change');
            }

            if ($field3.val() !== year) {
              $field3.val(year).trigger('change');
            }
          }
          $(this).datepicker('hide')
        });



      });
    },

    handleTabs: function() {
      // IE & Opera tab correctly.
      if ( $.browser.msie || $.browser.opera ) {
        return;
      }

      var $inputs;
      var self = this;

      this.genericInputs = {};
      this.sortedTabindexes = [];

      if (this.isEntryManager) {
        var $entryForm = $('#entry_form');
        $inputs = $entryForm.find('input, textarea, select');
      } else {
        $inputs = $('input, textarea, select');
      }

      var validInputs = [];

      _.forEach($inputs, function (input) {
        var li = self.getFieldLI(input);
        var $li = $(li);

        if ( $li.hasClass('hideAddr2') ) {
          if ( !$(input.parentNode).hasClass('addr2') ) {
            validInputs.push(input);
          }
        } else if ( $li.hasClass('hideAMPM')) {
          if( !$(input.parentNode).hasClass('ampm') ) {
            validInputs.push(input);
          }
        } else if ( $li.hasClass('hideSeconds') ) {
          if ( !$(input.parentNode).hasClass('seconds') ) {
            validInputs.push(input);
          }
        } else if( $li.hasClass('hideCents') ) {
          if ( !$(input.parentNode).hasClass('cents') ) {
            validInputs.push(input);
          }
        } /*else if ($li.hasClass('rule_hide') || $li.hasClass('hide') || $li.hasClass('cloak') ) {
          // Skip the entire LI
        } else if( input.id === 'comment') {
          // Skip the comment textarea field.
        }*/ else if (input.type !== 'hidden') {
          validInputs.push(input);
        }
      });


      var inputs = validInputs;
      var noTabIndexes = [];
      var highestTabIndex = 1;

      _.merge(inputs, function(input) {
        var tabIndex = $(input).attr('tabindex');
        if (tabIndex > 0 && _.indexOf(self.sortedTabindexes, tabIndex) === -1) {
          // Ignore file fields in Firefox
          if ( $.browser.mozilla && input.type === 'file') {
            return;
          }

          if(tabIndex > highestTabIndex) {
            highestTabIndex = tabIndex;
          }

          $(input).on('keydown', _.bind(self.tabToInput, self));
          self.genericInputs[$(input).attr('tabindex')] = input;
          self.sortedTabindexes.push($(input).attr('tabindex'));
        }
      });

      this.sortedTabindexes.sort(function(a, b) {
        return a - b;
      });

      _.forEach(noTabIndexes, function (noTab) {
        highestTabIndex = highestTabIndex + 1;
        $(noTab).on('keydown', _.bind(self.tabToInput, self));
        $(noTab).attr('tabindex', highestTabIndex);
        self.genericInputs[highestTabIndex] = noTab;
        self.sortedTabindexes.push(highestTabIndex);
      });
    },

    getFieldLI: function(field) {
      var $li = $(field).closest('li[id^="fo"]');
      return $li.length? $li[0] : field;
    },

    tabToInput: function(event) {

      if ( event.keyCode === 9 && this.sortedTabindexes.length > 0 ) {
        var nextField;
        var self = this;
        var currTabIndex = Number(event.currentTarget.getAttribute('tabindex'));
        var firstInputElement = this.genericInputs[this.sortedTabindexes[0]];
        var lastInputElement = this.genericInputs[this.sortedTabindexes[this.sortedTabindexes.length - 1]];

        if (!event.shiftKey && currTabIndex === $(lastInputElement).attr('tabindex')) {
          nextField = firstInputElement;
        } else if (event.shiftKey && currTabIndex === $(firstInputElement).attr('tabindex')) {
          nextField = lastInputElement;
        } else {
          _.every(this.sortedTabindexes, function (tabIndex, i) {
            if (tabIndex === currTabIndex) {
              var nextTabIndex = (event.shiftKey) ? self.sortedTabindexes[i - 1] : self.sortedTabindexes[i + 1];
              nextField = self.genericInputs[nextTabIndex];
              return false;
            }
            return true;
          });
        }

        if (nextField) {
          nextField.focus();

          // Cancel the event so that the form doesn't attempt handle tab key
          if(event && event.preventDefault) {
            event.preventDefault();
          } else {
            return false;
          }
        }
      }

    },

    setFormHeight: function() {
      this.formHeight = document.body.offsetHeight + this.formLogic.offset;
    },

    continueToPaypal: function() {
      var redirectingToPaymentPage = false;
      var $merchant = $('#merchant');
      var $merchantMessageText = $('#merchantMessageText');

      if ($merchant.length) {
        redirectingToPaymentPage = true;
        if ($merchantMessageText.length) {
          $merchantMessageText.show();
          $('#merchantButton').hide();
        }
        $merchant.trigger('submit');
      }

      return redirectingToPaymentPage;
    },

    //Ajax Request for deleting file when paging back
    deleteFile: function(fieldId, file_name, container, removal, removeFile, formId) {
      $.ajax({
        url: '/forms/File.Change.php',
        dataType: 'json',
        data: {
          entryId: $('#EntryId').val(),
          fieldId: fieldId,
          fileName: file_name,
          formId: formId
        },
      }).done(function (result) {
        finishDeleteFile(result, removeFile, removal, container);
      });

      // Ajax.Request(
      // '/forms/File.Change.php', {
      //   parameters: 'entryId=' + $('EntryId').value + '&fieldId='+fieldId+'&fileName='+file_name+'&formId='+formId,
      //   onComplete: function(r) {
      //     var ret = r.responseText.evalJSON();
      //     finishDeleteFile(ret, removeFile, removal, container);
      //   }
      // });
    },

    failedDeleteFile: function() {
      alert(this.unableToChangeFile);
    },

    successfulDeleteFile: function(removeFile, removal, container) {
      $(removeFile).remove();
      $(removal).hide();
      $(container).show();
    },

    handleInput: function(el, count) {
      if(!this.timerActive) {
        this.formLogic.beginTimer();
        this.timerActive = true;
      }
      this.ruleLogic.process(el, count);
      this.runningTotal.updateTotal(el);
      this.adjustFormHeight();
    },

    doSubmitEvents: function() {
      this.formLogic.endTimer();
      this.formLogic.setClick();
    },

    adjustFormHeight: function() {
      var currentHeight = document.body.offsetHeight + this.formLogic.offset;

      if (this.formHeight !== currentHeight) {
        this.formLogic.initAutoResize(this.formLogic.offset);
        this.setFormHeight();
      }
    },

    selectDateOnForm: function(cal) {
      selectDate(cal);

      var p = cal.params;
      var year = p.inputField.id;
      $('#'+year).trigger('change');
    },

    selectEuroDateOnForm: function(cal) {
      selectEuroDate(cal);

      var p = cal.params;
      var year = p.inputField.id;
      $('#'+year).trigger('change');
    }

  });

  function padNumberArray(n, len) {
    return (new Array(len + 1).join('0') + n).slice(-len);
  }

  PublicForm.prototype.selectEuroDateOnForm = PublicForm.prototype.selectDateOnForm;


  /* exports */
  window.PublicForm = PublicForm;

}(window, document, jQuery, _ ));
