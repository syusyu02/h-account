var h_accnt = (function () {
    'use strict';
    var
        H_ACCNT_EVENT = {},
        initModule;

    initModule = function ($container) {
        h_accnt.shell.initModule($container);
        h_accnt.model.initModule();
    };

    return {
        initModule: initModule,
        H_ACCNT_EVENT: H_ACCNT_EVENT
    };
}());