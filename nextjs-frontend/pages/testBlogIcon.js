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
import useWindowDimensions from "../components/useWindowDimensions";
import styles from '../styles/blogpage.module.css';
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const testBlogIcon = ({ posts }) => {
  const { width, height } = useWindowDimensions();

  return (
    <ul className="container blogGrid content-end justify-between">
      {posts.length > 0 &&
        posts.map(
          ({ _id, title = "", slug = "", publishedAt = "", mainImage }) =>
            slug &&
            mainImage && (
              <li className="bg-slate-200 xl:left-1/2"key={_id}>
                <Link href="/post/[slug]"
                    as={`/post/${slug.current}`}
                    passHref>
                <div className='innerBlog'>
                <img className="articleImg" src={urlFor(mainImage).url()}/>
                <p className= " articleTitle">{title}</p>
                <p className=" articleTitle date">March 12 2022</p>
                <a className={styles.goToBlog}>Read Article</a>
                </div></Link>
              </li>
            )
        )}
    </ul>
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
export default testBlogIcon;
