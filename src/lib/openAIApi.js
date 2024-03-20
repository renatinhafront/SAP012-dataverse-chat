import { getApiKey } from "./apiKey.js";

const url = 'https://api.openai.com/v1/chat/completions';

export const communicateWithOpenAI = (texto, movie) => {
  const apiKey = getApiKey();

  const requestOptions = {
    method: 'POST',
    // cabeçalho são utilizados na requisição
    headers: {
      //accept só aceita o json
      'Accept': "application/json",
      //o conteudo que estou enviando é do tipo json
      'Content-Type': 'application/json',
      //a chave de autenticação e o token da API
      'Authorization': `Bearer ${apiKey}`
    },
    //corpo da requisição
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

  //new promise PROMESSA DE RETORNO
  return new Promise((resolve, reject) => {
    //fetch(buscar) é uma funcao que faz a chamada http
    fetch(url, requestOptions)
    //.then(então) quer que faça a checagem de sucesso
      .then(response => {
        //Se retornar a resposta é erro cai no if e depois no catch
        if (!response.ok) {
          //Throw new Error ele par de executar e retorna o erro caindo no catch
          throw new Error('Erro ao chamar a API do OpenAI');
        }
        //Retorna o json
        return response.json();
      })
      //then
      .then(data => {
        // resolve a promessa e retorna o  content com o trim que remove espaços em branco
        resolve(data.choices[0].message.content.trim());
      })
      //catch(erro) captura o erro
      .catch(error => {
        // rejeita a promessa e todos os erros gerados
        reject(error);
      });
  });
}

