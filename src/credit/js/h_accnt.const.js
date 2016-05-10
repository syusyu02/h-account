h_accnt.const = (function () {
    'use strict';

    var
        csvColMapMaster, csvColMapUFJ, csvColMapNICOS,
        FILE_TYPE;

    csvColMapMaster = {
        0: "", /*Date*/
        2: "", /*Category*/
        3: "", /*Purpose*/
        7: "", /*memo*/
        8: "", /*Place*/
        11: "¥", /*Price*/
    };

    csvColMapUFJ = {
        0: "", /*Date*/
        3: "", /*Place*/
        4: "¥", /*Price*/
    };

    csvColMapNICOS = {
        0: "", /*Date*/
        1: "", /*Place*/
        2: "¥", /*Price*/
    };

    FILE_TYPE = {
        UFJ: "ufj",
        NICOS: "nicos",
        NONE: "none",
    };

    return {
        csvColMapMaster: csvColMapMaster,
        csvColMapUFJ: csvColMapUFJ,
        csvColMapNICOS: csvColMapNICOS,
        FILE_TYPE: FILE_TYPE
    };
}());