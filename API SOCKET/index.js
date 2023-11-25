const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require("mysql2");  // Alterado de 'mysql' para 'mysql2'
const { format } = require('date-fns');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'projetotcc2023',
  database:'chat'
});


db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
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
    const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss"); // Formata a data

    const insertQuery = "INSERT INTO mensagens (room, username, message, timestamp) VALUES (?, ?, ?, ?)";
    const values = [data.room, data.username, data.message, timestamp];

    db.query(insertQuery, values, (error, results) => {
      if (error) {
        console.error('Erro ao inserir mensagem no banco de dados:', error);
      } else {
        console.log('Mensagem salva no banco de dados');
      }
    });

    socket.to(data.room).emit("receive_message",data);

  });
});

app.get('/mensagens/:sala', (req, res) => {
  const sala = req.params.sala;

  // Consulta ao banco de dados para obter as mensagens da sala
  const selectQuery = "SELECT * FROM mensagens WHERE room = ? ORDER BY timestamp";
  
  db.query(selectQuery, [sala], (error, results, fields) => {
    if (error) {
      console.error('Erro ao obter mensagens do banco de dados:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.json(results);
    }
  });
});


server.listen(3001, () => {
  console.log("Servidor Rodando");
});
