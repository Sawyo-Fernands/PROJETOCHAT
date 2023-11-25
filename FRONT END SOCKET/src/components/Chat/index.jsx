import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import { IoExit } from "react-icons/io5";
import axios from "axios";

export function Chat({ socket, room, username, closeChat }) {
  const messageRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = () => {
    if (!message) return toast.warn("Preencha o campo de mensagens!");
    setMessageList((current) => [
      ...current,
      { message, room, username: username },
    ]);
    socket.emit("send_message", { message, room, username: username });
    setMessage("");
    document.getElementById("inputChat")?.focus();
    setTimeout(() => {
      scrollToEnd();
    }, 10);
  };

  const obterMensagens = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/mensagens/${room}`);
      setMessageList(response.data);
    } catch (error) {
      console.error('Erro ao obter mensagens:', error);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
      scrollToEnd();
    });
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(()=>{
    if(room){
        obterMensagens()
    }
  },[room])

  const scrollToEnd = () => {
    if (messageRef.current) {
      const listContainer = messageRef.current;
      listContainer.scrollTop = listContainer.scrollHeight;
    }
  };

  return (
    <div>
        <section className={'containerHeader'}>
            <div className="contentHeader">
            <span style={{borderRight:"1px solid gray",paddingRight:"1rem"}}>USUARIO : {username}</span>
            <span>SALA : {room}</span>
            </div>
            <div className='buttonExit' onClick={closeChat}>
                <IoExit size={20}  color="white"/>
            </div>
        <div>

        </div>
        </section>
      <div className={"chat-container"}>
        <div className={"chat-body"} ref={messageRef}>
          {messageList.map((message, index) => (
            <div
              className={`${"message-container"} ${
                message.username === username && "message-mine"
              }`}
              key={index}
            >
              <div className="message-author">
                <strong>{message.username}</strong>
              </div>
              <div className="message-text">{message.message}</div>
            </div>
          ))}
          <div />
        </div>
        <div className={"chat-footer"}>
          <input
            type="text"
            className={"inputChat"}
            required
            id="inputChat"
            value={message}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className={"containerButtonSend"}>
            <IoMdSend size={25} onClick={sendMessage} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
