export const createQuestion = (question) => {
  const boxMyMessage = document.createElement('div')
  boxMyMessage.className = 'box-my-question'

  const myMessage = document.createElement('p')
  myMessage.className = 'my-question'
  myMessage.innerHTML = question

  boxMyMessage.appendChild(myMessage)

  return boxMyMessage
}

export const createResponse = (response) => {
  const boxResponseMessage = document.createElement('div')
  boxResponseMessage.className = 'box-response'

  const chatResponse = document.createElement('p')
  chatResponse.className = 'response-message'
  chatResponse.innerHTML = response

  boxResponseMessage.appendChild(chatResponse)

  return boxResponseMessage
}