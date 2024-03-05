import { Home } from "./views/Home.js";
import Chat from "./views/Chat.js";
import ChatGroup from "./views/ChatGroup.js";
import ErrorView from "./views/Error.js";
import { setRootEl, setRoutes, onURLChange, navigateTo } from "./router.js"
import { setApiKey } from '../lib/apiKey.js';

const routes = {
  "/": Home,
  "/chat": Chat,
  "/chatGroup": ChatGroup,
  "/error": ErrorView
}

const root = document.getElementById("root");
const imgBanner = document.querySelector(".header-image");
const btnKeyApi = document.querySelector(".btnKey");
const btnSubmitKey = document.querySelector('.btnSubmitKey');
const valueKey = document.querySelector('#valueKey');
const dialogKey = document.querySelector('.dialogKey');
const btnChatGroup = document.querySelector('.btnChatGrup')
const btnHome = document.querySelector('.btnHome')

window.addEventListener('popstate', () => {
  onURLChange(window.location);
});

window.addEventListener("DOMContentLoaded", () => {
  setRootEl(root);
  onURLChange(window.location);
});

btnKeyApi.addEventListener("click", () => {
  dialogKey.showModal();
});

btnSubmitKey.addEventListener("click", () => {
  setApiKey(valueKey)
  dialogKey.close();
});

btnChatGroup.addEventListener("click", () => {
  window.location.href = "/chatGroup";
});

btnHome.addEventListener("click", () => {
  navigateTo("/")
})

//Listerner
// link.addEventListener('click', () => {
//   let pathname = "/"
//   if (window.location.pathname === "/") {
//     pathname = "/chat"
//   }else if (window.location.pathname === "/chat") {
//     pathname = "/chatGroup"
//   }else {
//     pathname = "/"
//   }
//   // alert("Alerta")
//   navigateTo(pathname)
// });



function alterarBanner() {
  const larguraJanela = window.innerWidth;
  if (larguraJanela < 550) {
    imgBanner.src = 'img/banner-mobile.png';
  }
}

window.onload = alterarBanner;
window.onresize = alterarBanner;
setRoutes(routes);
