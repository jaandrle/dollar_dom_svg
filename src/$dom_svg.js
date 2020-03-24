/* jshint esversion: 6, -W027, -W097, -W040, browser: true, expr: true, undef: true, maxparams: 4 */
/* global $dom, gulp_place */
const $dom_svg= (function(){
    /**
     * This namespace contains all public visible functions of `$dom_svg`.
     * @namespace public
     */
    const _public= {};
    /**
     * This namespace provides chart parts such as axis and so on.
     * @namespace chart_parts
     * @memberof public
     */
    _public.chart_parts= {};
    /**
     * This namespace provides all charts related helpers (e. g. calculating metric).
     * @namespace chart_helpers
     * @memberof public
     */
    _public.chart_helpers= {};
    const epsilon= 0.001; /* => for supports non presize values */
    gulp_place("public_components/*.sub.js", "files_once");
    gulp_place("public_utils/*.sub.js", "files_once");
    return _public;
    gulp_place("z_components/*.sub.js", "files_once");
    gulp_place("z_utils/*.sub.js", "files_once");
})();