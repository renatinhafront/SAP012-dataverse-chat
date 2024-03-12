import { getApiKey } from "./apiKey.js";

const url = 'https://api.openai.com/v1/chat/completions';

export const communicateWithOpenAI = (texto, movie) => {
  const apiKey = getApiKey();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': "application/json",
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `Agora você é o ${movie}. Deve responder como se fosse o próprio filme, levando em consideranção para o seu humor, o gênero do ${movie}.`
        },
        {
          role: "user",
          content: texto
        }

      ],
      model: 'gpt-4',
      max_tokens: 1500,
      temperature: 0.7
    })
  };

  return new Promise((resolve, reject) => {
    //Fazendo a chamada
    fetch(url, requestOptions)
    //Resposta da chamada
      .then(response => {
        //Não retorno o sucesso (validação 200)
        if (!response.ok) {
          //Throw new ele par de executar e retorna o erro
          throw new Error('Erro ao chamar a API do OpenAI');
        }
        //Retorna o json
        return response.json();
      })
      .then(data => {
        //Retorna o content com o trim que remove espaços em branco
        resolve(data.choices[0].message.content.trim());
      })
      .catch(error => {
        //Todos os erros gerados no then caem aqui
        reject(error);
      });
  });
}





