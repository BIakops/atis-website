import Link from "next/link";
import groq from "groq";
import client from "../client";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";

import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Parallax from "../components/Parallax";
import { useState } from "react";
import '../styles/mainpage.module.css';
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
const Index = ({ posts }) => {
  //create a state for the scroll position
  const [scrollY, setScrollY] = useState(0);

  return (
    <motion.div exit={{ opacity: 0 }} className="testParallax">
      {/* create a section where there is only text in the center */}
    
        <section className="text-center bg-slate-700 opacity-50 lg:mt-8 mt-16">
          <motion.div animate={{ rotate: 360 }} layout>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-black leading-tight">
              Content Title #1
            </h1>
          </motion.div>
        </section>
      <Parallax speed={10}><h1>Welcome to a blog!</h1></Parallax>
      
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
