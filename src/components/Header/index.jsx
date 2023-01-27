import Link from "next/link";
import { useState, useRef } from "react";
import React, { Children } from "react";
import styles from "@styles/Header.module.css";

function Header({ children }) {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const handleChange = () => {
    const q = searchRef.current.value;

    if (q === "") {
      setResults([]);
    } else {
      fetch(`/api/Search/?q=${q}`)
        .then((res) => res.json())
        .then((searchResults) => {
          setResults(searchResults);
        });
    }
  };

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
                <input ref={searchRef} type="search" onChange={handleChange} />
                {results.length ? (
                  <div className={styles.Search}>
                    <ul>
                      {results.map((result) => (
                        <li key={result.id}>
                          <Link href={`/comic/${result.id}`}>
                            <p>{result.title}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
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
