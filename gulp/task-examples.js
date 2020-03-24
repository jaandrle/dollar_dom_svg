/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true, maxparams: 4 */
module.exports= function({app, $gulp_folder, gulp, error, $g, $o, $run}){
    let $dom_component;
    /* jshint -W061 */const gulp_place= require("./gulp_place.js")({
        gulp_replace: $g.replace,
        fs: $o.fs,
        variable_eval: (str)=> eval(str)
    });/* jshint +W061 */
    const { examples_bin, examples_src, bin }= app.directories;
    let links_paragraphs_buffer= [];
    return function(cb){
        getFileAsText("https://raw.githubusercontent.com/jaandrle/dollar_dom_component/master/bin/%24dom_component-min.js")
        .then(function(file){
            $dom_component= file;
            
            gulp.src([examples_src+"*.html", '!'+examples_src+'*.sub.html'])
                .pipe(gulp_place({ folder: examples_src, string_wrapper: '' }))
                .pipe($g.replace(/(\/\/EXAMPLE START|<!-- example source links -->)/g, addSourceLink))
                .pipe(gulp.dest(examples_bin))
                .on('end', function(){
                    gulp.src([bin+"$dom_svg-min.js"])
                    .pipe(gulp.dest(examples_bin))
                    .on('end', cb);
                });
        })
        .catch(function(err){
            error.handler(err);
            cb();
        });
    };
    function addSourceLink(match, type, chars, file_text){
        if(type==="<!-- example source links -->"){
            return links_paragraphs_buffer.shift();
        }
        const line= String((t=> t&&t.length+1||1)(file_text.substring(0, chars).match(/\r?\n/g)));
        const link= "https://github.com/jaandrle/dollar_dom_svg/blob/master/docs/examples.html#L"+line;
        links_paragraphs_buffer.push(`<p class="notes"><a href="${link}" target="_blank">View with highliting (link to source of this file)</a></p>`);
        return match;
    }
    function toELID(str){ return "example_element_"+pad(str, 3, "0"); }
    function toKeyUp(el_str){ return `onKeyup(this, '${el_str}')`; }
    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
    function getFileAsText(url){ return new Promise(function(resolve, reject){
        require("https").get(url, function(response){
            let data= "";
            response.on("data", chunk=> data+= chunk);
            response.on("end", function(){ resolve(data); });
        }).on("error", reject);
    });} 
};
