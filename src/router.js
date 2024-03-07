let ROUTES = {};
let rootEl;

//função iniciada com SET faz atribuição de valor
export const setRootEl = (element) => {
  rootEl = element;
};

export const setRoutes = (routes) => {
  ROUTES = routes
};

export const renderView = (pathname, props = {id: ""}) => {
  rootEl.textContent = ""
  let routeFunc = ROUTES[pathname]
  if (!routeFunc) {
    routeFunc = ROUTES["/error"]
  }

  const element = routeFunc(props);
  rootEl.appendChild(element);
};

export const navigateTo = (pathname = "/", props = {id: ""}) => {
  window.history.pushState(null, null, `${pathname}?id=${props.id}`);
  renderView(pathname, props);
};

export const onURLChange = (location) => {
  renderView(location.pathname, location.search);
};
