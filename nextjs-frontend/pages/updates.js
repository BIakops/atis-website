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
import styles from '../styles/blogpage.module.scss';
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const updates = ({ posts }) => {
  const { height,width } = useWindowDimensions();

  return (
    <ul className={`${styles.app__profiles} app__container`}>
      {posts.length > 0 &&
        posts.map(
          ({ _id, title = "", slug = "", publishedAt = "", mainImage, name = ""}) =>
            slug &&
            mainImage && (
              <Link key={_id} href="/post/[slug]" as={`/post/${slug}`}>
              <motion.div
          
          whileHover={{scale:[1,1.05]}}
          transition={{duration:0.2,ease:"easeInOut"}}
          className={styles.app__profileitem}
          >
            
            <img src={urlFor(mainImage).url()} alt={title}/>
            <h3 className='bold-text' style={{marginTop:20}}>{title}</h3>
            <p className='p-text' style={{marginTop:10}}>by {name}</p>



          </motion.div></Link>
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
export default updates;
