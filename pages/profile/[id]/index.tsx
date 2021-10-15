import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import Layout, { siteTitle } from "../../../components/layout";
import utilStyles from "../../../styles/utils.module.scss";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const prisma = new PrismaClient();
  const userProfile = await prisma.user.findUnique({
    where: {
      id: parseInt(context.query.id),
    },
    include: {
      posts: true,
      profile: true,
    },
  });

  return {
    props: {
      userProfile,
    },
  };
};

interface Post {
  id: number;
  title: string;
  content?: string;
  date: string;
}

interface Profile {
  id: number;
  bio?: string;
  user: UserProfile;
  userId: number;
}

interface UserProfile {
  id?: number;
  email: string;
  password: string;
  name?: string;
  posts?: Post[];
  profile?: Profile;
}

export default function Profile({ userProfile }: { userProfile: UserProfile }) {
  return (
    <Layout home name={userProfile.name}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className="text-blue-500">{userProfile.profile?.bio}</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {userProfile.posts?.map(({ id, date, title }) => (
            <li
              className={
                utilStyles.listItem + " cursor-pointer grid grid-cols-2"
              }
              key={id}
            >
              <Link href={`/post/${id}`}>{title}</Link>
              <time className="text-gray-a4a4a4">{date}</time>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
