import axios from 'axios';
import { getApiKey } from './apiKey.js';

export const communicateWithOpenAI = async (messages) => {
   try {
      const apiKey = await getApiKey(); // Obtém a chave da API
      const response = await axios.post(
         'https://api.openai.com/v1/completions',
         {
            model: "text-davinci-003",
            prompt: messages,
            max_tokens: 150, 
            temperature: 0.7, 
         },
         {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${apiKey}`
            }
         }
      );

      return response.data.choices[0].text.trim(); // Retorna a resposta da OpenAI
   } catch (error) {
      console.error('Erro ao se comunicar com a OpenAI:', error);
      throw error;
   }
};
