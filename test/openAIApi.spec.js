/* eslint-disable no-undef */
import { communicateWithOpenAI } from '../src/lib/openAIApi.js';

//jest.fn() e uma função mockada
//mock é uma simulação

//fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({}),
});

//função comunicateWithOpenAI retorna uma promisse que é assíncrona e o await aguarda sua resposta

describe('Comunicate with OpenAI', () => {
  it('Deve fazer a chamada e devolver payload com sucesso', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ choices: [
      { message: { content: 'minha mensagem' } }] }) });
    const result = await communicateWithOpenAI('question', 'movie');
    await expect(result).toBe('minha mensagem');
  });

  it('Deve fazer a chamada e devolver erro', async () => {
    global.fetch.mockResolvedValue({ok: false});
    await expect(communicateWithOpenAI([], 'movie')).rejects.toThrow('Erro ao chamar a API do OpenAI');
  });

});

