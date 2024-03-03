import dataMovie from '../data/dataset.js';

export function ChatGroup() {

  const sectionTemplateChatGroup = document.createElement('section');
  sectionTemplateChatGroup.classList.add('display__chat__group');
  sectionTemplateChatGroup.classList.add('container__chat__group');

  const divChatGroup = document.createElement('div');
  divChatGroup.classList.add('item__chat__group');
  sectionTemplateChatGroup.appendChild(divChatGroup);

  const divOnlineUsers = document.createElement('div');
  divOnlineUsers.classList.add('item__chat__group');
  divOnlineUsers.appendChild(userOnline());
  sectionTemplateChatGroup.appendChild(divOnlineUsers);

  // const divTituloChatGroup = document.createElement('div');
  // divTituloChatGroup.classList.add('titulo-chatGroup');
  // sectionTemplateChatGroup.appendChild(divTituloChatGroup);
  // divTituloChatGroup.innerHTML = `
  //     <h1>The Best Movies</h1>
  //     <dd clas="">Conheça sobre os melhores filmes da história</dd>
  //   `;


  // const sectionChatGroup = document.createElement('section');
  // sectionChatGroup.classList.add('titulo-chatGroup');
  // divTemplateChatGroup.appendChild(sectionChatGroup);

  // const divTituloChatGroup = document.createElement('div');
  // divTituloChatGroup.classList.add('titulo-chatGroup');
  // sectionChatGroup.appendChild(divTituloChatGroup);
  // divTituloChatGroup.innerHTML = `
  //     <h1>The Best Movies</h1>
  //     <dd clas="">Conheça sobre os melhores filmes da história</dd>
  // `;

  // // const item = dataMovie.find(item);
  // dataMovie.forEach(movie => {
  //   sectionChatGroup.appendChild(userOnline(movie));
  //   sectionChatGroup.appendChild(addComentario(movie));

  return sectionTemplateChatGroup;
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
        <p class="description">${item.shortDescription}</p>
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
