/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global chartAddAxeXLabelsComponent, chartAddAxeXTicksComponent */
public.chartAddLabelsTicksForAxeX= function({
    className= "C__chartAxeX",
    width= 233.33,
    height= 10,
    size= 1,
    delta= 1,
    step= 1,
    minimum= 0,
    labels= true,
    ticks= true
}){
    const
        delta_step= delta*step;
    const { component, setShift, share }= $dom.component("G", { className }, { namespace_group: "SVG" });
    setShift(0);
    if(labels){
        component(chartAddAxeXLabelsComponent({ delta_step, step, size, width, minimum }), -1);
    }
    if(ticks){
        component(chartAddAxeXTicksComponent({ delta_step, width, size }), -1);
    }
    return share;
};