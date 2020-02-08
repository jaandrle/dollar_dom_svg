/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
function chartAddAxeYTicksComponent({ delta_step, height, width, size }){
    const x1= width-size/2, x2= width+size/2;
    const { add, setShift, share }= $dom.component("G", null, { namespace_group: "SVG" });
    for(let i=0, y=height; y>=-epsilon; y+=delta_step, i++){
        add("LINE", { x1, y1: y, x2, y2: y });
        setShift(-2);
    }
    return share;
}