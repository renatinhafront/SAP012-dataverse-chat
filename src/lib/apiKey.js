// funcao para atribuir valor armazenado
export const setApiKey = (key) => {
    window.localStorage.setItem("API_KEY", key)
    // Implementa el código para guardar la API KEY en Local Storage
  };
  
  // funçao para retornar um valor
  export const getApiKey = () => {
    return window.localStorage.getItem("API_KEY")
    // Implementa el código para obtener la API KEY desde Local Storage
  };