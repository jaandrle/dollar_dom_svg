/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
function chartAddAxeXLabelsComponent({ delta_step, step, size, width, minimum }){
    const y= size;
    const { add, addText, setShift, share }= $dom.component("G", { 'dominant-baseline': "hanging" }, { namespace_group: "SVG" });
    for(let i=minimum, x=0; x<=width; x+=delta_step, i++){
        add("TEXT", { y, x });
            addText(i*step);
        setShift(-3);
    }
    return share;
}