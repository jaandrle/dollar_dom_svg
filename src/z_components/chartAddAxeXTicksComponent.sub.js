/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
function chartAddAxeXTicksComponent({ delta_step, width, size }){
    const ry= size/2, max= width+epsilon;
    const { add, setShift, share }= $dom.component("G", null, { namespace_group: "SVG" });
    for(let i=0, x=0; x<=max; x+=delta_step, i++){
        add("LINE", { x1: x, y1: -ry, x2: x, y2: ry });
        setShift(-2);
    }
    return share;
}