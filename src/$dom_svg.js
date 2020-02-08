/* jshint esversion: 6, -W027, -W097, -W040, browser: true, expr: true, undef: true */
/* global $dom, gulp_place */
const $dom_svg= (function(){
    const public= {};
    const epsilon= 0.001; /* => for supports non presize values */
    gulp_place("public_components/*.sub.js", "files_once");
    gulp_place("public_utils/*.sub.js", "files_once");
    return public;
    gulp_place("z_components/*.sub.js", "files_once");
    gulp_place("z_utils/*.sub.js", "files_once");
})();