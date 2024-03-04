import dataMovie from '../data/dataset.js';

export function ChatGroup() {

  const sectionTemplateChatGroup = document.createElement('section');
  sectionTemplateChatGroup.classList.add('container__chat__group');

  const divChatGroup = document.createElement('div');
  divChatGroup.classList.add('item__chat__group');
  sectionTemplateChatGroup.appendChild(divChatGroup);

  const divOnlineUsers = document.createElement('div');
  divOnlineUsers.classList.add('item__chat__user__online');
  divOnlineUsers.appendChild(userOnline());
  sectionTemplateChatGroup.appendChild(divOnlineUsers);

  const divTituloChatGroup = document.createElement('div');
  divTituloChatGroup.classList.add('titulo-chatGroup');
  divTituloChatGroup.appendChild(addTitle());
  divChatGroup.appendChild(divTituloChatGroup);

  const divListaComentarios = document.createElement('div');
  divListaComentarios.classList.add('item__lista__chat__group');
  divChatGroup.appendChild(divListaComentarios);

  const textareaChatGroup = document.createElement('textarea');
  textareaChatGroup.classList.add('textarea__chatGroup');
  textareaChatGroup.placeholder = 'Digite aqui sua pergunta..'
  divChatGroup.appendChild(textareaChatGroup);

  // Ações a serem executadas quando o Enter for pressionado
  textareaChatGroup.addEventListener('keydown', function(event) {

    if (event.key === 'Enter' && !event.shiftKey) {
      textareaChatGroup.value = ''
      event.preventDefault();
    }
  });

  return sectionTemplateChatGroup;
}

export const addTitle = () => {

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

export const addComentarioMovies = (item) => {


  const divTemplateComentario = document.createElement('div');

  const sectionTempleteComentario = document.createElement('section');
  sectionTempleteComentario.classList.add('comentario');
  divTemplateComentario.innerHTML = `

      <img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__card"/>
      <dd itemprop="name" class="name__card">${item.name}</dd>
      <textarea class="txtarea__chatGroup" readOnly=true cols="60" rows="8" style="resize:none"></textarea>
  `;

  return divTemplateComentario;
}

export const userOnline = () => {
  const ul = document.createElement('ul');
  ul.classList.add('container__user__online');

  dataMovie.forEach((item) => {
    if (item.facts.isOnline) {
      const li = document.createElement('li');
      li.classList.add('container__user__online__item');
      li.innerHTML = `
      <section class="grid__user__online">
        <div class="item_user_online logo_user_online">
          <img src="${item.imageUrl}" alt="Imagem do Filme" class="image__user__online"/>
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
      ul.appendChild(li);
    }
  });

  return ul;
};


export default ChatGroup;
