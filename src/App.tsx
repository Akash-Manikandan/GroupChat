import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { FiUserPlus, FiUser } from "react-icons/fi";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ChatRoom from "./components/ChatRoom";
import localforage from "localforage";

function App() {
  const tabs = [{ label: "Signin" }, { label: "Signup" }];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [user, setUser] = useState(false);
  const getUser = async () => {
    try {
      const value: any = await localforage.getItem("@details");
      if (value) {
        setUser(true);
      } else {
        setUser(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) {
    return (
      <div className={styles.outer}>
        <div className={styles.container}>
          {tabs.map((item) => (
            <div
              key={item.label}
              className={
                item.label === selectedTab.label
                  ? styles.selected
                  : styles.notselected
              }
              onClick={() => setSelectedTab(item)}
            >
              <div className={styles.icon}>
                {item.label == "Signin" ? <FiUserPlus /> : <FiUser />}
                <div className={styles.label}>{`${item.label}`}</div>
              </div>
            </div>
          ))}
        </div>
        <main>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.window}
            >
              {selectedTab.label === "Signin" ? (
                <Signin setUser={setUser} />
              ) : (
                <Signup setUser={setUser} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  } else {
    return <ChatRoom setUser={setUser} />;
  }
}

export default App;
