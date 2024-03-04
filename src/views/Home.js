import dataMovie from '../data/dataset.js';
import { sortData, filterData, totalMovies } from "../lib/dataFunctions.js";
import { navigateTo } from '../router.js';

export function Home() {
  let currentData = dataMovie;
  const viewEl = document.createElement('div');

  const { subTitle, titlesLength } = renderSubTitle();
  viewEl.appendChild(subTitle);

  const { filter, order, filters, btnLimpar } = renderFilter();
  viewEl.appendChild(filter);

  const { items } = renderItems(currentData);

  const itemsContainer = document.createElement('div');
  itemsContainer.id = "items-container";
  viewEl.appendChild(itemsContainer);
  itemsContainer.appendChild(items);

  titlesLength.innerText = totalMovies(currentData);

  order.addEventListener("change", (element) => {
    const orderValue = element.target.value;
    currentData = sortData(currentData, "imDbRating", orderValue);
    renderItemsInView(currentData);
    titlesLength.innerText = totalMovies(currentData)
  });

  filters.addEventListener("change", (element) => {
    const value = element.target.value;
    if (value === "Todos") {
      currentData = dataMovie;
    } else {
      currentData = filterData(dataMovie, "movieGender", value);
    }
    renderItemsInView(currentData);
    titlesLength.innerText = totalMovies(currentData)
  });

  btnLimpar.addEventListener("click", () => {
    currentData = dataMovie;
    filters.value = "Todos";
    order.value = "todos";
    renderItemsInView(currentData);
    titlesLength.innerText = totalMovies(currentData)
  });

  function renderItemsInView(data) {
    itemsContainer.innerHTML = "";
    const { items } = renderItems(data);
    itemsContainer.appendChild(items);
  }

  return viewEl;
}
export default Home;

export const renderItems = (dataMovie) => {
  const ul = document.createElement('ul');
  ul.classList.add('container__card');

  dataMovie.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('itemscope', '');
    li.setAttribute('itemtype', 'OsMelhoresFilmes');
    li.classList.add('container__card__item');

    li.innerHTML = `
      <div class="content__card">
        <dl itemscope itemtype="#">
          <dt>
            <img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__card" />
          </dt>
          <dd itemprop="sort-order" class="imDbRating">${item.facts.imDbRating} /10 <img src="./img/icon-star.svg" alt="Star icon" /></dd>
          <dd itemprop="name" class="name__card">${item.name}</dd>
          <dd itemprop="releaseYear" class="releaseYear">${item.facts.releaseYear} - ${item.facts.runtimeStr}</dd>
          <dd itemprop="shortDescription" class="shortDescription">${item.shortDescription}</dd>
          <dd itemprop="movieGender" class="movieGender">${item.facts.movieGender}</dd>
          <button class='btn-verMais'>
            <dt>Ver mais</dt>
            <dd itemprop="verMais"></dd>
          </button>
        </dl>
      </div>
    `;
    ul.appendChild(li);
    li.addEventListener("click", () => navigateTo("/chat", {id: item.id}))
  });

  const btnVerMais = ul.querySelector(".btn-verMais");

  return { items: ul, btnVerMais };
};

export const renderFilter = () => {
  const divFilter = document.createElement('div');
  divFilter.classList.add('filtros');

  divFilter.innerHTML = `
      <section class="section-search">
          <label for="filters" id="search-filters" class="filters">Filtrar por:</label>
          <select id="filters" name="search-filter" data-testid="select-filter">
            <option value="Todos" selected hidden disabled>Gênero</option>
            <option value="drama">Drama</option>
            <option value="policial">Policial</option>
            <option value="aventura">Aventura</option>
            <option value="fantasia">Fantasia</option>
            <option value="biografia">Biografia</option>
            <option value="romance">Romance</option>
            <option value="syfy">Syfy</option>
            <option value="faroeste">Faroeste</option>
            <option value="crime">Crime</option>
          </select>
        <label for="order">Ordenar por:</label>
        <select id="order" name="sort-order" data-testid="select-sort">
            <option value="todos" hidden disabled>★</option>
            <option value="desc">Maior Nota</option>
            <option value="asc">Menor Nota</option>
        </select>

        <button id="btn-limpar" data-testid="button-clear">Limpar Filtros</button>
    </section>
      `;

  const order = divFilter.querySelector("#order");
  const filters = divFilter.querySelector("#filters");
  const btnLimpar = divFilter.querySelector("#btn-limpar");

  return { filter: divFilter, order, filters, btnLimpar };
};

export const renderSubTitle = () => {
  const divSubTitle = document.createElement('div');
  divSubTitle.classList.add('container__text');

  divSubTitle.innerHTML = `
      <h1>Principais escolhas</h1>
      <h2>O que assistir</h2>
      <p>Os melhores filmes para você assistir.</p>
      <span class="titles_length"> títulos</span>
      `;

  const titlesLength = divSubTitle.querySelector(".titles_length");

  return { subTitle: divSubTitle, titlesLength };
};

document.addEventListener("DOMContentLoaded", () => {
  const homeView = Home();
  const root = document.getElementById("root");
  root.appendChild(homeView);
});