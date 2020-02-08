/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
function chartAddAxeYLabelsComponent({ delta_step, step, dy, x, height, minimum }){
    const { add, addText, setShift, share }= $dom.component("G", null, { namespace_group: "SVG" });
    for(let i=minimum, y=height; y>=-0.001; y+=delta_step, i++){
        add("TEXT", { x, y, dy });
            addText(i*step);
        setShift(-3);
    }
    return share;
}