import Link from "next/link";
import { useState, useRef } from "react";
import React, { Children } from "react";
import styles from "@styles/Header.module.css";
import { useRouter } from "next/router";

function Header({ children }) {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const q = searchRef.current?.value;

  const handleChange = () => {
    const q = searchRef.current.value;
    console.log("🚀 ~ file: index.jsx:15 ~ handleChange ~ q", q)
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

  const { locale, locales } = useRouter();

/*   const showLocales = () => {
    const restOfLocales = locales.filter((l) => l !== locale);
    return {
      actualtLocale: locale,
      restOfLocales,
    };
  }; */
  
  const restofLocales = locales.filter((l) => l !== locale);

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
                <Link href="/" locale={restofLocales[0]}>
                  {restofLocales[0]}
                </Link>
              </li>
              <li>
                <input ref={searchRef} type="search" onChange={handleChange} />
                {results.length ? (
                  <div className={styles.Search}>
                    <ul>
                      <li>
                        <Link href={`/search?q=${q}`}>
                          Ver Todos los resultados {results.length}
                        </Link>
                      </li>
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
