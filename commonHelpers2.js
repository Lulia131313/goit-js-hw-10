import"./assets/reset-4708220f.js";import{i as n}from"./assets/vendor-77e16229.js";const i=document.querySelector(".form");i.addEventListener("submit",o);function o(t){t.preventDefault();const e=+t.currentTarget.elements.delay.value,r=t.currentTarget.elements.state.value;m(r,e).then(s=>{n.success({message:`✅ Fulfilled promise in ${e}ms`})}).catch(s=>{n.error({message:`❌ Rejected promise in ${e}ms`})}),t.currentTarget.reset()}function m(t,e){return new Promise((r,s)=>{setTimeout(()=>{t==="fulfilled"?r({delay:e}):s({delay:e})},e)})}
//# sourceMappingURL=commonHelpers2.js.map
