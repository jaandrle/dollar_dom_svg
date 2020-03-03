/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
public.chartAddAxeLine= function({ width, height }){
    if(width>height) return $dom.component("line", { y1: 0, y2: 0, x1: 0, x2: width }, { namespace_group: "SVG" }).share;
    return $dom.component("line", { x1: width, x2: width, y1: 0, y2: height }, { namespace_group: "SVG" }).share;
};