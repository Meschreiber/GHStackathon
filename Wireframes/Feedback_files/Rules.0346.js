/* global jQuery:true, _:true, __RULES: true, __ENTRY:true, WufooConditions:true, handleInput:true  */
;(function (window, document, $, _) {
  'use strict';

  function inputHandler(event) {
    this.blur();
    this.focus();
  }

  function WufooRuleLogic(publicForm) {
    this.PublicForm = publicForm;

    this.initializeVariables(this.PublicForm.isEntryManager);
    this.attachFakeOnchangeToRadioButtons();
    this.attachOnChangeToSelectFields();
  }

  _.merge(WufooRuleLogic.prototype, {

    formId: '',
    valueHash: {},
    hiddenHash: {},
    isEntryManager: false,

    Rules: '',
    PublicForm: '',
    ConditionService: '',
    Entry: {},
    RulesByConditionFieldName: {},
    processAfterShowArray: {},

    initializeVariables: function(isEntryManager) {
      if (typeof __RULES !== 'undefined') {
        this.Rules = __RULES;
        this.RulesByTargetField = this.organizeRulesByTargetField();
      }

      if (typeof __ENTRY !== 'undefined') {
        this.Entry = __ENTRY;
      }

      if (typeof isEntryManager !== 'undefined') {
        this.isEntryManager = isEntryManager;
      }

      this.ConditionService = new WufooConditions(this.isEntryManager, this.Entry);
    },

    getRuleFieldsOriginalState: function(rules) {
      var ogStates = {};

      _.forEach(rules, function(rule, index) {
        var $el = this.getLiEl(rule.FormId, rule.Setting.FieldName);
        if ($el) {
          ogStates[$el.attr('id')] = null
        }
      })
    },

    // Fixes radio and checkbox problem with ie6+
    attachFakeOnchangeToRadioButtons: function() {
      var $liInputs = (this.isEntryManager)? $('li input.field'): $('input');

      _.forEach($liInputs, function (input) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          $(input).on('click', inputHandler);
        }
      });

    },

    // Some browsers have faulty select elements so we attach
    // the onchange event onload to them
    attachOnChangeToSelectFields: function() {
      function handler() {
        handleInput(this);
      }

      if (this.attachOnChangeToSelect()) {
        var $liInputs = (this.isEntryManager) ? $('li select.field') : $('select');

        _.forEach($liInputs, function (input) {
          $(input).on('change', handler);
        });
      }
    },

    attachOnChangeToSelect: function() {
      if(navigator.userAgent.toLowerCase().indexOf('chrome') !== -1) {
        // Browser is chrome
        return true;
      } else if (/ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase())) {
        // Browser is ipad or iphone safari
        return true;
      } else if (navigator.appVersion.indexOf('Win') !== -1 && $.browser.webKit) {
        // Browser is Safari on Windows
        return true;
      } else if (navigator.appVersion.indexOf('Mac') !== -1 && $.browser.opera) {
        // Browser is Opera on Mac
        return true;
      } else {
        return false;
      }
    },

    organizeRulesByTargetField: function() {

      for (var fieldId in this.Rules) {
        var rules = this.Rules[fieldId];

        for (var i=0; i < rules.length; i++) {
          var rule = rules[i];

          if ( typeof rule !== 'undefined') {
            if (this.formId === '') {
              this.formId = rule.FormId;
            }

            for (var j=0; j < rule.Conditions.length; j++) {
              var c = rule.Conditions[j];
              this.addToRulesByConditionFieldName(rule.Setting.FieldName, c.FieldName);
            }
          }
        }
      }

    },

    addToRulesByConditionFieldName: function(key, value) {
      var columnId = 'Field' + value;

      if (_.isArray(this.RulesByConditionFieldName[key])) {
        if (_.indexOf(this.RulesByConditionFieldName[key], columnId) === -1) {
          this.RulesByConditionFieldName[key].push(columnId);
        }
      } else {
        this.RulesByConditionFieldName[key] = [columnId];
      }
    },

    process: function(el, count) {
      var rules = this.getRules(el);
      var self = this;
      if (typeof rules !== 'undefined') {
        _.forEach(rules, function(rule) {
          if (self.ConditionService.match(rule)) {
            self.toggleDisplay(rule, false, count);
          } else {
            self.toggleDisplay(rule, true, count);
          }
        });
      }
    },

    processAll: function() {
      var self = this;
      _.forEach(this.Rules, function(rules) {
        _.forEach(rules, function(rule) {

          if (self.ConditionService.match(rule)) {
            self.toggleDisplay(rule, false);
          } else {
            self.toggleDisplay(rule, true);
          }
        });
      })
    },

    getRules: function(el) {
      // remove the two possible suffixes, delimited by _, -
      var idArray = el.id.split('_');
      idArray = idArray[0].split('-');

      return this.Rules[idArray[0]];
    },

    toggleDisplay: function(rule, inverse, count) {
      var liEl = this.getLiEl(rule.FormId, rule.Setting.FieldName);
      var $liEl = $(liEl);
      // Entry Manager overrides hide to actually show. Use rule_hide
      var className = (this.isEntryManager) ? 'rule_hide' : 'hide';

      if ($liEl.length) {
        var originalClassName = trim(liEl.className).replace(/\n/g,'');

        // To show...
        if ((rule.Type === 'Show' && !inverse) || (rule.Type === 'Hide' && inverse)) {
          $liEl.removeClass(className);

        }

        // When hiding...
        if ((rule.Type === 'Hide' && !inverse) || (rule.Type === 'Show' && inverse)) {
          $liEl.removeClass('error');
          $liEl.removeClass('hide');
          $liEl.removeClass('rule_hide');
          $liEl.addClass(className);

        }

        var newClassName = trim(liEl.className).replace(/\n/g,'');

        if (originalClassName !== newClassName) {
          this.processElAfterShow(liEl, rule.Setting.FieldName, count);
        }

        this.PublicForm.handleTabs();
      }
    },

    processElAfterShow: function(liEl, fieldName, count) {
      this.processThreeStandardInputs(liEl, count);
      var conditionIds = this.RulesByConditionFieldName[fieldName];

      for (var i=0; i < conditionIds.length; i++) {
        var conditionLiEl = this.getLiEl(this.formId, conditionIds[i]);
        if (conditionLiEl) {
          this.processThreeStandardInputs(conditionLiEl, count);
        }
      }
      // var checkies = $(liEl).find('input[type="radio"],input[type="checkbox"]');
      // checkies.each(function(el) {
      //   $(this).prop('checked', false);
      // });
    },

    getLiEl: function(formId, fieldName) {
      fieldName = fieldName.replace('Field', '');
      var liEl = $('#fo'+formId+'li'+fieldName);
      // Entry manager initially uses li id's like foli[columnId]
      // after error uses fo[formId]li[columnId]
      liEl = (liEl.length) ? liEl : $('#foli'+fieldName);

      return liEl[0];
    },

    processThreeStandardInputs: function(liEl, count) {
      this.findInputsAndCallHandleInput('input', liEl, count);
      this.findInputsAndCallHandleInput('select', liEl, count);
      this.findInputsAndCallHandleInput('textarea', liEl, count);
    },

    procceedWithComparisonOld: function(liEl) {
      var proceed = false;
      var $liEl = $(liEl);

      if ($liEl.length) {
        if (!$liEl.hasClass('hide') && !$liEl.hasClass('rule_hide')) {
          proceed = true;
        }
      }

      return proceed;
    },

    findInputsAndCallHandleInput: function(tag, liEl, count) {
      var $liInputs = (this.isEntryManager) ? $('#main #' + liEl.id + ' ' + tag + '.field'): $(liEl).find(tag);
      var liInputs = this.findInputsToHandle($liInputs);
      this.handleInputOnAllElements(liEl, liInputs, count);
    },

    // if field is a radio type field, only use the selected radio button
    findInputsToHandle: function(liInputs) {
      var hasRadio = false;
      var radioInputs = [];

      for (var i=0; i < liInputs.length; i++) {
        var input = liInputs[i];
        if (input.type === 'radio') {
          hasRadio = true;
          if (input.checked) {
            radioInputs.push(input);
          }
        }
      }

      if (hasRadio) {
        return radioInputs;
      } else {
        return liInputs;
      }
    },

    handleInputOnAllElements: function(liEl, inputs, count) {

      for (var i=0; i < inputs.length; i++) {
        var input = inputs[i];

        if (this.procceedWithComparison(liEl, input)) {
          this.addToProcessAfterShowArray(input, count);

          // Rules with fields tied to each other with many input fields
          // have a many to many relationship with that causes recursion.
          // Stop recursion after 2 cycles.
          if (this.processAfterShowArray[input.id] < 3) {
            if (input.type === 'radio') {
              if (input.checked) {
                this.process(inputs[i], 1);
              }
            } else {
              this.process(inputs[i], 1);
            }
          }
        }
      }
    },

    procceedWithComparison: function(liEl, input) {
      var proceedWithComparison = false;
      var $liEl = $(liEl);
      var hiddenValue = (($liEl.hasClass('hide') && !this.isEntryManager) || $liEl.hasClass('rule_hide')) ? 'hide' : '';

      if ( typeof this.valueHash[input.id] === 'undefined' || typeof this.hiddenHash[liEl.id] === 'undefined') {
        proceedWithComparison = true;
      } else if (this.valueHash[input.id] !== input.value || this.hiddenHash[liEl.id] !== hiddenValue) {
        proceedWithComparison = true;
      }

      this.valueHash[input.id] = input.value;
      this.hiddenHash[liEl.id] = hiddenValue;

      return proceedWithComparison;
    },

    addToProcessAfterShowArray: function(input, count) {
      // A count greater than 1 means handleInput was called
      // by this function. Call handleInput up to 5 times from this function
      if (typeof count === 'undefined' || count < 1) {
        this.processAfterShowArray[input.id] = 0;
      } else {
        var elCount = this.processAfterShowArray[input.id];
        elCount = isNaN(elCount) ? 0 : elCount;

        this.processAfterShowArray[input.id] = elCount + 1;
      }
    }

  });

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }


  /* exports */
  window.WufooRuleLogic = WufooRuleLogic;

}(window, document, jQuery, _ ));
