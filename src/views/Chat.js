import dataMovie from '../data/dataset.js';
// import { navigateTo } from '../router';

export function Chat(props) {
  const item = dataMovie.find((movie) => movie.id === props.id);

  const divTemplateChat = document.createElement('div');

  const sectionTemplateChat = document.createElement('section');
  sectionTemplateChat.classList.add('grid-chat');
  sectionTemplateChat.classList.add('grid-template-chat');
  divTemplateChat.appendChild(sectionTemplateChat);

  const divTituloChat = document.createElement('div');
  divTituloChat.classList.add('item-chat');
  divTituloChat.classList.add('titulo-chat');
  sectionTemplateChat.appendChild(divTituloChat);
  divTituloChat.textContent = `Iniciar Conversa`

  const divDescricaoChat = document.createElement('div');
  divDescricaoChat.classList.add('item-chat');
  divDescricaoChat.classList.add('descricao-chat');
  sectionTemplateChat.appendChild(divDescricaoChat);
  divDescricaoChat.innerHTML = `<p class="description">${item.description}</p>`

  sectionTemplateChat.appendChild(renderDetails(item));

  const divLogoChat = document.createElement('div');
  divLogoChat.classList.add('item-chat');
  divLogoChat.classList.add('logo-chat');
  sectionTemplateChat.appendChild(divLogoChat);
  divLogoChat.innerHTML = `<img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__card"/>`

  const divTextareaChat = document.createElement('div');
  divTextareaChat.classList.add('item-chat');
  divTextareaChat.classList.add('textarea-chat');
  sectionTemplateChat.appendChild(divTextareaChat);
  divTextareaChat.innerHTML = `<textarea class="txtarea__chat"readOnly=true cols="61" rows="25" style="resize:none"></textarea>`;

  const divInputChat = document.createElement('div');
  divInputChat.classList.add('item-chat');
  divInputChat.classList.add('input-chat');
  sectionTemplateChat.appendChild(divInputChat);
  divInputChat.innerHTML = `<input class="inp__chat" type="text" placeholder="Escreva aqui sua pergunta.."></input>`;

  return divTemplateChat;
}

export const renderDetails = (item) => {
  const divDetalhesChat = document.createElement('div');
  divDetalhesChat.classList.add('item-chat');
  divDetalhesChat.classList.add('detalhes-chat');
  divDetalhesChat.innerHTML = `
          <dd itemprop="sort-order" class="imDbRating">${item.facts.imDbRating} /10 <img src="./img/icon-star.svg" alt="Star icon" /></dd>
          <dd itemprop="name" class="name__card">${item.name}</dd>
          <dd itemprop="releaseYear" class="releaseYear">${item.facts.releaseYear} - ${item.facts.runtimeStr}</dd>
          <dd itemprop="shortDescription" class="shortDescription">${item.shortDescription}</dd>
          <dd itemprop="movieGender" class="movieGender">${item.facts.movieGender}</dd>
          <dd itemprop="directorsName" class="directors__card">Diretores: ${item.facts.directorsName}.</dd>
          <dd itemprop="movieStars" class="stars__card">Principais autores: ${item.facts.movieStars}.</dd>
  `;
  return divDetalhesChat;
}

export default Chat;
