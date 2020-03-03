/* jshint esversion: 6, -W027, -W097, -W040, browser: true, expr: true, undef: true, maxparams: 4 */
/* global $dom, gulp_place */
const $dom_svg= (function(){
    /**
     * This namespace contains all public visible functions of `$dom_svg`.
     * @namespace public
     */
    const public= {};
    /**
     * This namespace provides chart parts such as axis and so on.
     * @namespace chart_parts
     * @memberof public
     */
    public.chart_parts= {};
    /**
     * This namespace provides all charts related helpers (e. g. calculating metric).
     * @namespace chart_helpers
     * @memberof public
     */
    public.chart_helpers= {};
    const epsilon= 0.001; /* => for supports non presize values */
    
    public.chart_parts.addAxeLine= function({ width, height }){
        if(width>height) return $dom.component("line", { y1: 0, y2: 0, x1: 0, x2: width }, { namespace_group: "SVG" }).share;
        return $dom.component("line", { x1: width, x2: width, y1: 0, y2: height }, { namespace_group: "SVG" }).share;
    };
    public.chart_parts.addAxeWrapper= function({ X, Y, className= "C__chartAxe" }){
        const { add, addText, share}= $dom.component("g", { className, transform: `translate(${X} ${Y})` }, { namespace_group: "SVG" });
            add("style");
                addText("text{stroke-width:0}");
        return share;
    };
    public.chart_parts.addCanvasWrapper= function({
        className= "C__chartCanvas",
        axis: [ x, y ],
        chart: [ width, height ]
    }){
        return $dom.component("svg", {
            viewBox: `0 ${-height} ${width} ${height}`,
            width, height, x, y,
            overflow: "visible",
            className,
        }, { namespace_group: "SVG" })
        .share;
    };
    
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
    
    public.chart_parts.addLabelsTicksForAxeY= function({
        className= "C__chartAxeY",
        width= 7.5,
        height= 100,
        size= 1,
        delta= 1,
        step= 1,
        minimum= 0,
        labels= true,
        ticks= true,
        labelMap
    }){
        const
            delta_step= delta*step,
            x= width*0.75;
        const { component, setShift, share }= $dom.component("g", { className }, { namespace_group: "SVG" });
        setShift(0);
        if(labels){
            component(chartAddAxeYLabelsComponent({ delta_step, step, x, height, minimum, labelMap }), -1);
        }
        if(ticks){
            component(chartAddAxeYTicksComponent({ delta_step, height, width, size }), -1);
        }
        return share;
    };
    /**
     * This namespace provides methods to register global masks/linearGradiens based on their ids.
     * @namespace global_defs
     * @memberof public
     */
    public.global_defs= (function(){
        const registered= new Set();
        let defs_el, mounted_el;
        return {
            mount,
            add: function(key, component, ...mount_args){
                mount(document.body);
                if(registered.has(key)) return key;
                const c= component().mount(defs_el, ...mount_args);
                c.id= key;
                registered.add(key);
                return key;
            },
            /* async!!! */
            clear: function(){
                mounted_el.remove();
            }
        };
        function mount(...args){
            if(!mounted_el) mounted_el= defsComponent().mount(...args);
            return mounted_el;
        }
        function defsComponent(){
            const { add, ondestroy, share }= $dom.component("svg", { style: "position:fixed;top:-100vh;left:-100vw;" });
                add("defs").oninit(el=> defs_el= el);
            ondestroy(function(){
                defs_el= null;
                mounted_el= undefined;
                registered.clear();
            });
            return share;
        }
    })();
    
    public.chart_helpers.dataToPolylinePoints= function({ dataX, dataY, metric: [ dX, dY, minimum ] }){
        const [ minX, minY ]= minimum;
        return dataX.map((x, i)=> (( x-minX )*dX)+","+(( dataY[i]-minY )*dY)).join(" ");
    };
    public.chart_helpers.getAreasSizes= function(moveZero= [ 0, 0 ], ratio= 2.333333){
        const /* svg dimensions */
            height= 100,
            width= ratio*height;
        const /* chart dimensions (smaller than svg) */
            [ left_pad, bottom_pad ]= moveZero,
            chart_height= height - 2*bottom_pad,
            chart_width= width - 2*left_pad;
        return [ `0 0 ${width} ${height}`, [ left_pad, bottom_pad ], [ chart_width, chart_height ] ];
    };
    public.chart_helpers.getAxeXParams= function(axis, chart, metric, params= {}){
        const height= axis[1];
        return Object.assign({ X: axis[0], Y: chart[1]+height, width: chart[0], delta: metric[0], minimum: metric[2][0], height }, params);
    };
    public.chart_helpers.getAxeYParams= function(axis, chart, metric, params= {}){
        return Object.assign({ X: 0, Y: axis[1], width: axis[0], height: chart[1], delta: metric[1], minimum: metric[2][1] }, params);
    };
    public.chart_helpers.getDataMetric= function(chart, max_point, min_point= [ 0, 0 ]){
        return [
            chart[0]/(max_point[0]-min_point[0]),
            -chart[1]/(max_point[1]-min_point[1]),
            min_point
        ];
    };
    return public;
    
    function chartAddAxeXLabelsComponent({ delta_step, step, size, width, minimum, labelMap }){
        const y= size*1.25, max= width+epsilon;
        const { add, setShift, share, addText: write }= $dom.component("g", { 'dominant-baseline': "hanging" }, { namespace_group: "SVG" });
        const addText= typeof labelMap==="function" ? t=>write(labelMap(t)) : write;
        for(let i=0, x=0; x<=max; x+=delta_step, i++){
            add("text", { y, x });
                addText(minimum+i*step);
            setShift(-3);
        }
        return share;
    }
    function chartAddAxeXTicksComponent({ delta_step, width, size }){
        const ry= size/2, max= width+epsilon;
        const { add, setShift, share }= $dom.component("g", null, { namespace_group: "SVG" });
        for(let i=0, x=0; x<=max; x+=delta_step, i++){
            add("line", { x1: x, y1: -ry, x2: x, y2: ry });
            setShift(-2);
        }
        return share;
    }
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
    function chartAddAxeYTicksComponent({ delta_step, height, width, size }){
        const x1= width-size/2, x2= width+size/2;
        const { add, setShift, share }= $dom.component("g", null, { namespace_group: "SVG" });
        for(let i=0, y=height; y>=-epsilon; y+=delta_step, i++){
            add("line", { x1, y1: y, x2, y2: y });
            setShift(-2);
        }
        return share;
    }
    
})();