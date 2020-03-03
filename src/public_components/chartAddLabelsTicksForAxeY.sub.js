/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global chartAddAxeYLabelsComponent, chartAddAxeYTicksComponent */
public.chart_parts.addLabelsTicksForAxeY= function({
    className= "C__chartAxeY",
    width= 7.5,
    height= 100,
    size= 1,
    delta= 1,
    step= 1,
    minimum= 0,
    labels= true,
    ticks= true
}){
    const
        delta_step= delta*step,
        x= width*0.75;
    const { component, setShift, share }= $dom.component("g", { className }, { namespace_group: "SVG" });
    setShift(0);
    if(labels){
        component(chartAddAxeYLabelsComponent({ delta_step, step, x, height, minimum }), -1);
    }
    if(ticks){
        component(chartAddAxeYTicksComponent({ delta_step, height, width, size }), -1);
    }
    return share;
};