import { jest } from "@jest/globals";
import { setRootEl, setRoutes, renderView, navigateTo, onURLChange, ROUTES } from "../src/router.js";

describe("Router", () => {
  let rootEl;

  beforeEach(() => {
    rootEl = document.createElement("div");
    setRootEl(rootEl);
  });

  afterEach(() => {
    rootEl = null;
    setRoutes({});
  });

  it("setRootEl deve definir o elemento raiz", () => {
    expect(rootEl).toBeDefined();
  });

  it("setRoutes deve definir as rotas", () => {
    const routes = {
      "/": jest.fn(),
      "/chat": jest.fn(),
      "/chatGroup": jest.fn(),
      "/error": jest.fn(),
    };
    setRoutes(routes);
    expect(ROUTES).toEqual(routes);
  });

  it("renderView deve renderizar a visualização para uma rota específica correta", () => {
    const chatElement = document.createElement("div");
    chatElement.textContent = "Chat";
    const routes = {
      "/chat": () => chatElement,
    };
    setRoutes(routes);

    renderView("/chat");
    expect(rootEl.innerHTML).toContain("Chat");
  });

  it("renderView deve renderizar a visualização de erro se a rota não for encontrada", () => {
    const errorElement = document.createElement("div");
    errorElement.textContent = "Erro: Rota não encontrada";
    const routes = {
      "/error": () => errorElement,
    };
    setRoutes(routes);
    renderView("/chaaaat");
    expect(rootEl.innerHTML).toContain("Erro: Rota não encontrada");
  });

  it("navigateTo deve navegar para a rota correta e renderizar a visualização correspondente", () => {
    const chatElement = document.createElement("div");
    chatElement.textContent = "Chat";
    const routes = {
      "/chat": () => chatElement,
    };
    setRoutes(routes);

    navigateTo("/chat");
    expect(window.location.pathname).toBe("/chat");
    expect(rootEl.innerHTML).toContain("Chat");
  });

  it("navigateTo deve navegar para a rota padrão com props padrão", () => {
    const homeElement = document.createElement("div");
    homeElement.textContent = "Home";
    const routes = {
      "/": () => homeElement,
    };
    setRoutes(routes);

    navigateTo();
    expect(window.location.pathname).toBe("/");
    expect(rootEl.innerHTML).toContain("Home");
  });

  it("onURLChange deve renderizar a visualização com base na URL atual", () => {
    const chatElement = document.createElement("div");
    chatElement.textContent = "Chat";
    const routes = {
      "/chat": () => chatElement,
    };
    setRoutes(routes);

    const newLocation = { pathname: "/chat", search: "" };
    onURLChange(newLocation);
    expect(rootEl.innerHTML).toContain("Chat");
  });
});
