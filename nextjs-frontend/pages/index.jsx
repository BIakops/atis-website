import Link from "next/link";
import groq from "groq";
import client from "../client";
import { motion } from "framer-motion";
import { blogIcon } from "./blogIcon";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
const Index = ({ posts }) => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      {/* create a section where there is only text in the center */}
      <section className="text-center">
        <motion.div animate={{ rotate: 360 }}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
            some text stuff
          </h1>
        </motion.div>
      </section>

      <h1>Welcome to a blog!</h1>
      <ul className="content-center flex">
        {posts.length > 0 &&
          posts.map(
            ({ _id, title = "", slug = "", publishedAt = "", mainImage }) =>
              slug &&
              mainImage && (
                <motion.div
                  key={_id}
                  className="bg-slate-100 text-center text-slate-900 p-4 w-60 h-60 rounded-lg m-4 group"
                >
                  <img
                    src={urlFor(mainImage).url()}
                    className=" rounded-sm outline-slate-200 outline-2"
                  />
                  <Link
                    href="/post/[slug]"
                    as={`/post/${slug.current}`}
                    passHref
                  >
                    <a>{title}</a>
                  </Link>{" "}
                  {new Date(publishedAt).toDateString()}
                  <br></br>
                  <Link
                    href="/post/[slug]"
                    as={`/post/${slug.current}`}
                    passHref
                  >
                    <a className="rounded-md bg-slate-100" p-2>
                      Read Article{" "}
                    </a>
                  </Link>
                </motion.div>
              )
          )}
      </ul>

      <Link href="/test">
        <a>Test</a>
      </Link>
    </motion.div>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `);
  return {
    props: {
      posts,
    },
  };
}

export default Index;
