/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
_public.chart_helpers.getDataMetric= function(chart, max_point, min_point= [ 0, 0 ]){
    return [
        chart[0]/(max_point[0]-min_point[0]),
        -chart[1]/(max_point[1]-min_point[1]),
        min_point
    ];
};