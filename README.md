# Chat em Tempo Real

Bem-vindo ao nosso projeto de Chat em Tempo Real! Este sistema proporciona uma experiência de comunicação instantânea e interativa, onde os usuários podem participar de salas de chat, enviar mensagens em tempo real e personalizar sua experiência.

## Tecnologias Utilizadas

- **React JS:** Biblioteca para a construção da interface do usuário, proporcionando uma experiência intuitiva e responsiva.
- **Node.js:** Plataforma que permite a execução de código JavaScript no lado do servidor, fornecendo uma base sólida para a criação de APIs eficientes.
- **MySQL:** Sistema de gerenciamento de banco de dados relacional utilizado para armazenar de forma segura os dados dos usuários e o histórico de mensagens.
- **Socket.IO:** Biblioteca JavaScript que simplifica a implementação de websockets, permitindo a comunicação bidirecional em tempo real no chat.

## Funcionalidades

- **Interação Instantânea:** As mensagens são enviadas e recebidas em tempo real, proporcionando uma comunicação ágil e eficiente.
- **Personalização:** Os usuários podem escolher seus nomes de usuário e salas, tornando a experiência de chat mais personalizada.
- **Histórico de Mensagens:** Todas as conversas são salvas no banco de dados, permitindo aos usuários revisitar e relembrar interações anteriores.

## Como Iniciar

1. Clone o repositório: `git clone https://github.com/Sawyo-Fernands/PROJETOCHAT.git`
2. Instale as dependências do cliente e do servidor: `npm install` em ambos os diretórios `client` e `server`.
3. Execute o comando SQL para criar a estrutura do banco :
create database chat;
use chat;
CREATE TABLE IF NOT EXISTS mensagens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
4. Configure o banco de dados MySQL e atualize as configurações no arquivo `index.js`.
5. Inicie o servidor: `node index.js` no diretório `server`.
6. Inicie o cliente: `npm start` no diretório `client`.

Acesse a aplicação em [http://localhost:3000](http://localhost:3000) no seu navegador.


## Contato

Se tiver dúvidas ou sugestões, sinta-se à vontade para entrar em contato. Estamos empolgados com a evolução deste projeto e esperamos receber seu feedback.

Divirta-se interagindo em tempo real!

🚀 #ChatEmTempoReal #DesenvolvimentoWeb #ReactJS #NodeJS #MySQL #SocketIO
