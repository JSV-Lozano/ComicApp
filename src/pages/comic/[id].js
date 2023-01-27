import { readFile, stat, readdir } from "fs/promises";
import { basename } from "path";
import { useRouter } from "next/router";
import { Layaout } from "@components/Layaout";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "@styles/ComicId.module.css";

export default function ComicId({
  title,
  width,
  height,
  alt,
  img,
  nextId,
  prevId,
  hasPrevious,
  hasNext,
}) {
  const route = useRouter();
  const { id } = route.query;
  return (
    <>
      <Head>
        <title>{`Appcomics||Comic:${id}`}</title>
        <meta name="description" content="Page comics XKCD not not official" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!title ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.main}>
          <p>ID= {id}</p>
          <section className={styles.comic__Info}>
            <h2>{title}</h2>
            <Image width={width} height={height} src={img} alt={alt} />
            <p>{alt}</p>
            <div className={styles.Pagination}>
              {hasPrevious && <Link href={`${prevId}`}>Previous</Link>}
              {hasNext && <Link href={`${nextId}`}>Next</Link>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const files = await readdir("./comics");
  const paths = files.map((file) => {
    const id = basename(file, ".json");
    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf-8");
  const comic = JSON.parse(content);

  const idNumber = +id;
  const nextId = idNumber + 1;
  const prevId = idNumber - 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${nextId}.json`),
    stat(`./comics/${prevId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      nextId,
      prevId,
      hasPrevious,
      hasNext,
    },
  };
}
