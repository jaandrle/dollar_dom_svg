/* jshint esversion: 6,-W097, -W040, browser: true, expr: true, undef: true */
/**
 * This namespace provides methods to register global masks/linearGradiens based on their ids.
 * @namespace global_defs
 * @memberof public
 */
_public.global_defs= (function(){
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