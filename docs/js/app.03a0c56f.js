(function(e){function t(t){for(var s,i,o=t[0],l=t[1],d=t[2],u=0,m=[];u<o.length;u++)i=o[u],r[i]&&m.push(r[i][0]),r[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);c&&c(t);while(m.length)m.shift()();return n.push.apply(n,d||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],s=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(s=!1)}s&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},r={1:0},n=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var c=l;n.push([7,0]),a()})({7:function(e,t,a){e.exports=a("Vtdi")},Vtdi:function(e,t,a){"use strict";a.r(t);a("VRzm");var s=a("Kw5r"),r=a("jE9Z"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"customer-list"},[a("router-link",{attrs:{to:{name:"new-customer"}}},[e._v("New Customer")]),a("h3",[e._v("Customers")]),a("table",{staticClass:"table table-hover"},[e._m(0),a("tbody",e._l(e.customers,function(t){return a("tr",{key:t.id,staticClass:"customer-row",on:{dblclick:function(a){e.openCustomer(t.id)}}},[a("td",[e._v(e._s(t.name))]),a("td",[e._v(e._s(t.email))]),a("td",[e._v(e._s(t.phone))])])}))])],1)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",{staticClass:"thead-light"},[a("tr",[a("th",[e._v("Name")]),a("th",[e._v("Email")]),a("th",[e._v("Phone")])])])}],o=(a("f3/d"),a("rGqo"),a("Wcq6")),l=a.n(o),d=(a("5x/H"),{apiKey:"AIzaSyCSTp7E0h3eQSvM7jWCwClg5MWAXmAU9aQ",authDomain:"chickadee-41af5.firebaseapp.com",databaseURL:"https://chickadee-41af5.firebaseio.com",projectId:"chickadee-41af5",storageBucket:"chickadee-41af5.appspot.com",messagingSenderId:"142972629636"}),c=l.a.initializeApp(d);l.a.firestore().settings({timestampsInSnapshots:!0});var u=c.firestore(),m={name:"customers",data:function(){return{customers:[]}},created:function(){var e=this;u.collection("customers").get().then(function(t){t.forEach(function(t){var a={id:t.id,name:t.data().name,billing_address:t.data().billing_address,phone:t.data().phone,email:t.data().email};e.customers.push(a)})})},methods:{openCustomer:function(e){M.push({name:"customer",params:{id:e}})}}},p=m,v=a("KHd+"),h=Object(v["a"])(p,n,i,!1,null,null,null),f=h.exports,b=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},_=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"customer-list"},[a("h3",[e._v("Customer")])])}],g={name:"customers",data:function(){return{customer:null}},created:function(){u.collection("customers").get(this.$route.params.id).then(function(e){})},methods:{}},C=g,w=Object(v["a"])(C,b,_,!1,null,null,null),y=w.exports,x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"customer-list"},[a("div",{staticClass:"col-md-12 order-md-1"},[a("h3",{staticClass:"mb-3"},[e._v("New Customer")]),a("form",{staticClass:"needs-validation",attrs:{novalidate:""}},[a("div",{staticClass:"mb-3"},[a("label",{attrs:{for:"name"}},[e._v("Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text",id:"name",placeholder:"Jesus H. Christ",value:"",required:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),a("div",{staticClass:"invalid-feedback"},[e._v("\n              Valid first name is required.\n            ")])]),a("div",{staticClass:"mb-3"},[a("label",{attrs:{for:"email"}},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"email",placeholder:"you@example.com"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),a("div",{staticClass:"invalid-feedback"},[e._v("\n              Please enter a valid email address for  shipping updates.\n            ")])]),a("div",{staticClass:"mb-3"},[a("label",{attrs:{for:"phone"}},[e._v("Phone")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"form-control",attrs:{type:"tel",id:"phone",placeholder:"555-555-5555"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),a("div",{staticClass:"invalid-feedback"},[e._v("\n              Please enter a valid email address for  shipping updates.\n            ")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.showAddress,expression:"!showAddress"}],staticClass:"mb-3"},[a("label",{attrs:{for:"email"}},[e._v("Billing Address")]),a("vue-google-autocomplete",{ref:"address",attrs:{id:"place-search",classname:"form-control",placeholder:"Search for billing address",country:"us"},on:{placechanged:e.getAddressData}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showAddress,expression:"showAddress"}]},[a("div",{staticClass:"mb-3"},[a("label",{attrs:{for:"address"}},[e._v("Address")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.address.address_1,expression:"address.address_1"}],staticClass:"form-control",attrs:{type:"text",id:"address_1",placeholder:"1234 Main St",required:""},domProps:{value:e.address.address_1},on:{input:function(t){t.target.composing||e.$set(e.address,"address_1",t.target.value)}}}),a("div",{staticClass:"invalid-feedback"},[e._v("\n                Please enter a billing address.\n              ")])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 mb-3"},[a("label",{attrs:{for:"zip"}},[e._v("City")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.address.city,expression:"address.city"}],staticClass:"form-control",attrs:{type:"text",id:"city",placeholder:"",required:""},domProps:{value:e.address.city},on:{input:function(t){t.target.composing||e.$set(e.address,"city",t.target.value)}}}),a("div",{staticClass:"invalid-feedback"},[e._v("\n                  Zip code required.\n                ")])]),a("div",{staticClass:"col-md-4 mb-1"},[a("label",{attrs:{for:"state"}},[e._v("State")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.address.state,expression:"address.state"}],staticClass:"form-control",attrs:{type:"text",id:"state",placeholder:"",required:""},domProps:{value:e.address.state},on:{input:function(t){t.target.composing||e.$set(e.address,"state",t.target.value)}}}),a("div",{staticClass:"invalid-feedback"},[e._v("\n                  Please provide a valid state.\n                ")])]),a("div",{staticClass:"col-md-4 mb-3"},[a("label",{attrs:{for:"zip"}},[e._v("Zip")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.address.zip,expression:"address.zip"}],staticClass:"form-control",attrs:{type:"text",id:"zip",placeholder:"",required:""},domProps:{value:e.address.zip},on:{input:function(t){t.target.composing||e.$set(e.address,"zip",t.target.value)}}}),a("div",{staticClass:"invalid-feedback"},[e._v("\n                  Zip code required.\n                ")])])])]),a("button",{staticClass:"btn btn-primary btn-lg btn-block",attrs:{type:"submit"}},[e._v("Save Customer")])])])])},k=[],j=a("ARhK"),E={components:{VueGoogleAutocomplete:j["a"]},name:"new-customer",data:function(){return{phone:null,name:null,email:null,address:{address_1:null,state:null,zip:null,city:null}}},methods:{getAddressData:function(e){this.address.state=e.administrative_area_level_1,this.address.zip=e.postal_code,this.address.city=e.locality,this.address.country=e.country,this.address.address_1="".concat(e.street_number," ").concat(e.route),this.address.address_2=e.city,this.address.latitude=e.latitude,this.address.longitude=e.longitude}},computed:{showAddress:function(){var e=this.address.address_1;return null!==e&&""!==e}}},P=E,A=Object(v["a"])(P,x,k,!1,null,null,null),$=A.exports,z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"job-list"},[a("h3",[e._v("Jobs")]),a("table",{staticClass:"table table-hover"},[e._m(0),a("tbody",e._l(e.jobs,function(t){return a("tr",{key:t.id,staticClass:"job-row",on:{dblclick:function(a){e.openCustomer(t.id)}}},[a("td",[e._v(e._s(t.address))]),a("td",[e._v(e._s(t.state))]),a("td",[e._v(e._s(t.zip))])])}))])])},N=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",{staticClass:"thead-light"},[a("tr",[a("th",[e._v("Date")]),a("th",[e._v("Customer")]),a("th",[e._v("State")]),a("th",[e._v("Duration")]),a("th",[e._v("Amount")])])])}],q={name:"jobs",data:function(){return{jobs:[]}},created:function(){var e=this;u.collection("jobs").get().then(function(t){t.forEach(function(t){var a={id:t.id,address:t.data().address,notes:t.data().notes,format:t.data().format};e.jobs.push(a)})})},methods:{openCustomer:function(e){M.push({name:"customer",params:{id:e}})}}},O=q,S=Object(v["a"])(O,z,N,!1,null,null,null),D=S.exports;s["a"].use(r["a"]);var M=new r["a"]({routes:[{path:"/",name:"home",component:f},{path:"/customers",name:"customers",component:f},{path:"/customer/:id",name:"customer",component:y},{path:"/customer/new",name:"new-customer",component:$},{path:"/jobs",name:"jobs",component:D}]}),Z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("nav",{staticClass:"navbar navbar-expand-md navbar-dark bg-dark fixed-top"},[a("router-link",{staticClass:"navbar-brand",attrs:{to:{name:"home"}}},[e._v("Chickaboom")]),e._m(0),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarsExampleDefault"}},[a("ul",{staticClass:"navbar-nav mr-auto"},[a("li",{staticClass:"nav-item "},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"customers"}}},[e._v("Customers")])],1),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:{name:"jobs"}}},[e._v("Jobs")])],1)])])],1),a("div",{staticClass:"container"},[a("router-view")],1)])},J=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarsExampleDefault","aria-controls":"navbarsExampleDefault","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"navbar-toggler-icon"})])}],V={name:"app",router:M,components:{}},I=V,K=(a("ZL7j"),Object(v["a"])(I,Z,J,!1,null,null,null)),L=K.exports,H=a("n3sq");a("+eM2"),a("LdiE");s["a"].use(H["a"]),s["a"].config.productionTip=!1,new s["a"]({render:function(e){return e(L)}}).$mount("#app")},ZL7j:function(e,t,a){"use strict";var s=a("bP1M"),r=a.n(s);r.a},bP1M:function(e,t,a){}});
//# sourceMappingURL=app.03a0c56f.js.map