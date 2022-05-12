// [slug].js
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../client";
import Layout from "../../components/layout";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import useWindowDimensions from "../../components/useWindowDimensions";
import {useViewportSize} from '@mantine/hooks';
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
import styles from "../../styles/slug.module.css";
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
        />
      );
    },
  },
};

const Post = ({ post }) => {
  const { height, width } = useViewportSize();
  
  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    mainImage,
    body = [],
  } = post;
  console.log(urlFor(mainImage));
  return (
    <
      
    >
      <div
          className="app__flex"
          style={{backgroundImage: urlFor(mainImage)}}
        >
          <h1 className={styles.blogHeader}>{title}</h1>
          {mainImage && (
            <div className="px-2">
              <img
                src={urlFor(mainImage)}
                alt={`title image`}
                height={parseInt(height/4)}
                width={width}
                className={styles.blogImg}
                loading="lazy"
              />
            </div>
          )}
        </div>
        <article className="p-text">
          <PortableText value={body} components={ptComponents}  />
        </article>
      
    </>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage,

  body
}`;
export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
  };
}
Post.getLayout = function getLayout(Post) {
  return (
    <motion.div className="relative"exit={{ opacity: 0 }}
      enter={{ opacity: [0,1] }}
      animate={{ opacity: 1 }}
      transition={{ duration: .5 , ease: "easeInOut",staggerChildren:0.1}}>
      <Layout>
        <main
      >{Post}</main>
      </Layout>
    </motion.div>
  );
};
export default Post;
