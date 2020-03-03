/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
public.chart_helpers.dataToPolylinePoints= function({ dataX, dataY, metric: [ dX, dY, minimum ] }){
    const [ minX, minY ]= minimum;
    return dataX.map((x, i)=> (( x-minX )*dX)+","+(( dataY[i]-minY )*dY)).join(" ");
};