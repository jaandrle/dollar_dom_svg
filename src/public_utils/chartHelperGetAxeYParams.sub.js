/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true, maxparams: 4 */
public.chartHelperGetAxeYParams= function(axis, chart, metric, params= {}){
    return Object.assign({ X: 0, Y: axis[1], width: axis[0], height: chart[1], delta: metric[1] }, params);
};