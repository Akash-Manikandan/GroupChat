import { motion } from "framer-motion";
import moment from "moment";
import styles from "./Bubble.module.css";

const Bubble = ({ message, id }: any) => {
  const isMyMessage = () => {
    return message.userId === id;
  };

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        // viewport={{ once: true }}
        exit={{opacity:1}}
        transition={{ duration: 0.5 }}
      >
        <div
          className={styles.messageBox}
          style={
            isMyMessage()
              ? {
                  marginLeft: "70%",
                  marginRight: 0,
                  backgroundColor: "#9f85fe",
                }
              : {
                  marginLeft: 0,
                  marginRight: "70%",
                  backgroundColor: "#383152",
                }
          }
        >
          {!isMyMessage() && (
            <div className={styles.name}>{message.user.name}</div>
          )}

          <div className={styles.message}>{message.content}</div>
          <div className={styles.time}>
            {moment(message.createdAt).fromNow()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Bubble;
