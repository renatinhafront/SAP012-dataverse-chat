// // import { navigateTo } from '../router';
import { communicateWithOpenAI } from '../lib/openAIApi.js';
import dataMovie from '../data/dataset.js';

export function Chat(props) {
  const item = dataMovie.find((movie) => movie.id === props.id);

  const divTemplateChat = document.createElement('div');
  divTemplateChat.innerHTML = `
    <section class="container-chat">
      <section class="container-details">
        <img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__movie" />
        ${renderDetails(item).outerHTML}
        <div class="description-movie">
          <p class="description__chat__individual">${item.description}</p>
        </div>
      </section>
      <section class="chat">
        <h3>Iniciar Conversa</h3>
        <div class="textarea-chat">
          <ul class="lista__chat"></ul>
        </div>
        <div class="input-chat">
          <textarea class="inp__chat" placeholder="Escreva aqui sua pergunta.."></textarea>
        </div>
      </section>
    </section>
  `;

  const listaChat = divTemplateChat.querySelector('.lista__chat');
  const textareaChatInp = divTemplateChat.querySelector('.inp__chat');

  textareaChatInp.addEventListener('keydown', function (event) {

    if (event.key === 'Enter' && !event.shiftKey) {
      listaChat.appendChild(createComentario(textareaChatInp.value))
      communicateWithOpenAI(textareaChatInp.value)
        .then(resultado => {
          listaChat.appendChild(createComentario(resultado))
        })
        .catch(error => {
          console.error('Erro:', error);
        });

      textareaChatInp.value = ''
      event.preventDefault();
    }
  });

  return divTemplateChat;
}

const createComentario = (texto) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.innerText = texto;
  li.appendChild(p);
  return li;
}

export const renderDetails = (item) => {

  const divDetalhesChat = document.createElement('div');
  divDetalhesChat.classList.add('details-movie');
  divDetalhesChat.innerHTML = `
    <dd itemprop="sort-order" class="imDbRating">${item.facts.imDbRating} / 10 <img src="./img/icon-star.svg" alt="Star icon" /></dd>
    <dd itemprop="name" class="name__card">${item.name}</dd>
    <dd itemprop="releaseYear" class="releaseYear">${item.facts.releaseYear} - ${item.facts.runtimeStr}</dd>
    <dd itemprop="shortDescription" class="shortDescription">${item.shortDescription}</dd>
    <dd itemprop="movieGender" class="movieGender">${item.facts.movieGender}</dd>
    <dd itemprop="directorsName" class="releaseYear">Diretores: ${item.facts.directorsName}.</dd>
    <dd itemprop="movieStars" class="releaseYear">Principais autores: ${item.facts.movieStars}.</dd>
  `;
  return divDetalhesChat;
}

export default Chat;


