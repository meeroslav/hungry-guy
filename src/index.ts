import './style.scss';

function init() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Some random text';
  document.body.appendChild(h1);

  const canvas = document.createElement('canvas');
  canvas.className = 'game-canvas';
  document.body.appendChild(canvas);
}

init();
