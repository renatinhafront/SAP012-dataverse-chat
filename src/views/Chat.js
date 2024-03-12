/* eslint-disable no-console */
import { communicateWithOpenAI } from '../lib/openAIApi.js';
import dataMovie from '../data/dataset.js';
import { createQuestion, createResponse } from './Commons.js';
import { getApiKey } from '../lib/apiKey.js';

export function Chat(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('id');


  const item = dataMovie.find(movie => (props.id ? movie.id === props.id :movie.id === myParam));

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
        <div class="item__lista__chat">
        <div class="question__response__chat"></div>
        <div class="status__chat__group">
            <p class="status__chat"></p>
          </div>
        </div>

        <div class="input-chat">
          <textarea class="inp__chat" placeholder="Escreva aqui sua pergunta.."></textarea>
        </div>
      </section>
    </section>
  `;

  // const divListaComentarios = divTemplateChat.querySelector('.item__lista__chat');
  const statusChatGpt = divTemplateChat.querySelector('.status__chat');
  const divQuestionResponse = divTemplateChat.querySelector('.question__response__chat');

  const textareaChat = divTemplateChat.querySelector('.inp__chat');

  textareaChat.addEventListener('keydown', function (event) {

    if (event.key === 'Enter' && !event.shiftKey) {
      if (!getApiKey()) {
        statusChatGpt.innerHTML = 'Erro, KEY não configurada'
        textareaChat.value = ''
        event.preventDefault();
        return
      }
      statusChatGpt.style.display = 'block'
      statusChatGpt.innerHTML = 'Digitando...'
      textareaChat.disabled = true
      divQuestionResponse.appendChild(createQuestion(textareaChat.value))


      communicateWithOpenAI(textareaChat.value, item.name)
        .then(response => {
          statusChatGpt.style.display = 'none'
          divQuestionResponse.appendChild(createResponse(response))
          // Levar scroll para o final
          divQuestionResponse.scrollTop = divQuestionResponse.scrollHeight
        })
        .catch(error => {
          statusChatGpt.innerHTML = 'Erro, tente novamente mais tarde...'
          console.error('Erro:', error);
        })
        .finally(() => {
          textareaChat.value = ''
          textareaChat.disabled = false
          event.preventDefault();
        })
    }

  });

  return divTemplateChat;
}

const renderDetails = (item) => {

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
