import { useState } from "react";
import styles from "./InputBox.module.css";
import { IoSend } from "react-icons/io5";
import axios from "axios";
const InputBox = ({ id }: any) => {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(true);
  const sendMessage = async () => {
    const msg = message.trim();
    setMessage("");
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    };
    if (msg) {
      setSent(false);
      axios
        .post(
          //"http://localhost:3001/message",
          "https://groupchat-backend.vercel.app/message",
          {
            content: msg,
            userId: id,
          },
          //@ts-ignore
          headers
        )
        .then(async function (response) {
          try {
            //setMessages([...messages, response.data]);
            setSent(true);
          } catch (e) {
            console.log(e);
            setSent(true);
          }
        })
        .catch(function (error) {
          console.log(error);
          setSent(true);
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <input
          className={styles.input}
          type={"text"}
          value={message}
          placeholder="Type Your Message Here"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={sendMessage}
          disabled={!sent}
        >
          {sent ? <IoSend /> : <div className={styles.loading}></div>}
        </button>
      </div>
    </div>
  );
};

export default InputBox;
