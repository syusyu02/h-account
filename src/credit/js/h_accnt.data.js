h_accnt.data = (function () {
    'use strict';
    var
        initModule, openFile,
        sendEventWithCsv, sendEventWithCsvOfMaster, sendEventWithCsvOfTransaction, dfdGetCsv, handleErr;

    openFile = function (fileNm) {
        dfdGetCsv('./data/transaction/' + fileNm).done(sendEventWithCsvOfTransaction).fail(handleErr);
    }

    initModule = function () {
        dfdGetCsv('./data/zaim_master.csv').done(sendEventWithCsvOfMaster).fail(handleErr);
    };

    dfdGetCsv = function (csvUrl) {
        var dfd = jQuery.Deferred();
        $.ajax({
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=shift_jis");
            },
            url: csvUrl,
            dataType: 'text',
            context: {csvUrl: csvUrl},
            success: dfd.resolve,
            error: dfd.reject
        });
        return dfd.promise();
    };

    sendEventWithCsvOfMaster = function (data) {
        $(GLOVAL_EVENT).trigger('data-master-changed', {contents: data});
    };

    sendEventWithCsvOfTransaction = function (data) {
        var fileType = h_accnt.util.decideFileType(this.csvUrl);
        $(GLOVAL_EVENT).trigger('data-transaction-changed', {contents: data, fileType: fileType});
    };

    handleErr = function () {
        var errmsg = 'Failed to get csv';
        alert(errmsg);
        console.log(errmsg);
    };

    return {
        initModule: initModule,
        openFile: openFile
    };

}());
