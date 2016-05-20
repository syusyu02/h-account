h_accnt.data = (function () {
    'use strict';
    var
        initModule, openFile,
        sendEventWithCsv, sendEventWithCsvOfMaster, sendEventWithCsvOfTransaction, dfdGetCsv, handleErr;

    dfdGetCsv = function (filePath) {
        var dfd = jQuery.Deferred();
        $.ajax({
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=shift_jis");
            },
            url: filePath,
            dataType: 'text',
            context: {filePath: filePath},
            success: dfd.resolve,
            error: dfd.reject
        });
        return dfd.promise();
    };

    sendEventWithCsvOfMaster = function (data) {
        $(h_accnt.H_ACCNT_EVENT).trigger('data-master-changed', {csv: data, filePath: this.filePath});
    };

    sendEventWithCsvOfTransaction = function (data) {
        $(h_accnt.H_ACCNT_EVENT).trigger('data-transaction-changed', {csv: data, filePath: this.filePath});
    };

    handleErr = function () {
        var errmsg = 'Failed to get csv';
        alert(errmsg);
        console.log(errmsg);
    };

    //----- Begin public method -----//
    initModule = function () {
        dfdGetCsv('./data/zaim_master.csv').done(sendEventWithCsvOfMaster).fail(handleErr);
    };

    openFile = function (fileNm) {
        dfdGetCsv('./data/transaction/' + fileNm).done(sendEventWithCsvOfTransaction).fail(handleErr);
    }
    //----- End public method -----//

    return {
        initModule: initModule,
        openFile: openFile
    };

}());
