import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import Layout from "../../../components/layout";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const prisma = new PrismaClient();
  const singlePost = await prisma.post.findUnique({
    where: {
      id: parseInt(context.query.id),
    },
  });

  return {
    props: {
      post: singlePost,
    },
  };
};

interface Post {
  id: number;
  title: string;
  content?: string;
  date: string;
}

export default function Post({ post }: { post: Post }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="w-60 h-auto p-4 border-solid border border-gray-400 rounded bg-white shadow-sm mx-auto">
        <p className="text-black text-lg font-bold capitalize text-center">{post.title}</p>
        <p className="text-black text-base">{post.content}</p>
        <p className="text-gray-300 text-sm text-center">
          {post.date}
        </p>
      </div>
    </Layout>
  );
}
