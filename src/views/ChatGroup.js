/* eslint-disable no-console */
import dataMovie from '../data/dataset.js';
import { getApiKey } from '../lib/apiKey.js';
import { communicateWithOpenAI } from '../lib/openAIApi.js';
import { createQuestion, createResponse, statusMovie } from './Commons.js';
import { navigateTo } from '../router.js';

export function ChatGroup() {

  const sectionTemplateChatGroup = document.createElement('section');
  sectionTemplateChatGroup.classList.add('container__chat__group');

  const divChatGroup = document.createElement('div');
  divChatGroup.classList.add('item__chat__group');
  sectionTemplateChatGroup.appendChild(divChatGroup);

  const divOnlineUsers = document.createElement('div');
  divOnlineUsers.classList.add('item__chat__user__online');
  divOnlineUsers.appendChild(createListaMovieOnline());
  sectionTemplateChatGroup.appendChild(divOnlineUsers);

  const divTituloChatGroup = document.createElement('div');
  divTituloChatGroup.classList.add('titulo-chatGroup');
  divTituloChatGroup.appendChild(addTitle());
  divChatGroup.appendChild(divTituloChatGroup);

  const divListaComentarios = document.createElement('div');
  const divQuestionResponseGroup = document.createElement('div');
  const statusChatGpt = document.createElement('p');
  divListaComentarios.classList.add('item__lista__chat__group');
  divQuestionResponseGroup.classList.add('question__response__chat');
  statusChatGpt.className = 'status__chat';
  divListaComentarios.appendChild(divQuestionResponseGroup);

  const divStatus = document.createElement('div');
  divStatus.classList.add('status__chat');
  divListaComentarios.appendChild(statusChatGpt);
  divChatGroup.appendChild(divListaComentarios);

  const textareaChatGroup = document.createElement('textarea');
  textareaChatGroup.classList.add('textarea__chatGroup');
  textareaChatGroup.placeholder = 'Escreva aqui sua pergunta..'
  divChatGroup.appendChild(textareaChatGroup);

  // Ações a serem executadas quando o Enter for pressionado
  textareaChatGroup.addEventListener('keydown', function (event) {

    const divQuestionResponseGroup = document.querySelector('.question__response__chat');

    if (event.key === 'Enter' && !event.shiftKey) {
      if (!getApiKey()) {
        statusChatGpt.innerHTML = 'Erro, KEY não configurada'
        event.preventDefault();
        return
      }

      statusChatGpt.style.display = 'block'
      statusChatGpt.innerHTML = 'Digitando...'
      textareaChatGroup.disabled = true

      divQuestionResponseGroup.appendChild(createQuestion(textareaChatGroup.value))
      const question = textareaChatGroup.value
      textareaChatGroup.value = ''

      dataMovie.forEach((item) => {
        if (item.facts.isOnline) {
          communicateWithOpenAI(question, item.name)
            .then(response => {
              statusChatGpt.style.display = 'none'
              divQuestionResponseGroup.appendChild(createResponse(response, item))
              // Levar scroll para o final
              divQuestionResponseGroup.scrollTop = divQuestionResponseGroup.scrollHeight
            })
            .catch(error => {
              statusChatGpt.innerHTML = 'Erro, tente novamente mais tarde...'
              console.error('Erro:', error);
            })
            .finally(() => {
              textareaChatGroup.value = ''
              textareaChatGroup.disabled = false
              event.preventDefault();
            })

        }
      });
    }
  });

  return sectionTemplateChatGroup;
}

const addTitle = () => {

  const divTituloChatGroup = document.createElement('div');
  divTituloChatGroup.classList.add('container__title');
  divTituloChatGroup.innerHTML = `
    <section class="grid__user__online">
        <div class="item_user_online logo_user_online">
          <img src="../img/favicon.png" class="item__img__titulo__group" alt="ícone de identificação da página"</img>
        </div>

        <div class="item_user_online name_user_online">
        <h3 class="title__group">The Best Movies</h3>
        </div>

        <div class="item_user_online description_user_online">
          <p class="sub__title__group">Conheça sobre os melhores filmes da história</p>
        </div>
      </section>

`;
  return divTituloChatGroup;
}

const createListaMovieOnline = () => {
  const ul = document.createElement('ul');
  ul.classList.add('container__user__online');

  const moviesOnline = [];
  const moviesOffline = [];

  dataMovie.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('container__user__online__item');
    li.innerHTML = `
      <section class="grid__user__online">
        <div class="item_user_online logo_user_online">
          <div class="item__img__user__online">
            <img src="${item.imageUrl}" alt="Imagem do Filme" class="image__user__online"/>
          </div>
        </div>

        <div class="item_user_online name_user_online">
          <p class="font__medium">${item.name}</p>
        </div>

        <div class="item_user_online description_user_online">
          <p class="description__user__online">${item.shortDescription}</p>
        </div>
      </section>
      <hr/>
    `;
    li.addEventListener("click", () => navigateTo("/chat", {id: item.id}));

    const divLogo = li.querySelector('.logo_user_online')
    divLogo.appendChild(statusMovie(item.facts.isOnline));

    if (item.facts.isOnline) {
      moviesOnline.push(li);
    } else {
      moviesOffline.push(li);
    }
  });

  moviesOnline.forEach(li => ul.appendChild(li));
  moviesOffline.forEach(li => ul.appendChild(li));

  return ul;
};


export default ChatGroup;
