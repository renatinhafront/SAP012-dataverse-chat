import dataMovie from '../data/dataset.js';

export function Chat(props) {
  const item = dataMovie.find((movie) => movie.id === props.id);

  const divTemplateChat = document.createElement('div');
  divTemplateChat.innerHTML = `
    <section class="container-chat">
    <section class="container-details">
        <img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__movie"/>
        ${renderDetails(item).outerHTML}
        <div class="description-movie">
        <p class="description">${item.description}</p>
      </div>
    </section>
      <section class="chat">
      <h3>Iniciar Conversa</h3>
      <div class="textarea-chat">
        <textarea class="txtarea__chat" readOnly=true cols="75" rows="25" style="resize:none"></textarea>
      </div>
      <div class="input-chat">
        <input class="inp__chat" type="text" placeholder="Escreva aqui sua pergunta.."></input>
      </div>
      </section>
    </section>
  `;

  return divTemplateChat;
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
