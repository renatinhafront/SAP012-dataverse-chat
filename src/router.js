let ROUTES = {};
let rootEl;

//função iniciada com SET faz atribuição de valor
export const setRootEl = (element) => {
  rootEl = element;
};

export const setRoutes = (routes) => {
  //mapeia nomes de rota para funções de renderização
  ROUTES = routes
};

export const renderView = (pathname, props = {id: ""}) => {
  //limpa o conteúdo principal
  rootEl.textContent = ""
  //armazena a rota
  let routeFunc = ROUTES[pathname]
  if (!routeFunc) {
    routeFunc = ROUTES["/error"]
  }

  //criando um elemento
  const element = routeFunc(props);
  //adiciona o elemento renderizado ao elemento DOM principal
  rootEl.appendChild(element);
};

//navigateTo atualiza a URL do navegador quando eu uso o F5
export const navigateTo = (pathname = "/", props = {id: ""}) => {
  //pushState() guardar a página no histórico
  window.history.pushState(null, null, `${pathname}?id=${props.id}`);
  //renderiza de acordo com a rota
  renderView(pathname, props);
};

//onURLChange e uma função responsável por atualizar a barra de endereço quando eu digito na barra de endereço
export const onURLChange = (location) => {
  //location.pathname representa o caminho da rota a ser renderizada
  //location.search representa os parâmetros da rota
  renderView(location.pathname, location.search);
};

export { ROUTES }
