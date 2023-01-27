import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "@styles/Search.module.css";
import { search } from "../../../services/search";

function Search({ query, results }) {
  console.log("🚀 ~ file: index.jsx:10 ~ Search ~ results", results);

  return (
    <>
      <Head>
        <title>Appcomics</title>
        <meta name="description" content="Page comics XKCD not not official" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container__Search}>
        <p>Search {query}</p>
        {results.results?.map((result) => {
          return (
            <Link href={result.img} key={result.id}>
              <Image
                width={200}
                height={200}
                src={result.img}
                alt={result.alt}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const results = await search({ query: q });
  return {
    props: {
      query: q,
      results,
    },
  };
}

export default Search;
