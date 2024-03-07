import { getApiKey, setApiKey } from '../src/lib/apiKey.js';

const mockApiKey = "123abc"

describe('ApiKey Functions', () => {

  it('Deve definir corretamente o valor da chave da API', () => {
    setApiKey(mockApiKey)
    expect(localStorage.getItem("API_KEY")).toEqual(mockApiKey)
  });

  it('Deve devolver o valor da chave API', () => {
    expect(getApiKey()).toEqual(mockApiKey);
  });
});
