import dataMovie from '../data/dataset.js';
// import { navigateTo } from '../router';

export function Chat(props) {
  // if (props.id) {
  //   navigateTo("/error");
  // }
  const divChat = document.createElement('div');
  divChat.classList.add('detail__initital');
  divChat.textContent = `Iniciar Conversa!`;

  const inputChatText = document.createElement('textarea');
  inputChatText.classList.add('detail__inputChatText');
  inputChatText.readOnly = true;
  inputChatText.cols = 50;
  inputChatText.rows = 15;
  inputChatText.resize = "none";
  divChat.appendChild(inputChatText);

  const inputChat = document.createElement('input');
  inputChat.classList.add('detail__inputChat');
  inputChat.type = "text";
  inputChat.placeholder = "Escreva sua pergunta aqui.."
  divChat.appendChild(inputChat);

  const item = dataMovie.find((movie) => movie.id === props.id);

  const divDetail = renderCard(item);
  divChat.appendChild(divDetail);

  return divChat;
}

export const renderCard = (item) => {
  const divDetail = document.createElement('div');
  divDetail.classList.add('detail__card');
  divDetail.innerHTML = `
        <dl itemscope itemtype="#">
          <dt>
            <img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__card"/>
          </dt>
          <dd itemprop="sort-order" class="imDbRating">${item.facts.imDbRating} /10 <img src="./img/icon-star.svg" alt="Star icon" /></dd>
          <dd itemprop="name" class="name__card">${item.name}</dd>
          <dd itemprop="releaseYear" class="releaseYear">${item.facts.releaseYear} - ${item.facts.runtimeStr}</dd>
          <dd itemprop="shortDescription" class="shortDescription">${item.shortDescription}</dd>
          <dd itemprop="movieGender" class="movieGender">${item.facts.movieGender}</dd>
          <dd itemprop="directorsName" class="directors__card">${item.facts.directorsName}</dd>
          <dd itemprop="movieStars" class="stars__card">${item.facts.movieStars}</dd>
          <dd itemprop="description" class="description">${item.description}</dd>
          <button class='btn-chatGrup'>Chat em grupo</button>
        </dl>
    `;
  // div.addEventListener("click", () => navigateTo("/chatGrupo", { id: item.id }))

  return divDetail;
};

export default Chat;
