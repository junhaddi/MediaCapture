import png from "png.js";
import jsQR from "jsqr";

const fileReader = new FileReader();
const fileInput = document.getElementById("QR");

function convertPNGtoByteArray(pngData) {
  const data = new Uint8ClampedArray(pngData.width * pngData.height * 4);
  for (let y = 0; y < pngData.height; y++) {
    for (let x = 0; x < pngData.width; x++) {
      const pixelData = pngData.getPixel(x, y);

      data[(y * pngData.width + x) * 4 + 0] = pixelData[0];
      data[(y * pngData.width + x) * 4 + 1] = pixelData[1];
      data[(y * pngData.width + x) * 4 + 2] = pixelData[2];
      data[(y * pngData.width + x) * 4 + 3] = pixelData[3];
    }
  }
  return data;
}

fileReader.onload = function (event) {
  const pngReader = new png(event.target.result);
  pngReader.parse(function (err, pngData) {
    if (err) throw err;
    const pixelArray = convertPNGtoByteArray(pngData);
    console.log(jsQR(pixelArray, pngData.width, pngData.height));
  });
};

fileInput.onchange = function () {
  fileReader.readAsArrayBuffer(fileInput.files[0]);
};
