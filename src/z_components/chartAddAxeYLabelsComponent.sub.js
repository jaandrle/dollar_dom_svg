/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
function chartAddAxeYLabelsComponent({ delta_step, step, x, height, minimum, labelMap }){
    const dy= "2%";
    const { add, setShift, share, addText: write}= $dom.component("g", null, { namespace_group: "SVG" });
    const addText= typeof labelMap==="function" ? t=>write(labelMap(t)) : write;
    for(let i=0, y=height; y>=-epsilon; y+=delta_step, i++){
        add("text", { x, y, dy });
            addText(minimum+i*step);
        setShift(-3);
    }
    return share;
}