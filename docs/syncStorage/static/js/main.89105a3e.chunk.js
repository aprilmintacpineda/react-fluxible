(this.webpackJsonpexample=this.webpackJsonpexample||[]).push([[0],{10:function(e,t,n){"use strict";t.__esModule=!0,t.default=void 0;var r=u(n(0)),a=n(1),o=u(n(17));function u(e){return e&&e.__esModule?e:{default:e}}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var c=function(e,t){function n(n){var o=this;return this.props=n,this.state={mappedStates:t(a.store)},this.componentWillUnmount=(0,a.addObserver)((function(){o.setState({mappedStates:t(a.store)})}),Object.keys(this.state.mappedStates)),this.render=function(){return r.default.createElement(e,s({},o.props,o.state.mappedStates))},this}return n.prototype=r.default.Component.prototype,n.prototype.constructor=n,(0,o.default)(n,e),n};t.default=c},11:function(e,t,n){"use strict";t.__esModule=!0,t.default=void 0;var r=n(0),a=n(1);var o=function(e){var t=(0,r.useState)((function(){return e(a.store)})),n=t[0],o=t[1];return(0,r.useEffect)((function(){return(0,a.addObserver)((function(){o(e(a.store))}),Object.keys(e(a.store)))}),[]),n};t.default=o},12:function(e,t,n){e.exports=n(18)},18:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(9),u=n.n(o),s=n(2),c=n(3),l=n(4),i=n(6),p=n(5),m=n(7),d=n(1);function f(){return a.a.createElement("div",null,a.a.createElement("h1",null,"react-fluxible demo."),a.a.createElement("h2",null,"State management library for inferno built on top of fluxible-js."),a.a.createElement("p",null,"In this demo app, I used ",a.a.createElement("strong",null,"react-fluxible")," to manage your username and todos.","I'm"," also using the persist feature to persist your todos but not your username. That means even if after you refresh your page, your todos should still be intact."))}var b=n(10),h=n.n(b);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var y=function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("h3",null,"Todos component: Your todos (managed by react-fluxible)"),this.props.todos.length?this.props.todos.map((function(e,t){return a.a.createElement("p",{key:t,className:"done"},a.a.createElement("span",{onClick:function(){Object(d.updateStore)({todos:d.store.todos.filter((function(e,n){return n!==t}))})},style:{cursor:"pointer",color:"white",padding:"2px",borderRadius:"4px",backgroundColor:"red",marginRight:"5px"}},"x"),a.a.createElement("input",{type:"checkbox",checked:e.isDone,style:{marginRight:"5px"},onChange:function(e){Object(d.updateStore)({todos:d.store.todos.map((function(n,r){return r!==t?n:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n,{isDone:e.target.checked})}))})}}),e.isDone?a.a.createElement("s",null,e.value):e.value)})):a.a.createElement("p",null,"You have no todos."))}}]),t}(a.a.Component),v=h()(y,(function(e){return{todos:e.todos}})),j=n(11),g=n.n(j);var E=function(){var e=g()((function(e){return{username:e.username}})).username;return a.a.createElement("div",null,a.a.createElement("h3",null,"Username component: Your usename (managed by react-fluxible)"),a.a.createElement("p",null,e||"You have no username."))};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var P=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(i.a)(this,Object(p.a)(t).call(this,e))).state={newUsername:"",newTodoValue:""},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"App"},a.a.createElement(f,null),a.a.createElement("hr",null),a.a.createElement("p",null,"This data is store internally as state of this component."),a.a.createElement("form",{onSubmit:function(t){t.preventDefault(),Object(d.updateStore)({username:e.state.newUsername}),e.setState(S({},e.state,{newUsername:""}))}},a.a.createElement("input",{type:"text",value:this.state.newUsername,placeholder:"Your username here...",onChange:function(t){e.setState(S({},e.state,{newUsername:t.target.value}))}}),a.a.createElement("input",{type:"submit",value:"Change username"})),a.a.createElement("hr",null),a.a.createElement("h3",null,"Add todo"),a.a.createElement("p",null,"This data is managed as internal state of this component."),a.a.createElement("form",{onSubmit:function(t){t.preventDefault(),Object(d.updateStore)({todos:d.store.todos.concat({value:e.state.newTodoValue,isDone:!1})}),e.setState(S({},e.state,{newTodoValue:""}))}},a.a.createElement("input",{type:"text",value:this.state.newTodoValue,onChange:function(t){e.setState({newTodoValue:t.target.value})}}),a.a.createElement("input",{type:"submit",value:"Add todo"})),a.a.createElement("hr",null),a.a.createElement(E,null),a.a.createElement(v,null))}}]),t}(a.a.Component);Object(d.initializeStore)({initialStore:{username:"",todos:[]},persist:{syncStorage:window.localStorage,restore:function(e){return{todos:e.todos||[]}}}}),u.a.render(a.a.createElement(P,null),document.getElementById("root"))}},[[12,1,2]]]);