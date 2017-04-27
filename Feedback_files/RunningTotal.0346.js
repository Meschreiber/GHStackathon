/*jshint multistr: true */
/* global jQuery: true, _: true, __ENTRY: true, __PRICES: true, __PRICE_TOP: true */
;(function(window, document, $, _) {
  'use strict';

  var tmpl = _.template('\
    <table id="run" border="0" cellspacing="0" cellpadding="0">\
      <tfoot>${rows}</tfoot>\
      <tbody>\
        <tr><td colspan="2"><b>${totalText}</b><span>${total}</span></td></tr>\
      </tbody>\
    </table>');


  function RunningTotal( publicForm ) {
    var self = this;
    self.publicForm = publicForm;

    if(self.showRunningTotal()) {
      self.makeGlobalVariablesSafe();

      self.entry = __ENTRY;
      self.currency = __PRICES.Currency;
      self.decimals = __PRICES.Decimals;
      self.totalText = __PRICES.TotalText;
      self.basePriceText = __PRICES.BasePriceText;
      self.basePrice = self.toNumber(__PRICES.BasePrice);
      self.organizeMerchantFields(__PRICES.MerchantFields);

      self.updateTotal();

      self.calculateTop();
      self.runLolaRun();

      var html = document.getElementsByTagName('html')[0];

      if(!$(html).hasClass('embed')){
        $(window).on('scroll',  self.runLolaRun);
      }
    }
  }

  _.merge(RunningTotal.prototype, {

    entry: '',
    decimals: 2,
    basePrice: 0,
    currency: '',
    totalText: '',
    basePriceText: '',
    publicForm: '',
    merchantFields: [ ],
    hiddenClassNames: ['rule_hide', 'hide'],

    showRunningTotal: function() {
      var canShowRunningTotal = false;

      if (!this.publicForm.isEntryManager) {
        if ($('#lola').length) {
          canShowRunningTotal = true;
        }
      }

      return canShowRunningTotal;
    },

    makeGlobalVariablesSafe: function() {
      window.__ENTRY = (typeof __ENTRY === 'undefined') ? {} : __ENTRY;

      if ( typeof __PRICES === 'undefined' || !__PRICES) {
        window.__PRICES = {BasePrice: 0, Currency : '&#36;', MerchantFields : []};
      }
    },

    calculateTop: function(){
      var el = document.getElementById('lola');
      window.__PRICE_TOP = -14;

      if (el) {
        window.__PRICE_TOP += $(el).offset().top;
        el = el.offsetParent;
      }
    },

    runLolaRun: function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop;
      var $lola = $('#lola');

      if (scrollTop >= __PRICE_TOP && $lola.length) {
        $lola.css('margin-top', scrollTop - window.__PRICE_TOP + 7 );
      } else{
        $lola.css('margin-top', 7 );
      }
    },

    organizeMerchantFields: function( rawMerchantFields ) {
      this.merchantFields = [];
      var self = this;

      _.forEach(rawMerchantFields, function(field) {
        if (String(field.Typeof) === 'checkbox') {
          _.forEach(field.SubFields, function(subField) {
            if (typeof subField === 'object') {
              self.addToMerchantFields(field, subField, 0);
            }
          });
        } else if (String(field.Typeof) === 'radio' || String(field.Typeof) === 'select') {
          var textToIndex = self.getTextToIndexs(field);

          _.forEach(field.Choices, function (choice) {
            if (typeof choice === 'object') {
              var index = textToIndex[choice.Choice];
              self.addToMerchantFields(field, choice, index);
            }
          });

        } else if (String(field.Typeof) === 'money') {
          self.addToMerchantFields(field, null, 0);
        }
      });
    },

    getTextToIndexs: function( field ) {
      var count = 0;
      var textToIndex = [];

      _.forEach(field.Choices, function () {
        var $el = $('#Field' + field.ColumnId + '_' + count);
        if ($el.length) {
          textToIndex[$el.val()] = count;
        }

        count += 1;
      });

      return textToIndex;
    },

    addToMerchantFields: function( field, subObj, i ) {
      var merchantField = {};
      var obj = (String(field.Typeof) === 'money') ? field : subObj;
      merchantField.ColumnId = 'Field' + obj.ColumnId;
      merchantField.Price = obj.Price;
      merchantField.Choice = obj.Choice;
      merchantField.Typeof = field.Typeof;
      merchantField.Index = i;

      if (String(field.Typeof) === 'checkbox') {
        merchantField.Header = obj.ChoicesText;
      } else if (String(field.Typeof) === 'money') {
        merchantField.Header = obj.Title;
      } else {
        merchantField.Header = obj.Choice;
      }

      this.merchantFields.push(merchantField);
    },

    updateTotal: function() {
      var $lola = $('#lola');
      if ($lola.length) {
        var fieldToPrices = this.getFieldToPrices();
        var tableHTML = this.buildRunningTotalTable(fieldToPrices);
        $lola.html(tableHTML);
      }
    },

    buildRunningTotalTable: function( fieldToPrices ) {
      var html = '';
      var total = this.basePrice;

      if (this.basePrice > 0) {
        html += '<tr><th>' + _.escape(this.basePriceText) + '</th>';
        html += '<td>' + this.formatNumber(this.basePrice) + '</td></tr>';
      }

      for (var i=0; i < fieldToPrices.length; i++) {
        var fieldToPrice = fieldToPrices[i];
        total = total + fieldToPrice.fieldValue;

        var className = (fieldToPrice.fieldValue < 0) ? 'negAmount' : '';

        html += '<tr class="' + className + '"><th>' + fieldToPrice.field.Header + '</th>';
        html += '<td>' + this.formatNumber(fieldToPrice.fieldValue) + '</td></tr>';
      }

      /* todo: F */
      var tplValues = {'totalText': this.totalText, 'total': this.formatNumber(total), 'rows': html};

      return tmpl(tplValues);
    },

    formatNumber: function(num) {
      var isNegative = (num < 0) ? true : false;

      num = Math.abs(num);
      num = num.toFixed(this.decimals);
      num = this.addCommas(num);
      num = this.currency + num;
      num = (isNegative) ? '-' + num : num;

      return num;
    },

    addCommas: function(nStr){
      nStr += '';
      /* why wernt these declared? does declaring them break something? */
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';

      var rgx = /(\d+)(\d{3})/;

      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }

      return x1 + x2;
    },

    getFieldToPrices: function() {
      var fieldToPrices = [];
      var fieldValue, fieldToPrice;

      for (var i=0; i < this.merchantFields.length; i++) {
        fieldValue = this.getFieldValue(this.merchantFields[i]);
        fieldValue = (String(this.merchantFields[i].Typeof) === 'money' && fieldValue < 0) ? 0 : fieldValue;

        if (fieldValue > 0 || fieldValue < 0) {
          fieldToPrice = {'fieldValue':fieldValue, 'field':this.merchantFields[i]};
          fieldToPrices.push(fieldToPrice);
        }
      }

      return fieldToPrices;
    },

    getFieldValue: function(field) {
      var value = 0;
      var el = this.getElement(field);
      var fieldType = String(field.Typeof);

      if (el) {
        if(!this.isElementHidden(el)) {
          value = this.getElementValue(field, el);
        }
      } else {
        if (fieldType === 'money') {
          value = this.entry[field.ColumnId];
        } else if (fieldType === 'checkbox') {
          if (typeof this.entry[field.ColumnId] !== 'undefined' && this.entry[field.ColumnId] !== '') {
            value = field.Price;
          }
        } else if (fieldType === 'radio' || fieldType === 'select') {
          if (field.Choice === this.entry[field.ColumnId]) {
            value = field.Price;
          }
        }
      }

      return this.toNumber(value);
    },

    getElement: function(field) {
      if (String(field.Typeof) === 'radio') {
        return $('#'+field.ColumnId + '_' + field.Index)[0];
      } else {
        return $('#'+field.ColumnId)[0];
      }
    },

    isElementHidden: function(el) {
      var isElementHidden = false;
      var li = this.publicForm.getFieldLI(el);

      if (this.hasHiddenClassName(li)) {
        isElementHidden = true;
      }

      return isElementHidden;
    },

    hasHiddenClassName: function(li) {
      var $li = $(li);
      return _.some(this.hiddenClassNames, function (className) {
        return $li.hasClass(className);
      });
    },

    getElementValue: function(field, el) {
      if (String(field.Typeof) === 'checkbox' || String(field.Typeof) === 'radio') {
        return (el.checked) ? field.Price : 0;
      } else if (String(field.Typeof) === 'select') {
        return (field.Choice === el.value) ? field.Price : 0;
      } else if (String(field.Typeof) === 'money') {
        var $field = $('#'+ field.ColumnId);
        var $field1 = $('#'+ field.ColumnId + '-1');
        // remove all non-numeric characters from the input
        $field.val($field.val().replace(/[^0-9]/g, ''));
        $field1.val($field1.val().replace(/[^0-9]/g, ''));

        var integer = $field.val();
        var decimal = $field1.val();

        return String(integer + '.' + decimal);
      }
    },

    toNumber: function(numAsString) {
      if ( typeof numAsString === 'undefined') {
        numAsString = '0';
      }

      var num = Number(numAsString);
      num = (isNaN(num)) ? 0.00 : num;

      return num;
    }

  });

  /* exports */
  window.RunningTotal = RunningTotal;


}(window, document, jQuery, _));
