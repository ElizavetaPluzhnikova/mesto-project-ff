(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-19",headers:{authorization:"aee68605-38e9-49e7-b1a7-7088a1d32fb5","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},o=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)};function c(e){var t=e.target,n=t.closest(".card"),c=n.querySelector(".card__like-counter"),a=n.dataset.cardId;t.classList.contains("card__like-button_is-active")?o(a).then((function(e){t.classList.remove("card__like-button_is-active"),c.textContent=e.likes.length>0?e.likes.length:"",0===e.likes.length&&c.classList.remove("card__like-counter_is-active")})).catch((function(e){return console.log(e)})):r(a).then((function(e){t.classList.add("card__like-button_is-active"),c.textContent=e.likes.length,c.classList.add("card__like-counter_is-active")})).catch((function(e){return console.log(e)}))}function a(e,t,n,r,o){return function(e,t,n,r,o,c){var a=e.querySelector(".card").cloneNode(!0);a.dataset.cardId=t._id;var i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),l=a.querySelector(".card__like-button"),s=a.querySelector(".card__delete-button"),d=a.querySelector(".card__like-counter");return i.src=t.link,i.alt=t.name,u.textContent=t.name,d.textContent=t.likes.length>0?t.likes.length:"",t.likes.length>0&&d.classList.add("card__like-counter_is-active"),t.likes.some((function(e){return e._id===c}))&&l.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){return n(t)})),l.addEventListener("click",r),t.owner._id===c?s.addEventListener("click",(function(){return o(t._id,a)})):s.style.display="none",a}(document.getElementById("card-template").content,e,t,n,r,o)}function i(e){e&&e.classList.contains("popup")&&(e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),10),e.addEventListener("click",l),document.addEventListener("keydown",s))}function u(e){e&&e.classList.contains("popup_is-opened")&&(e.classList.remove("popup_is-opened"),e.removeEventListener("click",l),document.removeEventListener("keydown",s))}function l(e){e.target.classList.contains("popup")&&u(e.target)}function s(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function d(e,t){var n=e.closest(t.formSelector).querySelector(".".concat(e.name,"-input-error"));n&&(n.textContent="",n.classList.remove(t.errorClass),e.classList.remove(t.inputErrorClass))}function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){return d(e,t)})),r.classList.add(t.inactiveButtonClass),r.disabled=!0}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m,y=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),b=S.querySelector(".popup__close"),g=document.querySelector(".profile__add-button"),k=S.querySelector(".popup__close"),q=document.querySelector(".popup_type_image"),L=q.querySelector(".popup__close"),E=h.querySelector(".popup__form"),C=h.querySelector(".popup__input_type_name"),x=h.querySelector(".popup__input_type_description"),T=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),B=document.querySelector(".profile__image"),U=q.querySelector(".popup__image"),w=q.querySelector(".popup__caption"),I=S.querySelector(".popup__form"),j=S.querySelector(".popup__input_type_card-name"),O=S.querySelector(".popup__input_type_url"),D=document.querySelector(".popup_type_edit-avatar"),P=D.querySelector(".popup__form"),M=D.querySelector(".popup__input_type_url"),N=D.querySelector(".popup__close"),J=document.querySelector(".profile__image"),H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},z=function(e){var t=e.buttonElement,n=e.loadingText;t.textContent=n};function $(e){U.src=e.link,U.alt=e.name,w.textContent=e.name,i(q)}function F(e,t){n(e).then((function(){t.remove()})).catch((function(e){return console.log(e)}))}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r,o,i,u,l,s,d=(u=2,function(e){if(Array.isArray(e))return e}(i=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(i,u)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(i,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),p=d[0],f=d[1];n=(t=p).name,r=t.about,o=t.avatar,T.textContent=n,A.textContent=r,B.style.backgroundImage="url(".concat(o,")"),l=f,s=p._id,l.forEach((function(e){return y.appendChild(function(e,t){return a(e,$,c,F,t)}(e,s))}))})).catch((function(e){return console.log(e)})),v.addEventListener("click",(function(){C.value=T.textContent,x.value=A.textContent,i(h),f(E,H)})),b.addEventListener("click",(function(){return u(h)})),E.addEventListener("submit",(function(n){n.preventDefault();var r,o,c=E.querySelector(H.submitButtonSelector);z({buttonElement:c,loadingText:"Сохранение..."}),(r=C.value,o=x.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).then((function(e){T.textContent=e.name,A.textContent=e.about,u(h)})).catch((function(e){return console.log(e)})).finally((function(){z({buttonElement:c,loadingText:"Сохранить"})}))})),g.addEventListener("click",(function(){i(S),I.reset(),f(I,H)})),k.addEventListener("click",(function(){return u(S)})),I.addEventListener("submit",(function(n){n.preventDefault();var r=I.querySelector(H.submitButtonSelector);z({buttonElement:r,loadingText:"Создание..."});var o,i,l={name:j.value,link:O.value};(o=l.name,i=l.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:i})}).then(t)).then((function(e){var t=e.owner._id;y.prepend(a(e,$,c,F,t)),u(S),I.reset(),f(I,H)})).catch((function(e){return console.log(e)})).finally((function(){z({buttonElement:r,loadingText:"Создать"})}))})),L.addEventListener("click",(function(){return u(q)})),J.addEventListener("click",(function(){i(D),P.reset(),f(P,H)})),N.addEventListener("click",(function(){return u(D)})),P.addEventListener("submit",(function(n){n.preventDefault();var r,o=P.querySelector(H.submitButtonSelector);z({buttonElement:o,loadingText:"Сохранение..."}),(r=M.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){B.style.backgroundImage="url(".concat(e.avatar,")"),u(D)})).catch((function(e){return console.log(e)})).finally((function(){z({buttonElement:o,loadingText:"Сохранить"})}))})),m=H,Array.from(document.querySelectorAll(m.formSelector)).forEach((function(e){var t=Array.from(e.querySelectorAll(m.inputSelector)),n=e.querySelector(m.submitButtonSelector);t.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){var n="";e.validity.valueMissing?n="Вы пропустили это поле.":e.validity.tooShort?n="В поле должно быть от ".concat(e.minLength," до ").concat(e.maxLength," символов."):e.validity.patternMismatch?n=e.dataset.errorMessage||"Неверный формат.":e.validity.typeMismatch&&(n="url"===e.type?"Введите адрес сайта.":"Введите корректное значение."),e.validity.valid?d(e,t):function(e,t,n){var r=e.closest(n.formSelector).querySelector(".".concat(e.name,"-input-error"));r&&(r.textContent=t,r.classList.add(n.errorClass),e.classList.add(n.inputErrorClass))}(e,n,t)}(e,m),p(t,n,m)}))})),e.addEventListener("submit",(function(e){return e.preventDefault()})),p(t,n,m)}))})();