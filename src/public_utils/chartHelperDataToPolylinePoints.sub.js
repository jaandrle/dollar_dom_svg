/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
public.chartHelperDataToPolylinePoints= function({ dataX, dataY, metric: [ dX, dY ] }){
    return dataX.map((x, i)=> (x*dX)+","+(dataY[i]*dY)).join(" ");
};