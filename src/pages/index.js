import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import fs from "fs/promises";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ comicsFile }) {
  console.log("🚀 ~ file: index.js:11 ~ Home ~ comicsFile", comicsFile);
  return (
    <>
      <Head>
        <title>AppComics</title>
        <meta name="description" content="Page comics XKCD not not official" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {comicsFile.map((comics) => (
          <Link href={`/comic/${comics.id}`} key={comics.id}>
            <img src={comics.img} alt={comics.alt} />
          </Link>
        ))}
      </main>
    </>
  );
}
export async function getStaticProps(context) {
  const file = await fs.readdir("./comics/");
  const lastetComics = file.splice(-8, file.length);
  const promiseReadComics = lastetComics.map(async (files) => {
    const content = await fs.readFile(`./comics/${files}`, "utf-8");
    return JSON.parse(content);
  });

  const comicsFile = await Promise.all(promiseReadComics);

  return {
    props: {
      comicsFile,
    },
  };
}
