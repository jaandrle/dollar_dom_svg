/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
public.chartAddAxeWrapper= function({ X, Y, className= "C__chartAxe" }){
    const { add, addText, share}= $dom.component("G", { className, transform: `translate(${X} ${Y})` }, { namespace_group: "SVG" });
        add("STYLE");
            addText("text{stroke-width:0}");
    return share;
};