/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
public.chartAddCanvasWrapper= function({
    className= "C__chartCanvas",
    axis: [ x, y ],
    chart: [ width, height ]
}){
    return $dom.component("svg", {
        viewBox: `0 ${-height} ${width} ${height}`,
        width, height, x, y,
        overflow: "visible",
        className,
    }, { namespace_group: "SVG" })
    .share;
};