import Link from "next/link";
import groq from "groq";
import client from "../client";
import { motion } from "framer-motion";
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
      {posts.length > 0 &&
        posts.map(
          ({ _id, title = "", slug = "", publishedAt = "" }) =>
            slug && (
              <li key={_id}>
                <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                  <a>{title}</a>
                </Link>{" "}
                ({new Date(publishedAt).toDateString()})
              </li>
            )
        )}
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
