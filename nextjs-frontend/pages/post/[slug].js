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
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

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
  const { height, width } = useWindowDimensions();
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
    <motion.div
      className=" w-screen bg-slate-200 h-fit  bg-fixed bg-center bg-repeat-y top-0 left-0"
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4 }}
    >
      <article className="">
        <div
          className="imgBG"
          style={{ backgroundImage: urlFor(mainImage).url() }}
        >
          <h1 className="blogHeader">{title}</h1>
          {mainImage && (
            <div className="px-2">
              <img
                src={urlFor(mainImage).size(1920, 200).url()}
                alt={`${name}'s picture`}
                className=""
              />
            </div>
          )}
        </div>
        <div className="mx-6 sm:mx-12">
          <div>
            {categories && (
              <span>
                Posted in
                {categories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </span>
            )}
            {authorImage && (
              <div className="outline-6 outline-black outline-offest-4 float-left p-2">
                <img
                  src={urlFor(authorImage).width(250).height(250).url()}
                  alt={`${name}'s picture`}
                  className="rounded-full bg-white outline-slate-100 outline-8"
                />
                <span className=" text-xl font-medium">By {name}</span>
              </div>
            )}
          </div>
          <PortableText
            value={body}
            components={ptComponents}
            className="justify-text text-justify"
          />
        </div>
      </article>
    </motion.div>
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
    <div className="relative">
      <Layout>
        <NestedLayout>{Post}</NestedLayout>
      </Layout>
    </div>
  );
};
export default Post;
