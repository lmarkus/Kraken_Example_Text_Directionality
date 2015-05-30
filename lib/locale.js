'use strict';

//RTL Language list sourced from: http://en.wikipedia.org/wiki/Right-to-left#RTL_Wikipedia_languages
var rtlLanguages =
    ['ar', 'arc', 'bcc', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he', 'ku', 'mzn', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi'];

module.exports = function () {
    return function (req, res, next) {
        var locale = ((req.cookies && req.cookies.locale) || 'en_US').split('_'),

        //Extract the language portion of the locale. E.g.: en_US -> en
            language = locale[0],

        //Extract the country portion of the locale. E.g.: en_US -> US
            country = locale[1],

        //Check if language belongs to the RTL group.
            directionality = rtlLanguages.lastIndexOf(language) >= 0 ? 'rtl' : 'ltr';

        //Set the locality for this response. The template will pick the appropriate bundle
        res.locals.context = {
            locality: {
                language: language,
                country: country,
                directionality: directionality
            }
        };
        next();
    };
};

