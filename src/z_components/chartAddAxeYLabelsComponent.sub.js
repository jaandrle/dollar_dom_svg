/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
function chartAddAxeYLabelsComponent({ delta_step, step, x, height, minimum }){
    const dy= "2%";
    const { add, addText, setShift, share }= $dom.component("g", null, { namespace_group: "SVG" });
    for(let i=0, y=height; y>=-epsilon; y+=delta_step, i++){
        add("text", { x, y, dy });
            addText(minimum+i*step);
        setShift(-3);
    }
    return share;
}