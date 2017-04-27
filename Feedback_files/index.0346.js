/* global jQuery: true, _:true, PublicForm:true */
;(function (window, document, $, _) {
  'use strict';

  $(window).on('load', init);
  $(window).on('message', resizeCallFromParent);

  function init() {
    window.__PF = new PublicForm(true);
  }

  function tabToInput(event) {
    window.__PF.tabToInput(event);
  }

  function fieldHighlight(el, depth) {
    window.__PF.fieldLogic.highlight(el, depth);
  }

  function validateRange(ColumnId, RangeType) {
    window.__PF.fieldLogic.validateRange(ColumnId, RangeType);
  }

  function deleteFile(fieldId, file_name, container, removal, removeFile, formId) {
    window.__PF.deleteFile(fieldId, file_name, container, removal, removeFile, formId);
  }

  function finishDeleteFile(ret, removeFile, removal, container) {
    if (ret.success == 'false') {
      window.__PF.failedDeleteFile(ret);
    } else {
      window.__PF.successfulDeleteFile(removeFile, removal, container);
    }
  }

  function handleInput(el, count) {
    window.__PF.handleInput(el, count);
  }

  function selectDateOnForm(cal) {
    window.__PF.selectDateOnForm(cal);
  }

  function selectEuroDateOnForm(cal) {
    window.__PF.selectEuroDateOnForm(cal);
  }

  function doSubmitEvents() {
    window.__PF.doSubmitEvents();
  }

  function resizeCallFromParent(event) {
    // Using if to prevent old IE from throwing an error before formLogic is loaded
    if (window.__PF.formLogic) {
      window.__PF.formLogic.resizeCallFromParent(event);
    }
  }

  function ratingToggle() {
    window.__PF.fieldLogic.ratingToggle();
  }

  /* exports */
  _.merge(window, {
    tabToInput: tabToInput,
    fieldHighlight: fieldHighlight,
    validateRange: validateRange,
    deleteFile: deleteFile,
    finishDeleteFile: finishDeleteFile,
    handleInput: handleInput,
    selectDateOnForm: selectDateOnForm,
    selectEuroDateOnForm: selectEuroDateOnForm,
    doSubmitEvents: doSubmitEvents,
    resizeCallFromParent: resizeCallFromParent,
    ratingToggle: ratingToggle
  });

}(window, document, jQuery, _));
