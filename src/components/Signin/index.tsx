import { useState } from "react";
import styles from "../Signin.module.css";
import axios from "axios";
import localforage from "localforage";
import { motion } from "framer-motion";

const Signin = ({ setUser }: { setUser: any }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(false);
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };
  const signIn = () => {
    setActive(true);
    axios
      .post(
        // "http://localhost:3001/user/signin",
        "https://groupchat-backend.vercel.app/user/signin",
        {
          name,
          email,
        },
        //@ts-ignore
        headers
      )
      .then(async function (response) {
        try {
          const jsonValue = JSON.stringify(response.data);
          await localforage.setItem("@details", jsonValue);
          setUser(true);
          setActive(false);
        } catch (e) {
          throw e;
        }
      })
      .catch(function (error) {
        alert(error.response.data.message);
        setActive(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h1 className={styles.text}>Signin</h1>
      </div>
      <input
        className={styles.input}
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className={styles.center}>
        <motion.button className={styles.button} whileHover={{scale:1.2}} onClick={signIn} disabled={active}>
          {!active ? (
            <div>Submit</div>
          ) : (
            <div className={styles.loading}></div>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Signin;
