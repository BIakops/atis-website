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
  const { height,width } = useWindowDimensions();

  return (
    <ul className={styles.blogList}>
      {posts.length > 0 &&
        posts.map(
          ({ _id, title = "", slug = "", publishedAt = "", mainImage, name = ""}) =>
            slug &&
            mainImage && (
              <motion.li className="blogArticleExterior"key={_id} whileHover={{scale:1.05}}>
                <Link href="/post/[slug]"
                    as={`/post/${slug}`}
                    passHref>
                <div className={styles.innerBlog}>
                <img className={styles.articleImg} src={urlFor(mainImage).url()}/>
                <p className= {styles.articleTitle}>{title} by {name}</p>
                
                <p className={styles.date}>{new Date(publishedAt).toDateString()}</p>
                <motion.div className={styles.goToBlog} whileHover={{scale:1.05}}>
                <a >Read Article</a>
                </motion.div>
                </div>
                </Link>
              </motion.li>
            )
        )}
    </ul>
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
        }
      `);
  return {
    props: {
      posts,
    },
  };
}
export default testBlogIcon;
