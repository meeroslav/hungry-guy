import './style.scss';

const cartman = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PScwIDAgMTA0IDk3JyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPgogIDxwYXRoIGQ9J00xNCw4NWwzLDloNzJjMCwwLDUtOSw0LTEwYy0yLTItNzksMC03OSwxJyBmaWxsPScjN0M0RTMyJy8+CiAgPHBhdGggZD0nTTE5LDQ3YzAsMC05LDctMTMsMTRjLTUsNiwzLDcsMyw3bDEsMTRjMCwwLDEwLDgsMjMsOGMxNCwwLDI2LDEsMjgsMGMyLTEsOS0yLDktNGMxLTEsMjcsMSwyNy05YzAtMTAsNy0yMC0xMS0yOWMtMTctOS02Ny0xLTY3LTEnIGZpbGw9JyNFMzAwMDAnLz4KICA8cGF0aCBkPSdNMTcsMzJjLTMsNDgsODAsNDMsNzEtMyBsLTM1LTE1JyBmaWxsPScjRkZFMUM0Jy8+CiAgPHBhdGggZD0iTTE3LDMyYzktMzYsNjEtMzIsNzEtM2MtMjAtOS00MC05LTcxLDMiIGZpbGw9IiM4RUQ4RjgiLz4KICA8cGF0aCBkPSdNNTQsMzVhMTAgOCA2MCAxIDEgMCwwLjF6TTM3LDM4YTEwIDggLTYwIDEgMSAwLDAuMXonIGZpbGw9JyNGRkYnLz4KICA8cGF0aCBkPSdNNDEsNmMxLTEsNC0zLDgtM2MzLTAsOS0xLDE0LDNsLTEsMmgtMmgtMmMwLDAtMywxLTUsMGMtMi0xLTEtMS0xLTFsLTMsMWwtMi0xaC0xYzAsMC0xLDItMywyYzAsMC0yLTEtMi0zTTE3LDM0bDAtMmMwLDAsMzUtMjAsNzEtM3YyYzAsMC0zNS0xNy03MSwzTTUsNjJjMy0yLDUtMiw4LDBjMywyLDEzLDYsOCwxMWMtMiwyLTYsMC04LDBjLTEsMS00LDItNiwxYy00LTMtNi04LTItMTJNOTksNTljMCwwLTktMi0xMSw0bC0zLDVjMCwxLTIsMywzLDNjNSwwLDUsMiw3LDJjMywwLDctMSw3LTRjMC00LTEtMTEtMy0xMCcgZmlsbD0nI0ZGRjIwMCcvPgogIDxwYXRoIGQ9J001Niw3OHYxTTU1LDY5djFNNTUsODd2MScgc3Ryb2tlPScjMDAwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnLz4KICA8cGF0aCBkPSdNNjAsMzZhMSAxIDAgMSAxIDAtMC4xTTQ5LDM2YTEgMSAwIDEgMSAwLTAuMU01Nyw1NWEyIDMgMCAxIDEgMC0wLjFNMTIsOTRjMCwwLDIwLTQsNDIsMGMwLDAsMjctNCwzOSwweicvPgogIDxwYXRoIGQ9J001MCw1OWMwLDAsNCwzLDEwLDBNNTYsNjZsMiwxMmwtMiwxMk0yNSw1MGMwLDAsMTAsMTIsMjMsMTJjMTMsMCwyNCwwLDM1LTE1JyBmaWxsPSdub25lJyBzdHJva2U9JyMwMDAnIHN0cm9rZS13aWR0aD0nMC41Jy8+Cjwvc3ZnPgo=';

function init() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Some random text changed';
  document.body.appendChild(h1);

  const canvas: HTMLCanvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
  const cWidth = canvas.offsetWidth;
  const cHeight = canvas.offsetHeight;
  const wRatio = cWidth / 100;
  const hRatio = cHeight / 100;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    canvas.setAttribute('height', cWidth);
    canvas.setAttribute('width', cHeight);

    const grd = ctx.createLinearGradient(0, 0, 0, 100 * hRatio);
    grd.addColorStop(0, '#80c2ff');
    grd.addColorStop(1, '#436caa');

// Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 100 * wRatio, 100 * hRatio);

    const img = new Image();
    img.onload = () => {
      // @ts-ignore
      ctx.drawImage(img, 20 * wRatio, 20 * hRatio, 50 * wRatio, 50 * hRatio);
    };
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg';
    const cartmanImg = new Image();
    cartmanImg.onload = () => {
      // @ts-ignore
      ctx.drawImage(cartmanImg, 50 * wRatio, 50 * hRatio, 50 * wRatio, 50 * hRatio);
    };
    cartmanImg.src = cartman;

  }
}

init();
