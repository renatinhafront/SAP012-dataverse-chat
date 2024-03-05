// test/apiKey.spec.js

import { getApiKey, setApiKey } from '../src/lib/apiKey.js';

describe('getApiKey', () => {
  it('deve retornar o valor da chave da API armazenada', () => {
    // Configuração
    const apiKey = 'minhaChaveDeAPI';
    localStorage.setItem('API_KEY', apiKey);
    // Ação
    const chaveAPIRecuperada = getApiKey();
    // Verificação
    expect(chaveAPIRecuperada).toBe(apiKey);
    // Limpeza
    localStorage.removeItem('API_KEY');
  });

  it('deve retornar null se não houver nenhuma chave de API armazenada', () => {
    // Ação
    const chaveAPIRecuperada = getApiKey();
    // Verificação
    expect(chaveAPIRecuperada).toBeNull();
  });
});

describe('setApiKey', () => {
  it('deve definir corretamente a chave da API', () => {
    // Configuração
    const apiKey = 'minhaChaveDeAPI';
    // Ação
    setApiKey(apiKey);
    // Verificação
    expect(localStorage.getItem('API_KEY')).toBe(apiKey);
    // Limpeza
    localStorage.removeItem('API_KEY');
  });
});
