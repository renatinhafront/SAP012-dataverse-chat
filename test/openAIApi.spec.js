/* eslint-disable no-undef */
import { communicateWithOpenAI } from '../src/lib/openAIApi.js';

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({}),
});

describe('Comunicate with OpenAI', () => {
  it('Deve fazer a chamada e devolver payload com sucesso', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: async () => ({ choices: [
      { message: { content: 'minha mensagem' } }] }) });
    const result = await communicateWithOpenAI('question', 'movie');
    await expect(result).toBe('minha mensagem');
  });

  it('Deve tratar corretamente o caso de erro de chamada', async () => {
    global.fetch.mockResolvedValue({ok: false});
    await expect(communicateWithOpenAI([], 'movie')).rejects.toThrow('Erro ao chamar a API do OpenAI');
  });

});