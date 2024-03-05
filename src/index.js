import { Home } from "./views/Home.js";
import Chat from "./views/Chat.js";
import ChatGroup from "./views/ChatGroup.js";
import ErrorView from "./views/Error.js";
import { setRootEl, setRoutes, onURLChange } from "./router.js";
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
const feedbackMessage = document.getElementById('feedbackMessage');

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
  const apiKey = valueKey.value.trim(); 

  if (apiKey) {
    setApiKey(apiKey); 
    showFeedbackMessage('Chave da API gravada com sucesso!', 'success');
    dialogKey.close();
  } else {
    showFeedbackMessage('Por favor, insira uma chave da API válida.', 'error');
  }
});

function showFeedbackMessage(message, type) {
  feedbackMessage.textContent = message;
  feedbackMessage.className = type;
}

function alterarBanner() {
  const larguraJanela = window.innerWidth;
  if (larguraJanela < 580) {
    imgBanner.src = 'img/banner-mobile.png';
  }
  else {
    imgBanner.src = 'img/banner.png';
  }
}

window.onload = alterarBanner;
window.onresize = alterarBanner;
setRoutes(routes);
