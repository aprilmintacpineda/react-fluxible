(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports=n(17)},17:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(10),u=n.n(r),l=n(7),s=n(1),c=n(2),i=n(5),p=n(3),d=n(6),m=n(4);function f(){return o.a.createElement("div",null,o.a.createElement("h1",null,"react-fluxible demo."),o.a.createElement("h2",null,"State management library for inferno built on top of fluxible-js."),o.a.createElement("p",null,"In this demo app, I used ",o.a.createElement("strong",null,"react-fluxible")," to manage your username and todos.","I'm"," also using the persist feature to persist your todos but not your username. That means even if after you refresh your page, your todos should still be intact."))}var h=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("h3",null,"Todos component: Your todos (managed by inferno-fluxible)"),this.props.todos.length?this.props.todos.map(function(t,n){return o.a.createElement("p",{key:n,className:"done"},o.a.createElement("span",{onClick:function(){return e.props.deleteTodo(n)},style:{cursor:"pointer",color:"white",padding:"2px",borderRadius:"4px",backgroundColor:"red",marginRight:"5px"}},"x"),o.a.createElement("input",{type:"checkbox",checked:t.isDone,style:{marginRight:"5px"},onChange:function(t){e.props.updateIsDone(t.target.checked,n)}}),t.isDone?o.a.createElement("s",null,t.value):t.value)}):o.a.createElement("p",null,"You have no todos."))}}]),t}(o.a.Component),b=Object(m.connect)(function(e){return{todos:e.todos}},{updateIsDone:function(e,t,n){e.updateStore({todos:e.getStore().todos.map(function(e,a){return a!==n?e:Object(l.a)({},e,{isDone:t})})})},deleteTodo:function(e,t){e.updateStore({todos:e.getStore().todos.filter(function(e,n){return n!==t})})}})(h),v=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h3",null,"Username component: Your usename (managed by inferno-fluxible)"),o.a.createElement("p",null,this.props.username.length?this.props.username:"You have no username."))}}]),t}(o.a.Component),g=Object(m.connect)(function(e){return{username:e.username}})(v),y=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(i.a)(this,Object(p.a)(t).call(this,e))).state={newUsername:"",newTodoValue:""},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},o.a.createElement(f,null),o.a.createElement("hr",null),o.a.createElement("p",null,"This data is store internally as state of this component."),o.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.props.changeUsername(e.state.newUsername),e.setState(Object(l.a)({},e.state,{newUsername:""}))}},o.a.createElement("input",{type:"text",value:this.state.newUsername,placeholder:"Your username here...",onChange:function(t){e.setState(Object(l.a)({},e.state,{newUsername:t.target.value}))}}),o.a.createElement("input",{type:"submit",value:"Change username"})),o.a.createElement("hr",null),o.a.createElement("h3",null,"Add todo"),o.a.createElement("p",null,"This data is managed as internal state of this component."),o.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.props.addTodo(e.state.newTodoValue),e.setState(Object(l.a)({},e.state,{newTodoValue:""}))}},o.a.createElement("input",{type:"text",value:this.state.newTodoValue,onChange:function(t){e.setState({newTodoValue:t.target.value})}}),o.a.createElement("input",{type:"submit",value:"Add todo"})),o.a.createElement("hr",null),o.a.createElement(g,null),o.a.createElement(b,null))}}]),t}(o.a.Component),E=Object(m.connect)(null,{changeUsername:function(e,t){e.updateStore({username:t})},addTodo:function(e,t){e.updateStore({todos:e.getStore().todos.concat({value:t,isDone:!1})})}})(y),O=n(8);Object(O.initializeStore)({initialStore:{username:"",todos:[]},persist:{storage:window.localStorage,restore:function(e){return{todos:e.todos||[]}}}}),u.a.render(o.a.createElement(E,null),document.getElementById("root"))},4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.dispatch=s,t.connect=function(e,t){return function(n){var u;function c(t){var r=this;return this.props=t,e&&(this.removeListener=(0,a.addObserver)(function(){r.setState({count:r.state.count+1})},Object.keys(e((0,a.getStore)()))),this.state={count:0}),this.componentWillUnmount=function(){r.removeListener&&r.removeListener()},this.render=function(){return e&&u?o.default.createElement(n,l({},r.props,u,e((0,a.getStore)()))):e?o.default.createElement(n,l({},r.props,e((0,a.getStore)()))):o.default.createElement(n,l({},r.props,u))},this}return t&&(u={},Object.keys(t).forEach(function(e){u[e]=function(){for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return s.apply(void 0,[t[e]].concat(a))}})),c.prototype=o.default.Component.prototype,c.prototype.constructor=c,(0,r.default)(c,n),c}};var a=n(8),o=u(n(0)),r=u(n(16));function u(e){return e&&e.__esModule?e:{default:e}}function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function s(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return e.apply(void 0,[{getStore:a.getStore,updateStore:function(e,t){(0,a.updateStore)(e),t&&t()}}].concat(n))}}},[[11,2,1]]]);