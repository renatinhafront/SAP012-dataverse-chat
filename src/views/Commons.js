export const createQuestion = (question) => {
  const boxMyMessage = document.createElement('div')
  boxMyMessage.className = 'box-my-question'

  const myMessage = document.createElement('p')
  myMessage.className = 'my-question'
  myMessage.innerHTML = question

  boxMyMessage.appendChild(myMessage)

  return boxMyMessage
}

export const createResponse = (response, item) => {
  const gridResponse = document.createElement('div');
  const divImageResponse = document.createElement('div');
  const divTextResponse = document.createElement('div');
  divImageResponse.classList.add('image__response');
  divImageResponse.innerHTML = `<img src="${item.imageUrl}" alt="Imagem do Filme" class="image__user__online"/>`
  divTextResponse.classList.add('text__response');
  gridResponse.classList.add('grid__response');
  gridResponse.appendChild(divImageResponse);
  gridResponse.appendChild(divTextResponse);



  const boxResponseMessage = document.createElement('div')
  boxResponseMessage.className = 'box-response'

  const chatResponse = document.createElement('p')
  chatResponse.className = 'response-message'
  chatResponse.innerHTML = response

  boxResponseMessage.appendChild(chatResponse)
  divTextResponse.appendChild(boxResponseMessage)

  return gridResponse
}