import "tailwindcss/tailwind.css";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import randomWords from "random-words";

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();
  const today = new Date();
  await prisma.post.create({
    data: {
      title: randomWords(5).join(" "),
      content: randomWords(Math.floor(Math.random() * 100) + 1).join(" "),
      date: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
    },
  });
  const allPostsData = await prisma.post.findMany();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string | Date;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className="text-blue-500">[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem + " cursor-pointer"} key={id}>
              <Link href={`/post/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
