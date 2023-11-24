const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Usuário Conectado: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on('set_username', username => {
    socket.data.username = username
  })
  socket.on('disconnect', reason => {
    console.log('Usuário desconectado!', socket.id)
  })
  
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message",data);
  });
});

server.listen(3001, () => {
  console.log("Servidor Rodando");
});
