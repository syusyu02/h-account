h_accnt.shell = (function () {
    'use strict';

    var
        $data_master, $data_transaction, $file_open,
        openTransactionFile, initModule;

    openTransactionFile = function() {
        h_accnt.data.openFile(this.files[0].name);
    };

    //----- Begin public method -----//
    initModule = function ($container) {
        $data_master = $container.find('#data_master');
        $data_transaction = $container.find('#data_transaction');

        $file_open = $container.find('#file_open');
        $file_open.on("change", openTransactionFile);

        $(h_accnt.H_ACCNT_EVENT).on('data-master-created', function (e, data) {
            $data_master.empty();
            $.each(h_accnt.model.record.get_master(), function(idx, val) {
                $data_master.append(val.getHtml());
            });
        });

        $(h_accnt.H_ACCNT_EVENT).on('data-transaction-created', function (e, data) {
            $data_transaction.empty();
            $.each(h_accnt.model.record.get_transaction(), function(idx, val) {
                $data_transaction.append(val.getHtml());
            });
        });
    };
    //----- End public method -----//
    
    return {initModule: initModule};
}());