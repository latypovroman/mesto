(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o){var i=o.handleCardClick,a=o.handleDeleteClick,c=o.handleLikeClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardSelector=r,this._link=n.link,this._name=n.name,this._likes=n.likes,this._ownerId=n.owner._id,this._handleCardClick=i,this._handleDeleteClick=a,this._handleLikeClick=c,this._template=this._getTemplate(),this._likeCounter=this._template.querySelector(".card__like-counter"),this._userId=e}var n,r;return n=t,(r=[{key:"_handleDeleteButton",value:function(){if(this._userId===this._ownerId)return this._cardDelete.classList.add("card__delete_enabled")}},{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generateCard",value:function(){return this._cardImage=this._template.querySelector(".card__image"),this._cardText=this._template.querySelector(".card__title"),this._cardDelete=this._template.querySelector(".card__delete"),this._cardLike=this._template.querySelector(".card__like-btn"),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardText.textContent=this._name,this._likeSetStyle(),this.updateLikeCount(this._likes.length),this._handleDeleteButton(),this._setEventListeners(),this._template}},{key:"_setEventListeners",value:function(){var e=this;this._cardDelete.addEventListener("click",(function(){e._handleDeleteClick()})),this._cardLike.addEventListener("click",(function(){e._handleLikeClick()})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)}))}},{key:"deleteCard",value:function(){this._cardDelete.closest(".card").remove()}},{key:"likeToggle",value:function(e){this.isLiked(e)?this._deleteLike():this._putLike()}},{key:"_likeSetStyle",value:function(){return this.isLiked(this._likes)?this._putLike():this._deleteLike()}},{key:"isLiked",value:function(e){var t=this._userId;return 0!==e.length&&e.some((function(e){return e._id==t}))}},{key:"_putLike",value:function(){this._cardLike.classList.add("card__like-btn_active")}},{key:"_deleteLike",value:function(){this._cardLike.classList.remove("card__like-btn_active")}},{key:"updateLikeCount",value:function(e){this._likeCounter.textContent=e}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=n,this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this._inputs=this._formElement.querySelectorAll(this._inputSelector)}var t,r;return t=e,(r=[{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;Array.from(this._inputs).forEach((function(t){t.addEventListener("input",(function(){var n=e._formElement.checkValidity();e._checkInputValidity(t),e._toggleButtonState(n)}))})),this._formElement.addEventListener("submit",(function(e){e.preventDefault()}))}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(!1),this._inputs.forEach((function(t){e._hideInputError(t)}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_toggleButtonState",value:function(e){e?(this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1):(this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled="disabled")}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._page=document.querySelector(".page"),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),this._page.classList.add("page_scroll_disable"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),this._page.classList.remove("page_scroll_disable"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("click",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__close")&&e.close()}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=u(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},s.apply(this,arguments)}function u(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=f(e)););return e}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}function p(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},f(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=f(r);if(o){var n=f(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function a(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),i.call(this,e)}return t=a,(n=[{key:"open",value:function(e,t){s(f(a.prototype),"open",this).call(this);var n=document.querySelector(".popup__popup-image"),r=document.querySelector(".popup__image-title");n.src=t,r.textContent=e,n.alt=e}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=v(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},y.apply(this,arguments)}function v(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}function m(e,t){return m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},m(e,t)}function b(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var g=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&m(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function a(e){var t,n=e.popupSelector,r=e.submitAction;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._submitAction=r,t._form=t._popup.querySelector(".popup__form"),t._button=t._popup.querySelector(".popup__button"),t._originalButtonText=t._button.textContent,t}return t=a,(n=[{key:"renderLoading",value:function(e){this._button.textContent=e?"Сохранение...":this._originalButtonText}},{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._popup.querySelectorAll(".popup__input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;y(k(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e.renderLoading(!0),e._submitAction(e._getInputValues()),e.close()}))}},{key:"close",value:function(){y(k(a.prototype),"close",this).call(this),this._form.reset()}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(i);function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var E=function(){function e(t,n){var r=t.data,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"setItem",value:function(e){this._container.append(e)}},{key:"clear",value:function(){this._container.innerHTML=""}},{key:"renderItems",value:function(){var e=this;this.clear(),this._renderedItems.forEach((function(t){e._renderer(t)}))}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){var n=t.nameSelector,r=t.infoSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameSelector=n,this._infoSelector=r}var t,n;return t=e,n=[{key:"getUserInfo",value:function(){return{name:this._nameSelector.textContent,info:this._infoSelector.textContent}}},{key:"setUserInfo",value:function(e){var t=e.nickname,n=e.description;this._nameSelector.textContent=t,this._infoSelector.textContent=n}}],n&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var O=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._photoSelector=t}var t,n;return t=e,(n=[{key:"setUserPhoto",value:function(e){this._photoSelector.src=e.avatar}}])&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var j=function(){function e(t){var n=t.url,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=n,this._headers=r}var t,n;return t=e,(n=[{key:"_isResOk",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._url,"/cards"),{headers:this._headers}).then(this._isResOk)}},{key:"getUserInfo",value:function(){return fetch("".concat(this._url,"/users/me"),{headers:this._headers}).then(this._isResOk)}},{key:"patchUserInfo",value:function(e){return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.nickname,about:e.description})}).then(this._isResOk)}},{key:"postNewCard",value:function(e){return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then(this._isResOk)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e._id),{method:"DELETE",headers:this._headers}).then(this._isResOk)}},{key:"putLike",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e._id,"/likes"),{method:"PUT",headers:this._headers}).then(this._isResOk)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._url,"/cards/").concat(e._id,"/likes"),{method:"DELETE",headers:this._headers}).then(this._isResOk)}},{key:"patchUserAvatar",value:function(e){return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.link})}).then(this._isResOk)}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_active"},q=document.querySelector(".profile__edit-button"),T=document.querySelector(".profile__add-button"),R=document.querySelector(".profile__image"),B=document.querySelector(".popup_type_profile"),x=document.querySelector(".popup_type_add-card"),D=document.querySelector(".popup_type_delete"),U=(document.querySelector(".popup_type_user-photo"),new h(".popup_type_open-image")),V=new i(".popup_type_delete"),A=B.querySelector(".popup__form"),N=x.querySelector(".popup__form"),H=D.querySelector(".popup__form"),J=document.querySelector("#nickname"),M=document.querySelector("#description"),z=document.querySelector(".profile__name"),F=document.querySelector(".profile__description"),G=document.querySelector(".cards__list"),K=new r(I,A),Q=new r(I,N);[K,Q].forEach((function(e){e.enableValidation()}));var W=new j({url:"https://mesto.nomoreparties.co/v1/cohort36",headers:{authorization:"9757460d-c1af-41c8-81fe-1f11b87a74d9","Content-Type":"application/json"}});function X(e,t){U.open(e,t)}function Y(e,n){var r=new t(e,n,".card-template",{handleCardClick:X,handleDeleteClick:function(){V.open(),V.setEventListeners(),H.addEventListener("submit",(function(e){e.preventDefault(),r.deleteCard(),W.deleteCard(n).catch((function(e){console.log(e)})),V.close()}))},handleLikeClick:function(){r.isLiked(n.likes)?W.deleteLike(n).then((function(e){r.updateLikeCount(e.likes.length),r.likeToggle(n.likes),n.likes=e.likes})).catch((function(e){console.log(e)})):W.putLike(n).then((function(e){r.updateLikeCount(e.likes.length),r.likeToggle(n.likes),n.likes=e.likes})).catch((function(e){console.log(e)}))}});return r.generateCard()}var Z=new L({nameSelector:z,infoSelector:F}),$=new O(R),ee=new g({popupSelector:".popup_type_profile",submitAction:function(e){!function(e){W.patchUserInfo(e).then((function(e){var t=e.name,n=e.about;Z.setUserInfo({nickname:t,description:n})})).catch((function(e){console.log(e)})).finally(ee.renderLoading(!1))}(e)}}),te=new g({popupSelector:".popup_type_add-card",submitAction:function(e){Promise.all([W.postNewCard(e),W.getUserInfo()]).then((function(e){var t=e[1]._id;G.prepend(Y(t,e[0]))})).catch((function(e){console.log(e)})).finally(te.renderLoading(!1))}});Promise.all([W.getInitialCards(),W.getUserInfo()]).then((function(e){var t=e[1]._id,n=e[1].name,r=e[1].about;Z.setUserInfo({nickname:n,description:r}),$.setUserPhoto(e[1]);var o=new E({data:e[0],renderer:function(e){o.setItem(Y(t,e))}},".cards__list");o.renderItems()})).catch((function(e){return console.log(e)}));var ne=new g({popupSelector:".popup_type_user-photo",submitAction:function(e){W.patchUserAvatar(e).then((function(e){$.setUserPhoto(e)})).catch((function(e){return console.log(e)})).finally(ne.renderLoading(!1))}});ee.setEventListeners(),te.setEventListeners(),U.setEventListeners(),ne.setEventListeners(),R.addEventListener("click",(function(){ne.open(),Q.resetValidation()})),T.addEventListener("click",(function(){te.open(),Q.resetValidation()})),q.addEventListener("click",(function(){var e;ee.open(),e=Z.getUserInfo(),J.value=e.name,M.value=e.info,K.resetValidation()}))})();