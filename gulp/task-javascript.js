/* jshint esversion: 6,-W097, -W040, node: true, expr: true, undef: true */
module.exports= function({app, $gulp_folder, gulp, error, $g, $o, $run}){
    /* jshint -W061 */const gulp_place= require("./gulp_place.js")({
        gulp_replace: $g.replace,
        fs: $o.fs,
        variable_eval: (str)=> eval(str),
        filesCleaner: require("./gulp_cleanJSHINT.js")
    });/* jshint +W061 */
    const { bin, src }= app.directories;
    return function(cb){
        let cmd;
        cmd= $o.spawn("node", ['node_modules/jshint/bin/jshint', src], {});
        cmd.stdout.on('data', function(data){ error.addText(data.toString()+"\n"); });
        cmd.on('close', run);
        function run(code){
            let main_stream;
            if(!code){
                main_stream= gulp.src([src+"*.js", src+"*/*.js", '!'+src+'*.sub.js', '!'+src+'*/*.sub.js'])
                    .pipe(gulp_place({folder: "src/", string_wrapper: '"'}))
                    .pipe($g.replace(/\/\* gulp \*\/\/\* global gulp_place \*\/\r?\n/g,""));
    
                main_stream
                    .on('error', error.handler)
                    .pipe($g.rename(function(p){
                        if(p.dirname==="_jaaJSU") p.basename+= ".sub";
                        return p;
                    }))
                    .pipe(gulp.dest(bin))
                    .on('end', function minify(){
                        gulp.src([bin+"*js", "!"+bin+"*-min.js"])
                            //.pipe($g.js_obfuscator())
                            .pipe($g.minify_js({noSource : true}))
                            .on('error', error.handler)
                            //.pipe($g.rename({suffix: ".min"}))
                            .pipe(gulp.dest(bin))
                            .on('end', cb);
                    });
            } else {
                $g.util.log($g.util.colors.red('[Error]'), "Error(s) in javascripts!");
                $o.fs.writeFile($gulp_folder+'build.log', error.getText(), cb);
                error.addNum();
            }
        }
    };
};
