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
          content: `Agora você é um assistente de Filmes. Responda as perguntas sobre ${movie}.`
        },
        {
          role: "user",
          content: texto
        }

      ],
      model: 'gpt-4',
      max_tokens: 1500,
      temperature: 0.5
    })
  };

  return new Promise((resolve, reject) => {
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao chamar a API do OpenAI');

        }
        return response.json();
      })
      .then(data => {
        resolve(data.choices[0].message.content.trim());
      })
      .catch(error => {
        reject(error);
      });
  });
}





