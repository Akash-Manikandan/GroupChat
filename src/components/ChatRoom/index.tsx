import axios from "axios";
import { motion } from "framer-motion";
import localforage from "localforage";
import { useEffect, useState } from "react";
import Header from "../Header";
import InputBox from "../InputBox";
import Message from "../Message";
import styles from "./ChatRoom.module.css";

const ChatRoom = ({ setUser }: { setUser: any }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const [noChange, setNoChange] = useState<number>(0);
  const get = async () => {
    try {
      const value: any = await localforage.getItem("@details");
      const data = JSON.parse(value);
      setName(data.name);
      setId(data.id);
      getMessage(data.id)
    } catch (error) {
      console.log(error);
    }
  };
  const check = (response: any) => {
    if (messages.length !== response.data.length) {
      setMessages(response.data);
    } else {
      setNoChange(noChange + 1);
    }
  };
  const getMessage = async (idRecieved: string) => {
    await axios
      .get(`https://groupchat-backend.vercel.app/message/${idRecieved}`)
      .then((response) => {
        check(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    get();
    setNoChange(noChange + 1);
  }, []);
  useEffect(() => {
    getMessage(id);
  }, [noChange,messages.length]);
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.outer}
    >
      <div className={styles.container}>
        <Header setUser={setUser} name={name} />
      </div>
      <div className={styles.inner}>
        <Message id={id} messages={messages} />
      </div>
      <InputBox id={id} />
    </motion.div>
  );
};

export default ChatRoom;
