var GLOVAL_EVENT = {};

var h_accnt = (function () {
    'use strict';
    var initModule = function ( $container ) {
        h_accnt.shell.initModule($container);
        h_accnt.data.initModule();
    };

    return { initModule: initModule };
}());