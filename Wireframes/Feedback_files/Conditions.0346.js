/* global jQuery: true, _:true */
;(function (window, document, $, _ ) {
  'use strict';

  function WufooConditions( isEntryManager, entry ) {
    this.isEntryManager = isEntryManager;
    this.entry = entry;
  }

  _.merge(WufooConditions.prototype, {
    /* @public properties */
    isEntryManager: false,
    entry:     '',

    match: function( rule ) {
      var ret;
      for (var i = 0; i < rule.Conditions.length; i++) {
        ret = this.compare(rule.Conditions[i], rule.Setting.FieldTypes);

        // The second you find a match return success
        if (rule.MatchType === 'any' && ret === true) {
          ret = true;
          break;
        }

        // The second you find failure, return failure
        if (rule.MatchType === 'all' && ret === false) {
          ret = false;
          break;
        }
      }

      return ret;
    },

    /*---------------------------------
     RUN LOGIC COMPARISONS
     -----------------------------------*/

    compare: function( condition, fieldTypes ) {
      var fieldType = fieldTypes[condition.FieldName];
      var fieldValue = this.cleanForComparison( this.getFieldValue(condition.FieldName, fieldType) );
      var conditionValue = this.cleanForComparison(condition.Value);

      var ret = this[condition.Filter.replace(/ /g, '')](conditionValue, fieldValue, fieldType);
      return ret;
    },

    cleanForComparison: function( string ) {
      return trim( stripTags(String(string)).toLowerCase() );
    },

    /*---------------------------------
     GET VALUE BASED ON FIELD TYPE
     -----------------------------------*/

    getFieldValue: function( columnId, fieldType ) {
      var field = this.getField(fieldType, columnId);
      return this.getInputValue(this.verifyFieldType(fieldType, field), field, columnId) || '';
    },

    getField: function(fieldType, columnId) {
      if (fieldType == 'radio' || fieldType == 'likert') {
        return this.getRadioField(fieldType, columnId);
      } else {
        return $('#Field'+columnId)[0];
      }
    },

    getRadioField: function(fieldType, columnId) {
      var counter = (fieldType == 'radio') ? 0 : 1;
      var keepSearching = true;
      var field = false;

      while (keepSearching) {
        var $radioField = $('#Field' + columnId + '_' + counter);

        if ($radioField.length) {
          field = $radioField[0];

          if ($radioField.prop('checked')) {
            keepSearching = false;
          } else {
            counter = counter + 1;
          }
        } else {
          keepSearching = false;
        }
      }

      if (field && fieldType == 'radio') {
        if (field.value == 'Other') {
          var otherField = $('#Field' + columnId + '_other');
          if (otherField.length) {
            field = otherField[0];
          }
        }
      }

      return field;
    },

    verifyFieldType: function(fieldType, field) {
      if (fieldType == 'radio' && field) {
        if ( endsWith(field.id, '_other') ) {
          fieldType = 'text';
        }
      }

      return fieldType;
    },

    getFieldLI: function(field) {
      var $li = $(field).closest('li[id^="fo"]');
      return $li.length? $li[0] : field;
    },

    /*---------------------------------
     GET INPUT VALUE
     -----------------------------------*/

    getInputValue: function(fieldType, field, columnId) {
      if (field) {
        return this.getInputValueFromCurrentPage(fieldType, field, columnId);
      } else {
        return this.getInputValueFromEntry(fieldType, columnId);
      }
    },

    getInputValueFromCurrentPage: function(fieldType, field, columnId) {
      var value = '';

      switch (fieldType) {
        case 'time':
          value = this.getTimeInputValue(columnId);
          break;
        case 'eurodate':
          value = this.getEuroDateInputValue(columnId);
          break;
        case 'date':
          value = this.getDateInputValue(columnId);
          break;
        case 'phone':
          value = this.getPhoneInputValue(columnId);
          break;
        case 'money':
          value = this.getMoneyInputValue(columnId);
          break;
        case 'checkbox':
          value = this.getCheckboxInputValue(field);
          break;
        case 'radio':
          value = this.getRadioInputValue(field);
          break;
        default:
          value = this.getSimpleInputValue(field);
          break;
      }

      return value;
    },

    getTimeInputValue: function(columnId) {
      var hour = $('#Field'+columnId).eq(0).val();
      var min = $('#Field'+columnId+'-1').eq(0).val();
      var sec = $('#Field'+columnId+'-2').eq(0).val();
      var amPm = $('#Field'+columnId+'-3').eq(0).val();

      if( amPm == 'PM' && hour < 12) {
        // type coercion to number
        hour = hour * 1;
        hour = hour + 12;
      }

      if(amPm == 'AM' && hour == 12){
        hour = hour - 12;
      }

      if (sec === ''){
        sec = 0;
      }

      return this.formatNum(hour) + ':' + this.formatNum(min) + ':' + this.formatNum(sec);
    },

    getEuroDateInputValue: function(columnId) {
      var year = $('#Field'+columnId).eq(0).val();
      var month = $('#Field'+columnId+'-2').eq(0).val();
      var day = $('#Field'+columnId+'-1').eq(0).val();

      return year + '-' + this.formatNum(month) + '-' + this.formatNum(day);
    },

    getDateInputValue: function(columnId) {
      var year = $('#Field'+columnId).eq(0).val();
      var month = $('#Field'+columnId+'-1').eq(0).val();
      var day = $('#Field'+columnId+'-2').eq(0).val();

      return year + '-' + this.formatNum(month) + '-' + this.formatNum(day);
    },

    formatNum: function(num) {
      num = String(num) || '';
      return (num.length == 1) ? '0' + num : num;
    },

    getPhoneInputValue: function(columnId) {
      var val1 = $('#Field'+ columnId +'-1').eq(0).val();
      var val2 = $('#Field'+ columnId +'-2').eq(0).val();
      var phone = $('#Field'+ columnId ).value + val1 + val2;
      return phone;
    },

    getMoneyInputValue: function(columnId) {
      var integer = $('#Field'+columnId).eq(0).val();
      var digit = $('#Field'+columnId+'-1').eq(0).val();

      if (digit > 0) {
        integer = integer + '.' + digit;
      }

      return integer;
    },

    getCheckboxInputValue: function(field) {
      return (field.checked) ? field.value : '';
    },

    getRadioInputValue: function(field) {
      return (field.checked) ? field.value : '';
    },

    getSimpleInputValue: function(field) {
      return field.value;
    },

    getInputValueFromEntry: function(fieldType, columnId) {
      var value = String( this.entry['Field' + columnId] );

      if (fieldType == 'date' || fieldType == 'eurodate') {
        value = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
      }

      return value;
    },

    /*---------------------------------
     LOGIC COMPARISONS
     -----------------------------------*/

    // First two comparisons included because indexOf doesn't handle empty string well
    // todo: clean this the F up.
    contains: function(needle, haystack) {
      if (needle === '' && haystack === '') {
        return true;
      }

      if (needle === '' && haystack !== '') {
        return false;
      }

      if (String(haystack).indexOf(needle) === -1) {
        return false;
      }

      return true;
    },

    // inverse of above
    // todo ALSO clean this the F up.
    doesnotcontain: function(needle, haystack) {
      if (needle === '' && haystack === '') {
        return false;
      }

      if (needle === '' && haystack !== '') {
        return true;
      }

      if (_.indexOf(haystack, needle) == -1) {
        return true;
      }

      return false;
    },

    is: function(needle, haystack) {
      return (needle === haystack);
    },

    isequalto: function(needle, haystack) {
      return (needle === haystack);
    },

    isnot: function(needle, haystack) {
      return this.isnotequalto(needle, haystack);
    },

    isnotequalto: function(needle, haystack) {
      return (needle !== haystack);
    },

    beginswith: function(needle, haystack) {
      return (String(haystack).indexOf(needle) === 0);
    },

    endswith: function(needle, haystack) {
      var d = haystack.length - needle.length;
      return (d >= 0 && String(haystack).lastIndexOf(needle) === d);
    },

    isgreaterthan: function(conditionValue, fieldValue) {
      if (!isEmpty(fieldValue)) {
        conditionValue = Number(conditionValue);
        fieldValue = Number(fieldValue);

        if(fieldValue > conditionValue) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    islessthan: function(conditionValue, fieldValue) {
      if (!isEmpty(fieldValue)) {
        conditionValue = Number(conditionValue);
        fieldValue = Number(fieldValue);

        if (fieldValue < conditionValue) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }

    },

    isat: function(conditionDate, dateValue) {
      return (conditionDate == dateValue);
    },

    ison: function(conditionDate, dateValue) {
      return (conditionDate == dateValue);
    },

    isbefore: function(conditionDate, dateValue, type) {
      if (type == 'time') {
        return this.compareTimes(conditionDate, dateValue, 'isbefore');
      } else {
        return this.compareDates(conditionDate, dateValue, 'isbefore');
      }
    },

    isafter: function(conditionDate, dateValue, type) {
      if (type == 'time') {
        return this.compareTimes(conditionDate, dateValue, 'isafter');
      } else {
        return this.compareDates(conditionDate, dateValue, 'isafter');
      }
    },

    compareDates: function(conditionDate, dateValue, compareType) {
      var condArray = this.cleanSplit('-', conditionDate, 3);
      var dateArray = this.cleanSplit('-', dateValue, 3);

      var condDate = new Date(condArray[0], condArray[1], condArray[2], 1, 1, 1, 1);
      var date = new Date(dateArray[0], dateArray[1], dateArray[2], 1, 1, 1, 1);

      if (dateArray[0].length < 4 || dateArray[1].length < 2 || dateArray[0].length < 2) {
        return false;
      }

      if (compareType == 'isbefore') {
        return (date < condDate);
      } else {
        return (date > condDate);
      }
    },

    compareTimes: function(conditionTime, timeValue, compareType) {
      var condArray = this.cleanSplit(':', conditionTime, 3);
      var timeArray = this.cleanSplit(':', timeValue, 3);

      var condTime = new Date(2000, 1, 1, condArray[0], condArray[1], condArray[2], 1);
      var time = new Date(2000, 1, 1, timeArray[0], timeArray[1], timeArray[2], 1);

      // Don't compare an incomplete value from the user
      if (timeArray[0].length < 2 || timeArray[1].length < 2 || timeArray[2].length < 2) {
        return false;
      }

      if (compareType == 'isbefore') {
        return (time < condTime);
      } else {
        return (time > condTime);
      }
    },

    // Ensures that array values are not undefined when accessed
    cleanSplit: function(delimiter, text, expectedLength) {
      var textArray = text.split(delimiter);

      for ( var i=0; i < expectedLength; i++ ) {
        textArray[i] = textArray[i] || '';
      }

      return textArray;
    }

  });


  WufooConditions.prototype.is = WufooConditions.prototype.isequalto;

  function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
  }

  function isEmpty( value ) {
    return ( trim(value || '') === '' );
  }

  /* This will actually strip tags now, it really did not before besides create a div
      which is probably not needed.
   */
  function stripTags (str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    var container = document.createElement('div');
    container.innerHTML = str;
    return trim(container.textContent || container.innerHTML);
  }

  function endsWith(haystack, needle, position) {
    position = position || haystack.length;
    position = position - needle.length;
    var lastIndex = _.lastIndexOf(haystack, needle);
    return lastIndex !== -1 && lastIndex === position;
  }

  /* exports */
  window.WufooConditions = WufooConditions;

}(window, document, jQuery, _));
