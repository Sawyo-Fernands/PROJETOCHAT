import { useEffect, useState } from "react";
import { Chat } from "../Chat";
import "./styles.css";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

const socket = io.connect("http://localhost:3001");

export function JoinRoom() {
  const [room, setRoom] = useState("");
  const [username, setusername] = useState("");
  const [joinRoom, setJoinRoom] = useState(false);

  const handleEntrarChat = async (e) => {
    e.preventDefault();
    if (!username) return toast.warn("Informe o usuário!");
    if (!room) return toast.warn("Informe a senha!");
    setJoinRoom(true);
    FnJoinRoom();
  };

  const FnJoinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  function closeChat(){
    setJoinRoom(false);
    setusername("")
    setRoom("")
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {!joinRoom ? (
        <div className='containerBodyForm'>
            <div className="login-form-wrap">
          <div>
            <h2>Entrar Sala</h2>
            <form className="login-form">
              <input
                type="text"
                name="usuario"
                placeholder="Usuário"
                value={username}
                required
                onChange={(e) => setusername(e.target.value)}
              />
              <input
                type="text"
                name="room"
                placeholder="Sala"
                required
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <button
                type="submit"
                className="btn-login"
                onClick={(e) => handleEntrarChat(e)}
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={username} closeChat={closeChat} />
      )}
    </>
  );
}
