import Link from "next/link";
import groq from "groq";
import client from "../client";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { blogIcon } from "./blogIcon";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Parallax from "../components/Parallax";
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
const Index = ({ posts }) => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      {/* create a section where there is only text in the center */}
      <Parallax offset={100} damping={20}>
        <section className="text-center bg-slate-700 opacity-50 lg:mt-8 mt-16">
          <motion.div animate={{ rotate: 360 }} layout>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-black leading-tight">
              Content Title #1
            </h1>
          </motion.div>
        </section>
      </Parallax>
      <h1>Welcome to a blog!</h1>
      <testBlogIcon posts={posts} />
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
