

// describe('Variables', () => {
//   it('Se declaran variables con "const"', () => {
//     expect(constStatements.length).toBeGreaterThan(0);
//   });
// });

// describe('Uso de condicionales', () => {
//   it('Se usa el statement "if...else"', () => {
//     expect(ifelseStatements.length).toBeGreaterThan(0);
//   });
// });

// describe('Módulos de ECMAScript', () => {
//   it('Se usa "export"', () => {
//     expect(exportStatements.length).toBeGreaterThan(0);
//   });
// });

import { setRootEl, setRoutes } from '../src/router.js';

// Variável global para armazenar rootEl
let rootEl;

// Variável global para armazenar ROUTES
let ROUTES;

describe('Testes para as funções setRootEl e setRoutes', () => {
  const mockElement = document.createElement('div');
  const mockRoutes = ['route1', 'route2', 'route3'];

  test('setRootEl deve atribuir corretamente o elemento raiz', () => {
    setRootEl(mockElement);
    expect(rootEl).toBe(mockElement);
  });

  test('setRoutes deve atribuir corretamente as rotas', () => {
    setRoutes(mockRoutes);
    expect(ROUTES).toEqual(mockRoutes);
  });
});