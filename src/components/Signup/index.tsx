import axios from "axios";
import { motion } from "framer-motion";
import localforage from "localforage";
import { useState } from "react";
import styles from "../Signin.module.css";

const Signup = ({ setUser }: { setUser: any }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(false);
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  };
  const signUp = () => {
    setActive(true);
    axios
      .post(
        // "http://localhost:3001/user/signup",
        "https://groupchat-backend.vercel.app/user/signup",
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
        <h1 className={styles.text}>Signup</h1>
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
        <motion.button className={styles.button} whileHover={{scale:1.2}} onClick={signUp} disabled={active}>
          {!active ? (
            <div>Submit</div>
          ) : (
            <div className={styles.loading} ></div>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Signup;
