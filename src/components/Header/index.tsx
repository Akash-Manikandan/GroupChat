import localforage from "localforage";
import { FiLogOut } from "react-icons/fi";
import styles from "./Header.module.css";
const Header = ({ setUser, name }: { setUser: any; name: string }) => {
  const logOut = async () => {
    await localforage.removeItem("@details");
    setUser(false);
  };
  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      <nav>
        <button onClick={logOut}><FiLogOut /></button>
      </nav>
    </div>
  );
};

export default Header;
