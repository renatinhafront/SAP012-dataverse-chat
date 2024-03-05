//import { getApiKey } from "./apiKey";

const url = 'https://api.openai.com/v1/chat/completions';

export const communicateWithOpenAI = (texto) => {
  const apiKey = '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';//getApiKey();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: texto
        }
      ],
      model: 'gpt-4',
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





