import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import styles from "@styles/Layaout.module.css";

function Layaout({ children }) {
  return (
    <>
      <Header/>
      <main className={styles.Main}>{children}</main>
      <Footer/>
    </>
  );
}

export { Layaout };
