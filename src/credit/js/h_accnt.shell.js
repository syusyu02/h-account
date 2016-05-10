h_accnt.shell = (function () {
    'use strict';

    var
        $data_master, $data_transaction, $file_open,
        openTransactionFile,
        initModule;

    initModule = function ($container) {
        $data_master = $container.find('#data_master');
        $data_transaction = $container.find('#data_transaction');

        $file_open = $container.find('#file_open');
        $file_open.on("change", openTransactionFile);
    };

    openTransactionFile = function() {
        h_accnt.data.openFile(this.files[0].name);
    };

    $(GLOVAL_EVENT).on('data-master-changed', function (e, data) {
        $data_master.html(h_accnt.util.convCsvToHtml(data.contents, h_accnt.const.csvColMapMaster));
    });

    $(GLOVAL_EVENT).on('data-transaction-changed', function (e, data) {
        $data_transaction.html(h_accnt.util.convCsvToHtml(data.contents, h_accnt.util.decideColMap(data.fileType)));
    });

    return {initModule: initModule};
}());