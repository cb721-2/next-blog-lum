import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";

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

export default function Home() {
  const [user, setUser] = useState<UserProfile>();
  const { push } = useRouter();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (!user.email || !user.password) return;
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    }).then((res) => res.json());
    if (response?.data?.id) {
      push(`/profile/${response.data.id}`);
    }
  }

  return (
    <div className="bg-gradient-to-b from-black via-bg-gray-900 to-purplePrimary h-screen">
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p className="w-full text-white text-xl2 text-center mb-4">
            Super Awesome Blog Site
          </p>
        </section>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <form className="border border-solid border-white rounded-sm bg-gray-900 text-white p-4 w-full md:w-1/2 mx-auto">
            <p className="">Sign In</p>
            <label className="mr-2">Email</label>
            <input
              type="email"
              name="email"
              className="p-1 bg-gray-900 border-b border-solid border-white"
              autoComplete="email"
              onChange={handleInputChange}
            />
            <br />
            <label className="mr-2">Password</label>
            <input
              type="password"
              name="password"
              className="p-1 bg-gray-900 border-b border-solid border-white"
              autoComplete="password"
              onChange={handleInputChange}
            />
            <br />
            <button
              className="border border-solid border-white p-2 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </section>
      </Layout>
    </div>
  );
}
