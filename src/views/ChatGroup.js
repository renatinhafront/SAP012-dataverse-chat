import dataMovie from '../data/dataset.js';

export function ChatGroup() {

  const divTemplateChatGroup = document.createElement('div');

  const sectionChatGroup = document.createElement('section');
  sectionChatGroup.classList.add('titulo-chatGroup');
  divTemplateChatGroup.appendChild(sectionChatGroup);

  const divTituloChatGroup = document.createElement('div');
  divTituloChatGroup.classList.add('titulo-chatGroup');
  sectionChatGroup.appendChild(divTituloChatGroup);
  divTituloChatGroup.innerHTML = `
      <h1>The Best Movies</h1>
      <dd clas="">Conheça sobre os melhores filmes da história</dd>
  `;

  // const item = dataMovie.find((movie) => movie.id === props.id);

  sectionChatGroup.appendChild(addComentario());

  return divTemplateChatGroup;
}

export const addComentario = (item) => {

  const divTemplateComentario = document.createElement('div');

  const sectionTempleteComentario = document.createElement('section');
  sectionTempleteComentario.classList.add('comentario');
  divTemplateComentario.appendChild(sectionTempleteComentario);
  divTemplateComentario.innerHTML = `
      <img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__card"/>
      <dd itemprop="name" class="name__card">${item.name}</dd>
      <textarea class="txtarea__chatGroup" readOnly=true cols="60" rows="8" style="resize:none"></textarea>
      <input class="inp__chatGroup" type="text" placeholder="Digite aqui sua pergunta.."></input>
  `;

  return divTemplateComentario;
}

export const userOnline = (itemGroup) => {

  const divUserOnline = document.createElement('div');

  const sectionUserOnline = document.createElement('section');
  sectionUserOnline.classList.add('comentario');
  divUserOnline.appendChild(sectionUserOnline);
  divUserOnline.innerHTML = `
      <img src="${itemGroup.imageUrl}" alt="Imagem do Filme" itemprop="${itemGroup.name}" class="image__card"/>
      <dd itemprop="name" class="name__card">${itemGroup.name}</dd>

  `;

  return divUserOnline;
}

export default ChatGroup;
