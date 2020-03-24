/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
_public.chart_helpers.getAreasSizes= function(moveZero= [ 0, 0 ], ratio= 2.333333){
    const /* svg dimensions */
        height= 100,
        width= ratio*height;
    const /* chart dimensions (smaller than svg) */
        [ left_pad, bottom_pad ]= moveZero,
        chart_height= height - 2*bottom_pad,
        chart_width= width - 2*left_pad;
    return [ `0 0 ${width} ${height}`, [ left_pad, bottom_pad ], [ chart_width, chart_height ] ];
};