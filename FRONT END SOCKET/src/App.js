import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [username, setusername] = useState("");
  const [messageList, setMessageList] = useState([])
  console.log({messageList})
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    setMessageList((current) => [...current, { message, room,username:username }])
    socket.emit("send_message", { message, room,username:username });
  };

  useEffect(()=>{
    socket.on('receive_message', data => {
      setMessageList((current) => [...current, data])
    })

    return () => socket.off('receive_message')
  }, [socket])

  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
       <input
        placeholder="Usuário..."
        onChange={(event) => {
          setusername(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {
        messageList.map((element) =>{
          return (
            <div>
              <p>
              {element.username}
            </p>
            <p>
              {element.message}
            </p>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
