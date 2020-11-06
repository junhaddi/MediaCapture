let input = document.querySelector("input[type=file]");

input.onchange = () => {
  let file = input.files[0];
  drawThumbnail(file);
  drawOriginal(file);
};

function drawThumbnail(file) {
  let reader = new FileReader();
  reader.onload = (e) => {
    let dataURL = e.target.result;
    let canvas = document.getElementById("thumbnail");
    let ctx = canvas.getContext("2d");
    let img = new Image();

    img.onload = () => {
      // 사진 크기 조절
      const MAX_WIDTH = 400;
      const MAX_HEIGHT = 400;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      ////////////////////////////////////////////////////////////////////////////////
      // 2020.11.06 강준하
      // canvas.toDataURL() 썸네일 이미지 값을 서버로 전송 -> 서버측에서 이미지 생성하기
      ////////////////////////////////////////////////////////////////////////////////
      console.log(canvas.toDataURL());
    };
    img.src = dataURL;
  };
  reader.readAsDataURL(file);
}

function drawOriginal(file) {
  let reader = new FileReader();
  reader.onload = (e) => {
    let dataURL = e.target.result;
    let canvas = document.getElementById("original");
    let ctx = canvas.getContext("2d");
    let img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataURL;
  };
  reader.readAsDataURL(file);
}
