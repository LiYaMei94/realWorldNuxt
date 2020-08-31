(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{325:function(t,e,r){"use strict";r.d(e,"m",(function(){return o})),r.d(e,"n",(function(){return c})),r.d(e,"r",(function(){return l})),r.d(e,"k",(function(){return m})),r.d(e,"h",(function(){return d})),r.d(e,"p",(function(){return f})),r.d(e,"i",(function(){return h})),r.d(e,"c",(function(){return v})),r.d(e,"b",(function(){return w})),r.d(e,"d",(function(){return O})),r.d(e,"q",(function(){return j})),r.d(e,"e",(function(){return x})),r.d(e,"a",(function(){return E})),r.d(e,"j",(function(){return _})),r.d(e,"f",(function(){return T})),r.d(e,"g",(function(){return C})),r.d(e,"o",(function(){return L})),r.d(e,"l",(function(){return S}));var n=r(89);function o(t){return Object(n.b)({url:"/api/users/login",method:"POST",options:t})}function c(t){return Object(n.b)({url:"/api/users",method:"POST",options:t})}function l(t){return Object(n.b)({url:"/api/user",method:"PUT",options:t})}function m(t){return Object(n.b)({url:"/api/profiles/".concat(t.username),method:"GET",options:t})}function d(t){return Object(n.b)({url:"/api/profiles/".concat(t.username,"/follow"),method:"POST"})}function f(t){return Object(n.b)({url:"/api/profiles/".concat(t.username,"/follow"),method:"DELETE"})}function h(t){return Object(n.b)({url:"/api/articles",method:"GET",options:t})}function v(t){return Object(n.b)({url:"/api/articles/feed",method:"GET",options:t})}function w(t){return Object(n.b)({url:"/api/articles/".concat(t.slug),method:"GET",options:t})}function O(t){return Object(n.b)({url:"/api/articles",method:"POST",options:t})}function j(t){return Object(n.b)({url:"/api/articles/".concat(t.slug),method:"PUT",options:{article:t.article}})}function x(t){return Object(n.b)({url:"/api/articles/".concat(t.slug),method:"DELETE"})}function E(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/comments"),method:"POST",options:{comment:{body:t.body}}})}function _(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/comments"),method:"GET"})}function T(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/comments/").concat(t.id),method:"DELETE"})}function C(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/favorite"),method:"POST"})}function L(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/favorite"),method:"DELETE"})}function S(t){return Object(n.b)({url:"/api/tags",method:"GET",options:t})}},399:function(t,e,r){"use strict";r.r(e);var n=r(59),o=(r(43),r(4)),c=(r(45),r(325)),l=r(321),m={middleware:"notAuthenticated",name:"Login",data:function(){return{user:{username:"",email:"",password:""},error:{}}},watch:{$route:function(t,e){this.error={}}},computed:{isLogin:function(){return"login"===this.$route.name},isSubmit:function(){return""!==this.user.email&&""!==this.user.password||""!==this.user.username&&""!==this.user.password&&""!==this.user.email}},methods:{submit:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r="",data=null,e.prev=2,!t.isLogin||!t.isSubmit){e.next=9;break}return e.next=6,Object(c.m)({user:{email:t.user.email,password:t.user.password}});case 6:data=e.sent,e.next=17;break;case 9:if(t.isLogin||!t.isSubmit){e.next=15;break}return e.next=12,Object(c.n)({user:t.user});case 12:data=e.sent,e.next=17;break;case 15:r=t.isLogin?"email or password":"email or password or username",t.error=Object(n.a)({},r,["is invalid"]);case 17:t.$store.commit("setAuth",data.user),l.set("auth",data.user),t.$router.push("/"),e.next=25;break;case 22:e.prev=22,e.t0=e.catch(2),t.error=e.t0.response.data.errors;case 25:case"end":return e.stop()}}),e,null,[[2,22]])})))()}}},d=r(33),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"auth-page"},[r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 offset-md-3 col-xs-12"},[r("h1",{staticClass:"text-xs-center"},[t._v(t._s(t.isLogin?"Sign in":"Sign up"))]),t._v(" "),r("p",{staticClass:"text-xs-center"},[r("nuxt-link",{attrs:{to:t.isLogin?"/register":"/login"}},[t._v(t._s(t.isLogin?"Need an account?":"Have an account?"))])],1),t._v(" "),r("ul",{staticClass:"error-messages"},[t._l(t.error,(function(e,n){return t._l(e,(function(e,o){return r("li",{key:o},[t._v(t._s(n)+" "+t._s(e))])}))}))],2),t._v(" "),r("form",{ref:"form",on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[t.isLogin?t._e():r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.user.username,expression:"user.username"}],staticClass:"form-control form-control-lg",attrs:{required:"",type:"text",placeholder:"Your Name"},domProps:{value:t.user.username},on:{input:function(e){e.target.composing||t.$set(t.user,"username",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"form-control form-control-lg",attrs:{required:"",type:"email",placeholder:"Email"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"form-control form-control-lg",attrs:{required:"",minlength:"8",type:"password",placeholder:"Password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),t._v(" "),r("button",{staticClass:"btn btn-lg btn-primary pull-xs-right",on:{click:t.submit}},[t._v("\n                        "+t._s(t.isLogin?"Sign in":"Sign up")+"\n                    ")])])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);