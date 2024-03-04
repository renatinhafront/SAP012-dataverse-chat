export function errorView(props) {
  const element = document.createElement('div');
  element.classList.add('div__error');
  const image = document.createElement('img');
  image.src = '../assets/imgError.jpeg';
  image.alt = `Imagem de erro para ${props.img}`;
  image.classList.add('img__error');
  element.appendChild(image);

  return element;
}

export default errorView;