/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
function chartAddAxeXLabelsComponent({ delta_step, step, size, width, minimum, labelMap }){
    const y= size*1.5, max= width+epsilon;
    const { add, setShift, share, addText: write }= $dom.component("g", { 'dominant-baseline': "hanging" }, { namespace_group: "SVG" });
    const addText= typeof labelMap==="function" ? t=>write(labelMap(t)) : write;
    for(let i=0, x=0; x<=max; x+=delta_step, i++){
        add("text", { y, x });
            addText(minimum+i*step);
        setShift(-3);
    }
    return share;
}