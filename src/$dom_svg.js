/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/* global $dom */
const $dom_svg= (function(){
    return {
        chartAddAxeWrapper: function({ X, Y, className= "C__chartAxe" }){
            const { add, addText, share}= $dom.component("G", { className, transform: `translate(${X} ${Y})` }, { namespace_group: "SVG" });
                add("STYLE");
                    addText("text{stroke-width:0}");
            return share;
        },
        chartAddCanvasWrapper: function({ X, Y, width, height, className= "C__chartCanvas" }){
            return $dom.component("SVG", {
                viewBox: `0 ${-height} ${width} ${height}`,
                width, height, 
                overflow: "visible",
                transform: `translate(${X} ${Y})`,
                className,
            }, { namespace_group: "SVG" })
            .share;
        },
        chartAddAxeLine: function({ width, height }){
            if(width>height) return $dom.component("LINE", { y1: 0, y2: 0, x1: 0, x2: width }, { namespace_group: "SVG" }).share;
            return $dom.component("LINE", { x1: width, x2: width, y1: 0, y2: height }, { namespace_group: "SVG" }).share;
        },
        chartAddLabelsTicksForAxeX: function({ className= "C__chartAxeX", width= 233.33, height= 10, delta= 1, step= 1, minimum= 0, labels= true, ticks= true }){
            const
                delta_step= delta*step,
                y= height;
            const { component, setShift, share }= $dom.component("G", { className }, { namespace_group: "SVG" });
            setShift(0);
            if(labels){
                component(chartAddAxeXLabelsComponent({ delta_step, step, y, width, minimum }), -1);
            }
            if(ticks){
                component(chartAddAxeXTicksComponent({ delta_step, width }), -1);
            }
            return share;
        },
        chartAddLabelsTicksForAxeY: function({ className= "C__chartAxeY", width= 7.5, height= 100, delta= 1, step= 1, minimum= 0, labels= true, ticks= true }){
            const
                delta_step= delta*step,
                dy= "1.25%",
                x= width*0.75;
            const { component, setShift, share }= $dom.component("G", { className }, { namespace_group: "SVG" });
            setShift(0);
            if(labels){
                component(chartAddAxeYLabelsComponent({ delta_step, step, dy, x, height, minimum }), -1);
            }
            if(ticks){
                component(chartAddAxeYTicksComponent({ delta_step, dy, height }), -1);
            }
            return share;
        },
        chartHelperDataToPolylinePoints: function({ dataX, dataY, dX, dY }){
            return dataX.map((x, i)=> (x*dX)+","+(dataY[i]*dY)).join(" ");
        }
    };

    function chartAddAxeXLabelsComponent({ delta_step, step, y, width, minimum }){
        const { add, addText, setShift, share }= $dom.component("G", null, { namespace_group: "SVG" });
        for(let i=minimum, x=0; x<=width; x+=delta_step, i++){
            add("TEXT", { y, x });
                addText(i*step);
            setShift(-3);
        }
        return share;
    }
    function chartAddAxeXTicksComponent({ delta_step, width }){
        const y1= "-1.5%", y2= "1.5%";
        const { add, setShift, share }= $dom.component("G", null, { namespace_group: "SVG" });
        for(let i=0, x=0; x<=width; x+=delta_step, i++){
            add("LINE", { x1: x, y1, x2: x, y2 });
            setShift(-2);
        }
        return share;
    }

    function chartAddAxeYLabelsComponent({ delta_step, step, dy, x, height, minimum }){
        const { add, addText, setShift, share }= $dom.component("G", null, { namespace_group: "SVG" });
        for(let i=minimum, y=height; y>=0; y+=delta_step, i++){
            add("TEXT", { x, y, dy });
                addText(i*step);
            setShift(-3);
        }
        return share;
    }
    function chartAddAxeYTicksComponent({ delta_step, height }){
        const x1= "4.75%", x2= "6%";
        const { add, setShift, share }= $dom.component("G", null, { namespace_group: "SVG" });
        for(let i=0, y=height; y>=0; y+=delta_step, i++){
            add("LINE", { x1, y1: y, x2, y2: y });
            setShift(-2);
        }
        return share;
    }
})();