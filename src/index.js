import { Home } from "./views/Home.js";
import Chat from "./components/Chat.js";
import ChatGroup from "./components/ChatGroup.js";
import ErrorView from "./views/Error.js";
import { setRootEl, setRoutes, onURLChange } from "./router.js"

const routes = {
  "/": Home,
  "/chat": Chat,
  "/chatGroup": ChatGroup,
  "/error": ErrorView
}

const root = document.getElementById("root");
const imgBanner = document.querySelector(".header-image");

window.addEventListener('popstate', () => {
  onURLChange(window.location);
});

window.addEventListener("DOMContentLoaded", () => {
  setRootEl(root);
  onURLChange(window.location);
});

function alterarBanner() {
  const larguraJanela = window.innerWidth;
  if (larguraJanela < 550) {
    imgBanner.src = 'img/banner-mobile.png';
  }
}

window.onload = alterarBanner;
window.onresize = alterarBanner;
setRoutes(routes);