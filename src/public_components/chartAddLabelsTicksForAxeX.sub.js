/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global chartAddAxeXLabelsComponent, chartAddAxeXTicksComponent */
public.chart_parts.addLabelsTicksForAxeX= function({
    className= "C__chartAxeX",
    width= 233.33,
    size= 1,
    delta= 1,
    step= 1,
    minimum= 0,
    labels= true,
    ticks= true,
    labelMap
}){
    const
        delta_step= delta*step;
    const { component, setShift, share }= $dom.component("g", { className }, { namespace_group: "SVG" });
    setShift(0);
    if(labels){
        component(chartAddAxeXLabelsComponent({ delta_step, step, size, width, minimum, labelMap }), -1);
    }
    if(ticks){
        component(chartAddAxeXTicksComponent({ delta_step, width, size }), -1);
    }
    return share;
};