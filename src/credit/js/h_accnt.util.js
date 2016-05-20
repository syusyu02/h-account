h_accnt.util = (function () {
    'use strict';

    // var
    //     convCsvToHtml, decideFileType, decideColMap;
    //
    // convCsvToHtml = function (csv, colMap) {
    //     var text = "";
    //     var lines = csv.split(/\r\n|\r|\n/);
    //     $(lines).each(function (idx) {
    //         var cols = this.split(',');
    //         for (var key in colMap) {
    //             if (colMap[key]) {
    //                 text += colMap[key];
    //             }
    //             text += cols[key] + ', ';
    //         }
    //         text += "<br />"
    //     });
    //     text = text.replace(/"/g, '');
    //     return text;
    // };
    //
    // decideFileType = function (filePath) {
    //     if (!filePath) {
    //         throw new Error('filePath must not be empty.');
    //     }
    //     if (filePath.includes('ufj')) {
    //         return h_accnt.const.FILE_TYPE.UFJ;
    //     } else if (filePath.includes('nicos')) {
    //         return h_accnt.const.FILE_TYPE.NICOS;
    //     } else {
    //         return h_accnt.const.FILE_TYPE.NONE;
    //     }
    // };
    //
    // decideColMap = function (fileType) {
    //     if (fileType === h_accnt.const.FILE_TYPE.UFJ) {
    //         return h_accnt.const.csvColMapUFJ;
    //     } else if (fileType == h_accnt.const.FILE_TYPE.NICOS) {
    //         return h_accnt.const.csvColMapNICOS;
    //     }
    //     return null;
    // };
    //
    // return {
    //     convCsvToHtml: convCsvToHtml,
    //     decideFileType: decideFileType,
    //     decideColMap: decideColMap,
    // };
}());