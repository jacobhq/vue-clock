'use strict';Object.defineProperty(exports,'__esModule',{value:true});const SECOND = 1000;
const HOUR = 12;

function getHourTime (h) {
  return h >= 12 ? 'PM' : 'AM'
}

function getZeroPad (n) {
  return (parseInt(n, 10) >= 10 ? '' : '0') + n
}//

var script = {
  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      hourtime: '',
    };
  },
  mounted() {
    this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);
  },
  beforeDestroy() {
    window.clearTimeout(this.$options.timer);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.hours = now.getHours();
      this.minutes = getZeroPad(now.getMinutes());
      this.seconds = getZeroPad(now.getSeconds());
      this.hourtime = getHourTime(this.hours);
      this.hours = this.hours % HOUR || HOUR;
      this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);
    },
  },
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.hourtime != ""
    ? _c("div", { staticClass: "clock" }, [
        _vm._ssrNode(
          '<div class="clock__hours" data-v-4021b5d2><span class="clock__hourtime" data-v-4021b5d2>' +
            _vm._ssrEscape(_vm._s(_vm.hourtime)) +
            "</span> <span data-v-4021b5d2>" +
            _vm._ssrEscape(_vm._s(_vm.hours)) +
            '</span></div> <div class="clock__minutes" data-v-4021b5d2>' +
            _vm._ssrEscape(_vm._s(_vm.minutes)) +
            '</div> <div class="clock__seconds" data-v-4021b5d2>' +
            _vm._ssrEscape(_vm._s(_vm.seconds)) +
            "</div>"
        )
      ])
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4021b5d2_0", { source: "\n@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');\n.clock[data-v-4021b5d2] {\r\n  background: #fff;\r\n  border: 0.3rem solid #fff;\r\n  border-radius: 0.7rem;\r\n  display: inline-block;\r\n  margin-bottom: 1em;\n}\n.clock__hours[data-v-4021b5d2],\r\n.clock__minutes[data-v-4021b5d2],\r\n.clock__seconds[data-v-4021b5d2] {\r\n  background: linear-gradient(to bottom, #26303b 50%, #2c3540 50%);\r\n  display: inline-block;\r\n  color: #fff;\r\n  font-family: 'Nunito', sans-serif;\r\n  font-size: 3rem;\r\n  font-weight: 300;\r\n  padding: 0.5rem 1rem;\r\n  text-align: center;\r\n  position: relative;\n}\n.clock__hours[data-v-4021b5d2] {\r\n  border-right: 0.15rem solid #fff;\r\n  border-radius: 0.5rem 0 0 0.5rem;\n}\n.clock__minutes[data-v-4021b5d2] {\r\n  border-right: 0.15rem solid #fff;\n}\n.clock__seconds[data-v-4021b5d2] {\r\n  border-radius: 0 0.5rem 0.5rem 0;\n}\n.clock__hourtime[data-v-4021b5d2] {\r\n  font-size: 1rem;\r\n  position: absolute;\r\n  top: 2px;\r\n  left: 8px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Coold\\OneDrive\\vue-clock\\src\\VueClock.vue"],"names":[],"mappings":";AA4CA,2EAAA;AAEA;EACA,gBAAA;EACA,yBAAA;EACA,qBAAA;EACA,qBAAA;EACA,kBAAA;AACA;AAEA;;;EAGA,gEAAA;EACA,qBAAA;EACA,WAAA;EACA,iCAAA;EACA,eAAA;EACA,gBAAA;EACA,oBAAA;EACA,kBAAA;EACA,kBAAA;AACA;AAEA;EACA,gCAAA;EACA,gCAAA;AACA;AAEA;EACA,gCAAA;AACA;AAEA;EACA,gCAAA;AACA;AAEA;EACA,eAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;AACA","file":"VueClock.vue","sourcesContent":["<template>\r\n  <div class=\"clock\" v-if=\"hourtime != ''\">\r\n    <div class=\"clock__hours\">\r\n      <span class=\"clock__hourtime\" v-text=\"hourtime\"></span>\r\n      <span v-text=\"hours\"></span>\r\n    </div>\r\n    <div class=\"clock__minutes\" v-text=\"minutes\"></div>\r\n    <div class=\"clock__seconds\" v-text=\"seconds\"></div>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport { SECOND, HOUR, getHourTime, getZeroPad } from './Filters';\r\n\r\nexport default {\r\n  data() {\r\n    return {\r\n      hours: 0,\r\n      minutes: 0,\r\n      seconds: 0,\r\n      hourtime: '',\r\n    };\r\n  },\r\n  mounted() {\r\n    this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);\r\n  },\r\n  beforeDestroy() {\r\n    window.clearTimeout(this.$options.timer);\r\n  },\r\n  methods: {\r\n    updateDateTime() {\r\n      const now = new Date();\r\n      this.hours = now.getHours();\r\n      this.minutes = getZeroPad(now.getMinutes());\r\n      this.seconds = getZeroPad(now.getSeconds());\r\n      this.hourtime = getHourTime(this.hours);\r\n      this.hours = this.hours % HOUR || HOUR;\r\n      this.$options.timer = window.setTimeout(this.updateDateTime, SECOND);\r\n    },\r\n  },\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');\r\n\r\n.clock {\r\n  background: #fff;\r\n  border: 0.3rem solid #fff;\r\n  border-radius: 0.7rem;\r\n  display: inline-block;\r\n  margin-bottom: 1em;\r\n}\r\n\r\n.clock__hours,\r\n.clock__minutes,\r\n.clock__seconds {\r\n  background: linear-gradient(to bottom, #26303b 50%, #2c3540 50%);\r\n  display: inline-block;\r\n  color: #fff;\r\n  font-family: 'Nunito', sans-serif;\r\n  font-size: 3rem;\r\n  font-weight: 300;\r\n  padding: 0.5rem 1rem;\r\n  text-align: center;\r\n  position: relative;\r\n}\r\n\r\n.clock__hours {\r\n  border-right: 0.15rem solid #fff;\r\n  border-radius: 0.5rem 0 0 0.5rem;\r\n}\r\n\r\n.clock__minutes {\r\n  border-right: 0.15rem solid #fff;\r\n}\r\n\r\n.clock__seconds {\r\n  border-radius: 0 0.5rem 0.5rem 0;\r\n}\r\n\r\n.clock__hourtime {\r\n  font-size: 1rem;\r\n  position: absolute;\r\n  top: 2px;\r\n  left: 8px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-4021b5d2";
  /* module identifier */
  const __vue_module_identifier__ = "data-v-4021b5d2";
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    createInjectorSSR,
    undefined
  );// Declare install function excuted by Vue.use()
const install = function(Vue) {
  if (install.installed) return
  install.installed = true;
  Vue.component('VueClock', __vue_component__);
};

// Create module definition for Vue.use
const plugin = { install };

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

__vue_component__.install = install;exports.default=__vue_component__;