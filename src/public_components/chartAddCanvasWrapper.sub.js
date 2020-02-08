/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
public.chartAddCanvasWrapper= function({
    className= "C__chartCanvas",
    axis: [ X, Y ],
    chart: [ width, height ]
}){
    return $dom.component("SVG", {
        viewBox: `0 ${-height} ${width} ${height}`,
        width, height, 
        overflow: "visible",
        transform: `translate(${X} ${Y})`,
        className,
    }, { namespace_group: "SVG" })
    .share;
};