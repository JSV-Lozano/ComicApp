import { Text, Container } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import styles from "@styles/Header.module.css";

function Header() {
  return (
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
  );
}

export { Header };
