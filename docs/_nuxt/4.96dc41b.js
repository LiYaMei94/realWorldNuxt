(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{325:function(t,e,r){"use strict";r.d(e,"m",(function(){return c})),r.d(e,"n",(function(){return o})),r.d(e,"r",(function(){return l})),r.d(e,"k",(function(){return d})),r.d(e,"h",(function(){return f})),r.d(e,"p",(function(){return v})),r.d(e,"i",(function(){return m})),r.d(e,"c",(function(){return h})),r.d(e,"b",(function(){return O})),r.d(e,"d",(function(){return _})),r.d(e,"q",(function(){return j})),r.d(e,"e",(function(){return y})),r.d(e,"a",(function(){return C})),r.d(e,"j",(function(){return w})),r.d(e,"f",(function(){return P})),r.d(e,"g",(function(){return k})),r.d(e,"o",(function(){return E})),r.d(e,"l",(function(){return x}));var n=r(89);function c(t){return Object(n.b)({url:"/api/users/login",method:"POST",options:t})}function o(t){return Object(n.b)({url:"/api/users",method:"POST",options:t})}function l(t){return Object(n.b)({url:"/api/user",method:"PUT",options:t})}function d(t){return Object(n.b)({url:"/api/profiles/".concat(t.username),method:"GET",options:t})}function f(t){return Object(n.b)({url:"/api/profiles/".concat(t.username,"/follow"),method:"POST"})}function v(t){return Object(n.b)({url:"/api/profiles/".concat(t.username,"/follow"),method:"DELETE"})}function m(t){return Object(n.b)({url:"/api/articles",method:"GET",options:t})}function h(t){return Object(n.b)({url:"/api/articles/feed",method:"GET",options:t})}function O(t){return Object(n.b)({url:"/api/articles/".concat(t.slug),method:"GET",options:t})}function _(t){return Object(n.b)({url:"/api/articles",method:"POST",options:t})}function j(t){return Object(n.b)({url:"/api/articles/".concat(t.slug),method:"PUT",options:{article:t.article}})}function y(t){return Object(n.b)({url:"/api/articles/".concat(t.slug),method:"DELETE"})}function C(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/comments"),method:"POST",options:{comment:{body:t.body}}})}function w(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/comments"),method:"GET"})}function P(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/comments/").concat(t.id),method:"DELETE"})}function k(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/favorite"),method:"POST"})}function E(t){return Object(n.b)({url:"/api/articles/".concat(t.slug,"/favorite"),method:"DELETE"})}function x(t){return Object(n.b)({url:"/api/tags",method:"GET",options:t})}},326:function(t,e,r){var content=r(341);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(91).default)("218d6cea",content,!0,{sourceMap:!1})},330:function(t,e,r){"use strict";r.r(e);r(130),r(41),r(42),r(15),r(88),r(45),r(319);var n=r(59),c=r(325),o=r(44);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={name:"ArticlePreview",computed:d({},Object(o.c)(["auth"])),props:{articles:{type:Array,required:!0,default:[]},articlesCount:{type:Number,required:!0,default:0},pageLimit:{type:Number,required:!0,default:10},page:{type:Number,required:!0,default:1},tag:{type:String,required:!0,default:""},tab:{type:String,required:!0,default:""}},methods:{pageChange:function(t){var e={page:t,tab:this.tab};""!==this.tag&&(e.tag=this.tag),this.$router.push({name:this.$route.name,query:e})},favorited:function(t,article,e){var r=this;article.favoriteDisabled=!0,(article.favorited?c.o:c.g)({slug:article.slug}).then((function(t){article.favoriteDisabled=!1,r.$emit("favorited",{article:d(d({},t.article),{},{favoriteDisabled:!1}),index:e})}))}}},v=r(33),component=Object(v.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t._l(t.articles,(function(e,n){return r("div",{key:e.slug,staticClass:"article-preview"},[r("div",{staticClass:"article-meta"},[r("nuxt-link",{attrs:{to:{name:"profile",params:{username:e.author.username}}}},[r("img",{attrs:{src:e.author.image}})]),t._v(" "),r("div",{staticClass:"info"},[r("nuxt-link",{staticClass:"author",attrs:{to:{name:"profile",params:{username:e.author.username}}}},[t._v("\n                    "+t._s(e.author.username)+"\n                ")]),t._v(" "),r("span",{staticClass:"date"},[t._v(t._s(t._f("date")(e.createdAt,"MMM DD, YYYY")))])],1),t._v(" "),r("button",{staticClass:"btn btn-outline-primary btn-sm pull-xs-right",class:{active:e.favorited},attrs:{disabled:e.favoriteDisabled},on:{click:function(r){return t.favorited(r,e,n)}}},[r("i",{staticClass:"ion-heart"}),t._v("\n                "+t._s(e.favoritesCount)+"\n            ")])],1),t._v(" "),r("nuxt-link",{staticClass:"preview-link",attrs:{to:{name:"article",params:{slug:e.slug}}}},[r("h1",[t._v(t._s(e.title))]),t._v(" "),r("p",[t._v(t._s(e.description))]),t._v(" "),r("span",[t._v("Read more...")]),t._v(" "),r("ul",{staticClass:"tag-list"},t._l(e.tagList,(function(e,n){return r("li",{key:n,staticClass:"tag-default tag-pill tag-outline"},[t._v("\n                    "+t._s(e)+"\n                ")])})),0)])],1)})),t._v(" "),0===t.articles.length?r("div",{staticClass:"article-preview"},[t._v("No articles are here... yet.")]):t._e(),t._v(" "),t.articlesCount>t.pageLimit?r("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.articlesCount,"page-size":t.pageLimit,"current-page":t.page},on:{"prev-click":t.pageChange,"next-click":t.pageChange,"current-change":t.pageChange}}):t._e()],2)}),[],!1,null,null,null);e.default=component.exports},340:function(t,e,r){"use strict";var n=r(326);r.n(n).a},341:function(t,e,r){(e=r(90)(!1)).push([t.i,".el-pagination.is-background .el-pager li:not(.disabled).active{background-color:#5cb85c;border-color:#5cb85c}.el-select-dropdown__item.selected{color:#5cb85c}",""]),t.exports=e},398:function(t,e,r){"use strict";r.r(e);r(130),r(41),r(88);var n=r(59),c=(r(42),r(15),r(60),r(57)),o=(r(319),r(320),r(43),r(4)),l=r(325),d=r(44);r(171);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var v={name:"HomeIndex",components:{},watchQuery:["page","tag","tab","pageLimit"],asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n,o,d,f,v,m,h,O,_,j,y,C,w;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.query,n=Number.parseInt(r.page||1),d=(n-1)*(o=10),f=r.tab||"Global_Feed",v=r.tag||"",m={limit:o,offset:d},""!==v&&(m.tag=v),h="Your_Feed"===f?l.c:l.i,e.next=11,Promise.all([h(m),Object(l.l)()]);case 11:return O=e.sent,_=Object(c.a)(O,2),j=_[0],y=j.articles,C=j.articlesCount,w=_[1].tags,y.forEach((function(t){return t.favoriteDisabled=!1})),e.abrupt("return",{articles:y,articlesCount:C,tags:w,pageLimit:o,pageOffset:d,tab:f,tag:v,page:n});case 19:case"end":return e.stop()}}),e)})))()},data:function(){return{}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(d.c)(["auth"])),mounted:function(){},methods:{favorited:function(t){var article=t.article,e=t.index;this.$set(this.articles,e,article)}}},m=(r(340),r(33)),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home-page"},[t._m(0),t._v(" "),r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-9"},[r("div",{staticClass:"feed-toggle"},[r("ul",{staticClass:"nav nav-pills outline-active"},[t.auth?r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"Your_Feed"===t.tab},attrs:{exact:"",to:{name:"home",query:{tab:"Your_Feed"}}}},[t._v("\n                                Your Feed\n                            ")])],1):t._e(),t._v(" "),r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"Global_Feed"===t.tab},attrs:{exact:"",to:{name:"home",query:{tab:"Global_Feed"}}}},[t._v("\n                                Global Feed\n                            ")])],1),t._v(" "),"tag"===t.tab?r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"tag"===t.tab},attrs:{exact:"",to:{name:"home",query:{tab:t.tab}}}},[t._v("\n                                # "+t._s(t.tag)+"\n                            ")])],1):t._e()])]),t._v(" "),r("ArticlePreview",{attrs:{articles:t.articles,articlesCount:t.articlesCount,pageLimit:t.pageLimit,tag:t.tag,tab:t.tab,page:t.page},on:{favorited:t.favorited}})],1),t._v(" "),r("div",{staticClass:"col-md-3"},[r("div",{staticClass:"sidebar"},[r("p",[t._v("Popular Tags")]),t._v(" "),r("div",{staticClass:"tag-list"},t._l(t.tags,(function(e,n){return r("nuxt-link",{key:n,staticClass:"tag-pill tag-default",attrs:{to:{name:"home",query:{tag:e,tab:"tag"}}}},[t._v("\n                            "+t._s(e)+"\n                        ")])})),1)])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("div",{staticClass:"container"},[e("h1",{staticClass:"logo-font"},[this._v("conduit")]),this._v(" "),e("p",[this._v("A place to share your knowledge.")])])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{ArticlePreview:r(330).default})}}]);