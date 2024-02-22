// export const home = (props) => {
//   const element = document.createElement('div');
//   element.textContent = `Bem vindo a página de início ${props.name}!`;
//   return element;
// }

import dataMovie from '../data/dataset.js';
import { sortData, totalMovies, filterData } from "../lib/dataFunctions.js"
const titlesLength = document.querySelector(".titles_length");

let movieData = [...dataMovie];

const order = document.getElementById("order");
const root = document.getElementById("root");
const filters = document.getElementById("filters");
const btnLimpar = document.getElementById("btn-limpar");

export function Home() {
  const viewEl = document.createElement('div');
  viewEl.appendChild(renderSubTitle())
  viewEl.appendChild(renderFilter())
  viewEl.appendChild(renderItems(dataMovie))
  return viewEl;
}
export default Home;

export const renderItems = (dataMovie) => {
  const ul = document.createElement('ul');
  ul.classList.add('container__card');

  dataMovie.forEach((item) => {
    ul.innerHTML += `
      <li itemscope itemtype="OsMelhoresFilmes" class="container__card">
        <div class="content__card">
          <dl itemscope itemtype="#">
            <dt><img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__card" /></dt>
            <dd itemprop="sort-order" class="imDbRating">${item.facts.imDbRating} /10 <img src="./img/icon-star.svg" alt="Star icon" /></dd>
            <dd itemprop="name" class="name__card">${item.name}</dd>
            <dd itemprop="releaseYear" class="releaseYear">${item.facts.releaseYear} - ${item.facts.runtimeStr}</dd>
            <!--<dd itemprop="runtimeStr" class="runtimeStr">${item.facts.runtimeStr}</dd>-->
            <dd itemprop="shortDescription" class="shortDescription">${item.shortDescription}</dd>
            <dd itemprop="movieGender" class="movieGender">${item.facts.movieGender}</dd>
            <button class='btn-verMais'><dt>Ver mais</dt><dd itemprop="verMais"></dd></button>
          </dl>
        </div>
      </li>
    `;
  });

  return ul;
};

export const renderFilter = () => {
  const divFilter = document.createElement('div');
  divFilter.classList.add('filtros');

  divFilter.innerHTML += `
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
  return divFilter;
};

export const renderSubTitle = () => {
  const divSubTitle = document.createElement('div');
  divSubTitle.classList.add('container__text');

  divSubTitle.innerHTML += `
      <h1>Principais escolhas</h1>
      <h2>O que assistir</h2>
      <p>Os melhores filmes para você assistir.</p>
      <span class="titles_length"> títulos</span>
      <button type="button" id="key">Key API</button>
      `;
  return divSubTitle;
};

order.addEventListener("change", (e) => {
  const orderValue = e.target.value;
  movieData = sortData(movieData, "imDbRating", e.target.value);
  if (orderValue === "asc") {
    movieData = sortData(movieData, "imDbRating", "asc");
  }
  else if (orderValue === "desc") {
    movieData = sortData(movieData, "imDbRating", "desc");
  }
  root.innerHTML = "";
  root.appendChild(renderItems(movieData));
})

filters.addEventListener("change", (e) => {
  const value = e.target.value;
  if (value === "Todos") {
    movieData = [...dataMovie];
  } else {
    movieData = filterData(dataMovie, "movieGender", value);
  }
  root.innerHTML = "";
  totalMovies(movieData, titlesLength);
  root.appendChild(renderItems(movieData));
})

btnLimpar.addEventListener("click", () => {
  movieData = [...dataMovie];
  totalMovies(dataMovie);
  root.innerHTML = "";
  filters.value = "Todos";
  order.value = "todos";
  root.appendChild(renderItems(dataMovie));
})

document.addEventListener("DOMContentLoaded", () => {
  totalMovies(movieData, titlesLength);
  root.appendChild(renderItems(movieData));
})
