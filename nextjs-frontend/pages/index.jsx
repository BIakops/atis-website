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
     
     <h1>Our Recent Posts</h1>
      <ul className=" grid grid-auto-rows  text-white gap-2">  
        {posts.map((post) => (
          <li key={post._id} className="bg-gradient-to-r from-cyan-700 to-indigo-300 py-4 px-2">
            
            <Link href="//[id]" as={`/post/${post.slug}`}>

              <a className="ml-1 md:ml-4">{post.title}</a>

            </Link>
            <Link href="/post/[id]" as={`/post/${post.slug}`}>
              <a className="font-Arimo right-0 absolute  mr-1 md:mr-2">read article</a>
            </Link>
          </li>
        ))}
      </ul>

    </motion.div>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
     *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
          _id,        
          title,
          publishedAt,
          "name":author->name,
          mainImage,
          "slug": slug.current,
        }[0...3]
    `);
  return {
    props: {
      posts,
    },
  };
}

export default Index;
