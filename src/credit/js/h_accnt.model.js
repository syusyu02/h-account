h_accnt.model = (function () {
    'use strict';
    var
        initModule, record,

        usageRecordProto, makeUsageRecord,
        usageRecordCreatorProto, makeUsageRecordCreator, usageRecordCreatorFactory,
        createUsageRecordList,

        usageRecordMap = {
            master: null,
            transaction: null,
            transaction_merged: null,
        };

    usageRecordProto = {
        getHtml: function () {
            return this.date
                + (!this.category ? '' : this.category + ', ')
                + (!this.purpose ? '' : this.purpose + ', ')
                + (!this.memo ? '' : this.memo + ', ')
                + ', ' + this.place
                + ', ' + this.price
                + '<br />';
        },

        getDuplicateCheckKey: function () {
            // return this.year + "-" + this.month + "-" + this.day + "=" + this.price;
        },

        getPossibleDuplicatedCheckKey: function() {
            return this.price;
        }
    };

    makeUsageRecord = function (arg_map) {
        var
            usage_record;

        usage_record = Object.create(usageRecordProto);
        usage_record.date = arg_map.date;
        usage_record.place = arg_map.place;
        usage_record.price = arg_map.price;
        usage_record.purpose = arg_map.purpose;
        usage_record.category = arg_map.category;
        usage_record.memo = arg_map.memo;
        return usage_record;
    }


    usageRecordCreatorProto = {
        createUsageRecord: function (line) {
            var cols = line.split(',');

            return makeUsageRecord({
                date: cols[this.colDate],
                place: cols[this.colPlace],
                price: cols[this.colPrice],
                category: !this.colCategory ? '' : cols[this.colCategory],
                purpose: !this.colPurpose ? '' : cols[this.colPurpose],
                memo: !this.colMemo? '' : cols[this.colMemo],
            });
        }
    };

    makeUsageRecordCreator = function (col_map) {
        var
            usage_record_creator;

        usage_record_creator = Object.create(usageRecordCreatorProto);
        usage_record_creator.colDate = col_map.colDate;
        usage_record_creator.colPlace = col_map.colPlace;
        usage_record_creator.colPrice = col_map.colPrice;
        usage_record_creator.colCategory = col_map.colCategory;
        usage_record_creator.colPurpose = col_map.colPurpose;
        usage_record_creator.colMemo = col_map.colMemo;

        return usage_record_creator;
    };

    usageRecordCreatorFactory = function (file_path) {
        var
            master, nicos, ufj;

        if (!file_path) {
            throw new Error('filePath must not be empty.');
        }

        master = makeUsageRecordCreator({colDate: 0, colCategory: 2, colPurpose:3, colMemo: 7, colPlace: 8, colPrice: 11});
        nicos = makeUsageRecordCreator({colDate: 0, colPlace: 1, colPrice: 2});
        ufj = makeUsageRecordCreator({colDate: 0, colPlace: 3, colPrice: 4});

        if (file_path.includes('ufj')) {
            return ufj;
        } else if (file_path.includes('nicos')) {
            return nicos;
        } else if (file_path.includes('master')) {
            return master;
        }

        throw new Error('Invalid file_path: ' + file_path);
    };

    createUsageRecordList = function (data) {
        var
            usage_record_list = [],
            usage_record_creator, lines;

        lines = data.csv.split(/\r\n|\r|\n/);

        usage_record_creator = usageRecordCreatorFactory(data.filePath);

        $(lines).each(function (idx) {
            usage_record_list.push(usage_record_creator.createUsageRecord(this));
        });

        return usage_record_list;
    }

    //----- Begin public method -----//
    initModule = function () {
        h_accnt.data.initModule();

        $(h_accnt.H_ACCNT_EVENT).on('data-master-changed', function (e, data) {
            usageRecordMap.master = createUsageRecordList(data);
            $(h_accnt.H_ACCNT_EVENT).trigger('data-master-created');
        });

        $(h_accnt.H_ACCNT_EVENT).on('data-transaction-changed', function (e, data) {
            usageRecordMap.transaction = createUsageRecordList(data);
            $(h_accnt.H_ACCNT_EVENT).trigger('data-transaction-created');
        });
    };

    record = function() {
        var
            get_master, get_transaction, get_transaction_merged;

        get_master = function() {
            return usageRecordMap.master;
        };
        get_transaction = function() {
            return usageRecordMap.transaction;
        };

        return {
            get_master: get_master,
            get_transaction: get_transaction,
        };
    }();

    //----- End public method -----//

    return {
        initModule: initModule,
        record: record,
    };
}());