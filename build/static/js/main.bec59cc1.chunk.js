(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(14),l=t(2),i=function(e){var n=e.people,t=e.term,a=e.deletePerson,u=function(e){return e.map(function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return a(e.name,e.id)}},"delete"))})};return r.a.createElement("div",null,function(){if(""!==t){var e=n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())});return u(e)}return u(n)}())},m=function(e){return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:e.newTerm,onChange:e.handleTermChange}))},d=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("h2",null,"add a new"),r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},f=(t(21),function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:n[1]},n[0])}),s=t(3),h=t.n(s),b="http://localhost:3001/api/persons",p=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),s=Object(l.a)(c,2),p=s[0],v=s[1],E=Object(a.useState)(""),w=Object(l.a)(E,2),g=w[0],j=w[1],C=Object(a.useState)(""),O=Object(l.a)(C,2),N=O[0],T=O[1],k=Object(a.useState)([]),S=Object(l.a)(k,2),y=S[0],P=S[1],I=function(e,n){var a,r,c=t.findIndex(function(n){return n.name===e});c>-1&&(a=t[c].id,r={name:e,number:n},h.a.put("".concat(b,"/").concat(a),r)).then(function(n){if(200===n.status){var a=t.findIndex(function(e){return e.name===p}),r=t;r[a]=Object(o.a)({},t[a],{number:g}),u(r),P(["Updated the number for ".concat(e),"success"]),setTimeout(function(){P(null)},5e3),v(""),j("")}}).catch(function(n){P(["Information of ".concat(e," has already been removed from server"),"error"]),setTimeout(function(){P(null)},5e3)})};return Object(a.useEffect)(function(){h.a.get(b).then(function(e){u(e.data)})},[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(f,{message:y}),r.a.createElement(m,{newTerm:N,handleTermChange:function(e){T(e.target.value)}}),r.a.createElement(d,{addPerson:function(e){e.preventDefault(),t.map(function(e){return e.name}).includes(p)?window.confirm("".concat(p," is already added to phonebook, replace the old number with a new one?"))&&I(p,g):function(e){return h.a.post(b,e)}({name:p,number:g}).then(function(e){u(t.concat(e.data)),P(["Added ".concat(p),"success"]),setTimeout(function(){P(null)},5e3),v(""),j("")})},handleNameChange:function(e){v(e.target.value)},handleNumberChange:function(e){j(e.target.value)},newName:p,newNumber:g}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{people:t,term:N,deletePerson:function(e,n){window.confirm("Delete ".concat(e," ?"))&&function(e){return h.a.delete("".concat(b,"/").concat(e))}(n).then(function(e){"error"!==e.status&&u(t.filter(function(e){return e.id!==n}))})}}))};c.a.render(r.a.createElement(p,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.bec59cc1.chunk.js.map