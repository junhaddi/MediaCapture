const express = require("express");
const app = express();
const server = require("http").Server(app);

// Express 미들웨어 multer(파일 업로드)설정
const multer = require("multer");
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

// 라우팅 설정
app.use(express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.post("/upload", upload.single("camera_image"), (req, res) => {
  console.log(req.file);
  res.send("업로드 성공!");
});

// Node서버 실행
const port = process.env.PORT || 80;
server.listen(port, () => {
  console.log(`Listening on ${server.address().port}`);
});
