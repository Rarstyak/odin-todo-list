(()=>{var e={402:(e,t,n)=>{"use strict";n.d(t,{Z:()=>d});var o=n(81),r=n.n(o),i=n(645),c=n.n(i)()(r());c.push([e.id,'html {\n    font-size: 16px;\n}\n\nbody {\n    margin: 0px;\n    height: 100vh;\n    width: 100vw;\n    \n    display: grid;\n    grid: \n        "storage project" 10rem\n        "list todo" 1fr\n        / 15rem 1fr;\n}\n\n#storage-container {\n    grid-area: storage;\n}\n\n#list-container {\n    grid-area: list;\n}\n\n.project-tab {\n    display: flex;\n}\n\n.project-tab-select {\n    flex: auto;\n}\n\n#project-container {\n    grid-area: project;\n}\n\n#todo-container {\n    grid-area: todo;\n}\n\n.todo-card {\n    display: grid;\n    grid:\n        "done info edit remove" 3rem\n        / 3rem 11rem 3rem 3rem;\n}\n\n.todo-card .done {\n    grid-area: done;\n}\n\n.todo-card .info {\n    grid-area: info;\n    padding: 0.5rem;\n}\n\n.todo-card .info .title {\n    font-size: 1rem;\n}\n\n.todo-card .info .description {\n    font-size: 0.75rem;\n}\n\n.todo-card .edit {\n    grid-area: edit;\n}\n\n.todo-card .remove {\n    grid-area: remove;\n}\n\n.full-screen {\n    position: absolute;\n    top:0px;\n    bottom:0px;\n    width: 100%;\n    background-color: teal;\n}',""]);const d=c},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",o=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),o&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),o&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,o,r,i){"string"==typeof e&&(e=[[null,e,void 0]]);var c={};if(o)for(var d=0;d<this.length;d++){var s=this[d][0];null!=s&&(c[s]=!0)}for(var a=0;a<e.length;a++){var l=[].concat(e[a]);o&&c[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),t.push(l))}},t}},81:e=>{"use strict";e.exports=function(e){return e[1]}},798:function(e,t,n){e=n.nmd(e),function(n,o){"use strict";var r={};n.PubSub?(r=n.PubSub,console.warn("PubSub already loaded, using existing version")):(n.PubSub=r,function(e){var t={},n=-1,o="*";function r(e,t,n){try{e(t,n)}catch(e){setTimeout(function(e){return function(){throw e}}(e),0)}}function i(e,t,n){e(t,n)}function c(e,n,o,c){var d,s=t[n],a=c?i:r;if(Object.prototype.hasOwnProperty.call(t,n))for(d in s)Object.prototype.hasOwnProperty.call(s,d)&&a(s[d],e,o)}function d(e){var n=String(e);return Boolean(Object.prototype.hasOwnProperty.call(t,n)&&function(e){var t;for(t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!0;return!1}(t[n]))}function s(e,t,n,r){var i=function(e,t,n){return function(){var r=String(e),i=r.lastIndexOf(".");for(c(e,e,t,n);-1!==i;)i=(r=r.substr(0,i)).lastIndexOf("."),c(e,r,t,n);c(e,o,t,n)}}(e="symbol"==typeof e?e.toString():e,t,r);return!!function(e){for(var t=String(e),n=d(t)||d(o),r=t.lastIndexOf(".");!n&&-1!==r;)r=(t=t.substr(0,r)).lastIndexOf("."),n=d(t);return n}(e)&&(!0===n?i():setTimeout(i,0),!0)}e.publish=function(t,n){return s(t,n,!1,e.immediateExceptions)},e.publishSync=function(t,n){return s(t,n,!0,e.immediateExceptions)},e.subscribe=function(e,o){if("function"!=typeof o)return!1;e="symbol"==typeof e?e.toString():e,Object.prototype.hasOwnProperty.call(t,e)||(t[e]={});var r="uid_"+String(++n);return t[e][r]=o,r},e.subscribeAll=function(t){return e.subscribe(o,t)},e.subscribeOnce=function(t,n){var o=e.subscribe(t,(function(){e.unsubscribe(o),n.apply(this,arguments)}));return e},e.clearAllSubscriptions=function(){t={}},e.clearSubscriptions=function(e){var n;for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&0===n.indexOf(e)&&delete t[n]},e.countSubscriptions=function(e){var n,o,r=0;for(n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&0===n.indexOf(e)){for(o in t[n])r++;break}return r},e.getSubscriptions=function(e){var n,o=[];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&0===n.indexOf(e)&&o.push(n);return o},e.unsubscribe=function(n){var o,r,i,c="string"==typeof n&&(Object.prototype.hasOwnProperty.call(t,n)||function(e){var n;for(n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&0===n.indexOf(e))return!0;return!1}(n)),d=!c&&"string"==typeof n,s="function"==typeof n,a=!1;if(!c){for(o in t)if(Object.prototype.hasOwnProperty.call(t,o)){if(r=t[o],d&&r[n]){delete r[n],a=n;break}if(s)for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&r[i]===n&&(delete r[i],a=!0)}return a}e.clearSubscriptions(n)}}(r)),void 0!==e&&e.exports&&(t=e.exports=r),t.PubSub=r,e.exports=t=r}("object"==typeof window&&window||this)},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,o=0;o<t.length;o++)if(t[o].identifier===e){n=o;break}return n}function o(e,o){for(var i={},c=[],d=0;d<e.length;d++){var s=e[d],a=o.base?s[0]+o.base:s[0],l=i[a]||0,u="".concat(a," ").concat(l);i[a]=l+1;var p=n(u),m={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)t[p].references++,t[p].updater(m);else{var b=r(m,o);o.byIndex=d,t.splice(d,0,{identifier:u,updater:b,references:1})}c.push(u)}return c}function r(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,r){var i=o(e=e||[],r=r||{});return function(e){e=e||[];for(var c=0;c<i.length;c++){var d=n(i[c]);t[d].references--}for(var s=o(e,r),a=0;a<i.length;a++){var l=n(i[a]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}i=s}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var o=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,r&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),n.nc=void 0,(()=>{"use strict";var e=n(798),t=n.n(e);const o="local storage save",r="local storage load",i="local storage reset",c="dom update list",d="dom update project",s="dom update todo",l="list select",u="todo toggle",p="project add",m="project edit",b="project move",f="project remove",h="todo add",y="todo edit",v="todo move",g="todo remove";var C=n(379),x=n.n(C),E=n(795),j=n.n(E),S=n(569),O=n.n(S),L=n(565),T=n.n(L),w=n(216),k=n.n(w),A=n(589),D=n.n(A),P=n(402),q={};q.styleTagTransform=D(),q.setAttributes=T(),q.insert=O().bind(null,"head"),q.domAPI=j(),q.insertStyleElement=k(),x()(P.Z,q),P.Z&&P.Z.locals&&P.Z.locals;const I=()=>{const e=document.createElement("button");return e.textContent="SAVE",e.classList.add("local-storage-save"),e.addEventListener("click",(()=>t().publish(o))),e},N=()=>{const e=document.createElement("button");return e.textContent="LOAD",e.classList.add("local-storage-load"),e.addEventListener("click",(()=>t().publish(r))),e},M=()=>{const e=document.createElement("button");return e.textContent="RESET",e.classList.add("local-storage-reset"),e.addEventListener("click",(()=>t().publish(i))),e},J=function(){const e=[],n=(n,o)=>{const r=document.querySelector("#project-tabs-container"),i=o.length;let c=e.length;if(i>c)for(let n=c;n<i;n+=1){const o=document.createElement("div"),i=document.createElement("button"),c=document.createElement("button"),d=document.createElement("button");o.classList.add("project-tab"),i.classList.add("project-tab-select"),i.classList.add("project-tab-edit"),d.classList.add("project-tab-remove"),c.textContent="e",d.textContent="x",i.addEventListener("click",(()=>t().publish(l,n))),c.addEventListener("click",(()=>t().publish(m,{title:prompt("title",i.textContent),index:n}))),d.addEventListener("click",(()=>t().publish(f,n))),o.appendChild(i),o.appendChild(c),o.appendChild(d),r.appendChild(o),e.push(o)}c=e.length;for(let t=c-1;t>=0;t-=1)t>=i?e[t].style.display="none":(e[t].style.display="",e[t].querySelector(".project-tab-select").textContent=o[t])};return{initList:()=>{t().subscribe(c,n);const e=document.createElement("div");e.setAttribute("id","list-container");const o=document.createElement("div");o.setAttribute("id","project-tabs-container");const r=document.createElement("div");r.setAttribute("id","project-add-container");const i=(()=>{const e=document.createElement("button");return e.textContent="+",e.addEventListener("click",(()=>s())),e.style.display="block",e})(),d=(()=>{const e=document.createElement("form");e.id="project-form",e.action="",e.method="get";const n=document.createElement("input");n.type="text",n.name="title",n.id="project-form-title",n.required=!0,n.placeholder="Project Name";const o=document.createElement("input");o.type="text",o.name="desc",o.id="project-form-desc",o.placeholder="Project Description";const r=document.createElement("button");r.textContent="Cancel",r.type="button",r.addEventListener("click",(()=>s()));const i=document.createElement("button");return i.textContent="Submit",e.appendChild(n),e.appendChild(o),e.appendChild(r),e.appendChild(i),e.style.display="none",e.classList.add("full-screen"),e.addEventListener("submit",(function(e){e.preventDefault(),t().publish(p,{title:n.value,description:o.value}),s()})),e})(),s=()=>{i.style.display="block"===i.style.display?"none":"block",d.style.display="block"===d.style.display?"none":"block",d.reset()};return r.appendChild(i),e.appendChild(o),e.appendChild(r),document.querySelector("body").appendChild(d),e}}}(),H=function(){const e=(e,t)=>{const n=document.querySelector("#project-title"),o=document.querySelector("#project-description");n.textContent=t.title,o.textContent=t.description};return{initProject:()=>{t().subscribe(d,e);const n=document.createElement("div");n.setAttribute("id","project-container");const o=document.createElement("h1");o.setAttribute("id","project-title"),n.appendChild(o);const r=document.createElement("p");r.setAttribute("id","project-description"),n.appendChild(r);const i=document.createElement("button");return i.setAttribute("id","project-remove"),i.textContent="REMOVE",i.addEventListener("click",(()=>t().publish(f))),n.appendChild(i),n}}}(),U=function(){const e=[],n=e=>{const n=document.createElement("div");n.classList.add("todo-card");const o=document.createElement("button");o.classList.add("done"),o.addEventListener("click",(()=>t().publish(u,e))),n.appendChild(o);const r=document.createElement("div");r.classList.add("info"),n.appendChild(r);const i=document.createElement("div");i.classList.add("title"),r.appendChild(i);const c=document.createElement("div");c.classList.add("description"),r.appendChild(c);const d=document.createElement("div");d.classList.add("priority"),r.appendChild(d);const s=document.createElement("div");s.classList.add("dueDate"),r.appendChild(s);const a=document.createElement("button");a.classList.add("edit"),a.textContent="Edit",a.addEventListener("click",(()=>t().publish(y,{title:prompt("New Title",i.textContent),description:prompt("New Description",c.textContent),index:e}))),n.appendChild(a);const l=document.createElement("button");return l.classList.add("remove"),l.textContent="X",l.addEventListener("click",(()=>t().publish(g,e))),n.appendChild(l),n},o=(e,t)=>{e.querySelector(".done").textContent=t.done?"Y":"N",e.querySelector(".title").textContent=`${t.title}`,e.querySelector(".description").textContent=`${t.description}`,e.querySelector(".priority").textContent=`${t.priority}`,e.querySelector(".dueDate").textContent=`${t.dueDate}`},r=(t,r)=>{const i=document.querySelector("#todo-cards-container"),c=r.length;let d=e.length;if(c>d)for(let t=d;t<c;t+=1){const o=n(t);i.appendChild(o),e.push(o)}d=e.length;for(let t=d-1;t>=0;t-=1)t>=c?e[t].style.display="none":(e[t].style.display="",o(e[t],r[t]))};return{initTodo:()=>{t().subscribe(s,r);const e=document.createElement("div");e.setAttribute("id","todo-container");const n=document.createElement("div");n.setAttribute("id","todo-cards-container");const o=document.createElement("div");o.setAttribute("id","todo-add-container");const i=()=>{c.style.display="block"===c.style.display?"none":"block",d.style.display="block"===d.style.display?"none":"block",d.reset()},c=(()=>{const e=document.createElement("button");return e.textContent="Add Todo",e.addEventListener("click",(()=>i())),e.style.display="block",e})(),d=(()=>{const e=document.createElement("form");e.id="todo-form",e.action="",e.method="get";const n=document.createElement("input");n.type="text",n.name="title",n.id="todo-form-title",n.required=!0,n.placeholder="Todo Name";const o=document.createElement("input");o.type="text",o.name="desc",o.id="todo-form-desc",o.placeholder="Todo Description";const r=document.createElement("input");r.type="radio",r.name="priority",r.id="todo-form-priority-low",r.value="LOW";const c=document.createElement("label");c.htmlFor="todo-form-priority-low",c.textContent="LOW";const d=document.createElement("input");d.type="radio",d.name="priority",d.id="todo-form-priority-med",d.value="MEDIUM";const s=document.createElement("label");s.htmlFor="todo-form-priority-med",s.textContent="MEDIUM";const a=document.createElement("input");a.type="radio",a.name="priority",a.id="todo-form-priority-high",a.value="HIGH";const l=document.createElement("label");l.htmlFor="todo-form-priority-high",l.textContent="HIGH";const u=document.createElement("input");u.type="date",u.name="dueDate",u.id="todo-form-dueDate",u.required=!0;const p=document.createElement("button");p.textContent="Cancel",p.type="button",p.addEventListener("click",(()=>i()));const m=document.createElement("button");return m.textContent="Submit",e.appendChild(n),e.appendChild(o),e.appendChild(r),e.appendChild(d),e.appendChild(a),e.appendChild(c),e.appendChild(s),e.appendChild(l),e.appendChild(u),e.appendChild(p),e.appendChild(m),e.style.display="none",e.classList.add("full-screen"),e.addEventListener("submit",(function(e){e.preventDefault(),t().publish(h,{title:n.value,description:o.value}),i()})),e})();return o.appendChild(c),e.appendChild(n),e.appendChild(o),document.querySelector("body").appendChild(d),e}}}(),$=(function(){const e=document.querySelector("body");!function(){const t=document.createElement("div");t.setAttribute("id","storage-container"),e.appendChild(t);const n=I();t.appendChild(n);const o=N();t.appendChild(o);const r=M();t.appendChild(r);const i=J.initList();e.appendChild(i);const c=H.initProject();e.appendChild(c);const d=U.initTodo();e.appendChild(d)}()}(),function(){function e(e,t){console.log(`Log Action (${e}): ${t}`)}t().subscribe(o,e),t().subscribe(r,e),t().subscribe(i,e),t().subscribe(c,e),t().subscribe(d,e),t().subscribe(s,e),t().subscribe(l,e),t().subscribe(u,e),t().subscribe(p,e),t().subscribe(m,e),t().subscribe(b,e),t().subscribe(f,e),t().subscribe(h,e),t().subscribe(y,e),t().subscribe(v,e),t().subscribe(g,e)}(),(e,t,n,o,r,i)=>{let c=e||"Untitled",d=t||"",s=n||"",a=o||"",l=r||!1,u=i||"";const p=()=>c,m=e=>c!=e&&null!=e&&(c=e,!0),b=()=>d,f=e=>d!=e&&null!=e&&(d=e,!0),h=()=>s,y=e=>s!=e&&null!=e&&(s=e,!0),v=()=>a,g=e=>a!=e&&null!=e&&(a=e,!0),C=()=>l,x=e=>l!=e&&null!=e&&(l=e,!0),E=()=>u,j=e=>u!=e&&null!=e&&(u=e,!0);return{getTitle:p,getDescription:b,getDueDate:h,getPriority:v,getDone:C,getNote:E,update:(e,t,n,o,r,i)=>[m(e),f(t),y(n),g(o),x(r),j(i)].some((e=>e)),toggleDone:()=>(l=!l,!0),toJSON:()=>({title:p(),description:b(),dueDate:h(),priority:v(),done:C(),note:E()})}}),B=(e,t)=>{let n=e||"Untitled",o=t||"";const r=[],i=()=>n,c=e=>n!=e&&null!=e&&(n=e,!0),d=()=>o,s=e=>o!=e&&null!=e&&(o=e,!0),l=()=>r.map((e=>e.toJSON()));return{getTitle:i,getDescription:d,setTitle:c,setDescription:s,update:(e,t)=>[c(e),s(t)].some((e=>e)),addTodo:e=>{r.push(e)},editTodo:(e,t,n,o,i,c,d)=>r[e].update(t,n,o,i,c,d),toggleTodo:e=>r[e].toggleDone(),removeTodo:e=>{r.splice(e,1)},moveTodo:(e,t)=>{const n=r[a];e<t?(r.splice(t,0,n),r.splice(e,1)):(r.splice(e,1),r.splice(t,0,n))},getTodosJSON:l,toJSON:()=>({title:i(),description:d(),todos:l()})}};!function(){const e=[];let n=0;const a=t=>e.push(t),C=()=>{n=0,e.length=0;const t=JSON.parse(localStorage.getItem("projects"))||[];if(t.length)t.forEach((e=>{const t=B(e.title,e.description);a(t),e.todos.length&&e.todos.forEach((e=>{const n=$(e.title,e.description,e.dueDate,e.priority,e.done,e.note);t.addTodo(n)}))})),E();else{const e=B("Default","The default project");a(e),e.addTodo($("1")),e.addTodo($("2","yeet")),e.addTodo($("3")),E()}},x=(e,t)=>{n=t,j()},E=()=>{t().publish(c,e.map((e=>e.getTitle()))),j()},j=()=>{t().publish(d,(()=>{const t=e[n];return{title:t.getTitle(),description:t.getDescription()}})()),S()},S=()=>{t().publish(s,e[n].getTodosJSON())};t().subscribe(o,(()=>{localStorage.setItem("projects",JSON.stringify(e))})),t().subscribe(r,C),t().subscribe(i,(()=>{confirm("This will clear local storage. Are you sure?")&&(localStorage.removeItem("projects"),C())})),t().subscribe(l,x),t().subscribe(u,((t,o)=>{e[n].toggleTodo(o)&&S()})),t().subscribe(p,((e,t)=>{const n=B(t.title,t.description),o=a(n);E(),x(0,o-1)})),t().subscribe(m,((t,o)=>{e[o.index].update(o.title,o.description)&&(n=o.index,E())})),t().subscribe(b,((t,n)=>{const o=e[n.indexA];n.indexA<n.indexB?(e.splice(n.indexB,0,o),e.splice(n.indexA,1)):(e.splice(n.indexA,1),e.splice(n.indexB,0,o))})),t().subscribe(f,((t,o=n)=>{e.length>1&&o<e.length&&(e.splice(o,1),n+=n==e.length||o<n&&0!=n?-1:0,E())})),t().subscribe(h,((t,o)=>{const r=$(o.title,o.description,o.dueDate,o.priority,o.done,o.note);e[n].addTodo(r),S()})),t().subscribe(y,((t,o)=>{e[n].editTodo(o.index,o.title,o.description,o.dueDate,o.priority,o.done,o.note)&&S()})),t().subscribe(v,((t,o)=>{e[n].moveTodo(o.indexA,o.indexB)})),t().subscribe(g,((t,o)=>{e[n].removeTodo(o),S()})),C()}()})()})();