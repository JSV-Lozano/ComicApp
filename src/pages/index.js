import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@styles/Home.module.css";
import fs from "fs/promises";
import { Layaout } from "@components/Layaout";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ comicsFile }) {
  return (
    <>
      <Head>
        <title>AppComics</title>
        <meta name="description" content="Page comics XKCD not not official" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        {comicsFile.map((comics) => (
          <Link
            className={styles.container__Comic}
            href={`/comic/${comics.id}`}
            key={comics.id}
          >
            <h3 className={styles.title__Comic}>{comics.title}</h3>
            <Image
              width={comics.width}
              height={comics.height}
              object-fit="contain"
              src={comics.img}
              alt={comics.alt}
            />
            <p>{comics.id}</p>
          </Link>
        ))}
      </div>
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
