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
//dois parâmetros: pathname, que é uma string representando o caminho da rota a ser renderizada,
//e props é um objeto opcional contendo propriedades adicionais, com um valor padrão de um objeto vazio {id: ""}
export const renderView = (pathname, props = {id: ""}) => {
  //limpa o conteúdo atual do elemento DOM principal e, em seguida, procura pela função de renderização correspondente à rota especificada
  rootEl.textContent = ""
  let routeFunc = ROUTES[pathname]
  if (!routeFunc) {
    routeFunc = ROUTES["/error"]
  }

  //DOM que será renderizado na tela
  const element = routeFunc(props);
  //adiciona o elemento renderizado ao elemento DOM principal
  rootEl.appendChild(element);
};

//navigateTo atualiza a URL do navegador e renderiza a visualização correspondente
//pathname é uma string definido como /
//props: um objeto vazio
export const navigateTo = (pathname = "/", props = {id: ""}) => {
  //window.history.pushState() atualiza o historico
  window.history.pushState(null, null, `${pathname}?id=${props.id}`);
  //renderizar a visualização da rota
  renderView(pathname, props);
};

//onURLChange e uma função responsável por lidar com a mudança de URL
export const onURLChange = (location) => {
  //location.pathname representa o caminho da rota a ser renderizada
  //location.search representa os parâmetros da rota
  renderView(location.pathname, location.search);
};

export { ROUTES }
