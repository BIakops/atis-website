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
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const testBlogIcon = ({ posts }, { maxContent = 10 }) => {
  const { width, height } = useWindowDimensions();

  return (
    <ul className="container blogGrid content-end justify-between">
      {posts.length > 0 &&
        posts.map(
          ({ _id, title = "", slug = "", publishedAt = "", mainImage }) =>
            slug &&
            mainImage && (
              <li className="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
                <motion.div
                  key={_id}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    console.log(slug);
                  }}
                  className="blogArticle group"
                >
                  <img
                    src={urlFor(mainImage).url()}
                    className=" rounded-sm outline-slate-200 w-40 h-40 outline-2"
                  />
                  <Link
                    href="/post/[slug]"
                    as={`/post/${slug.current}`}
                    passHref
                  >
                    <a className="font-sora lg:text-bold lg:text-2xl">
                      {title}
                    </a>
                  </Link>{" "}
                  <p>{new Date(publishedAt).toDateString()}</p>
                  <div className="">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="group readArticle"
                    >
                      <Link
                        href="/post/[slug]"
                        as={`/post/${slug.current}`}
                        passHref
                      >
                        <a className="group-hover:opacity-100 text-blue-500 font-Arimo font-semibold">
                          Read Article{" "}
                        </a>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </li>
            )
        )}
    </ul>
  );
};
function createMaxListView({ posts }, { maxContent = 10 }) {
  // Create a lists of posts that are less than or equal to maxContent
  if (posts.length < maxContent) {
    return posts;
  }
  const maxList = posts.slice(0, maxContent);
  return maxList;
}

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
