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
const btnHeaderImage = document.querySelector('.header-image')

window.addEventListener('popstate', () => {
  onURLChange(window.location);
});

window.addEventListener("DOMContentLoaded", () => {
  setRootEl(root);
  onURLChange(window.location);
});

//Modal para add ou atualizar key
btnKeyApi.addEventListener("click", () => {
  dialogKey.showModal();
});

//para fechar o modal
btnSubmitKey.addEventListener("click", () => {
  setApiKey(valueKey.value)
  dialogKey.close();
});

//para redirecionar para chat
btnChatGroup.addEventListener("click", () => {
  navigateTo("/chatGroup")
});

//para redirecionar para home
btnHeaderImage.addEventListener("click", () => {
  navigateTo("/")
})

//alterar banner de acordo com a largura
function alterarBanner() {
  const larguraJanela = window.innerWidth;
  if (larguraJanela < 550) {
    imgBanner.src = 'img/banner-mobile.png';
  } else {
    imgBanner.src = 'img/banner.png';
  }
}

window.onload = alterarBanner;
window.onresize = alterarBanner;
setRoutes(routes);
