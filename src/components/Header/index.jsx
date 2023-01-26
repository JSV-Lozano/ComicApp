import Link from "next/link";
import React, { Children } from "react";
import styles from "@styles/Header.module.css";

function Header({ children }) {
  return (
    <>
      <header className={styles.Header}>
        <div className={styles.ContainerHeader}>
          <div className={styles.ContainerLogo}>
            <h2>Next</h2>
            <h2>XKCD</h2>
          </div>
          <nav className={styles.Nav}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/search">Search</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}

export { Header };
