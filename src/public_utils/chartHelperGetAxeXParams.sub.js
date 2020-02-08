/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true, maxparams: 4 */
public.chartHelperGetAxeXParams= function(axis, chart, metric, params= {}){
    const height= axis[1];
    return Object.assign({ X: axis[0], Y: chart[1]+height, width: chart[0], delta: metric[0], height }, params);
};