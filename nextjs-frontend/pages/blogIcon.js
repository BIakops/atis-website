import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { LayoutGroup } from "framer-motion";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
export function blogIcon({ posts }) {
  const { _id, title, slug, mainImage, body, author, categories } = posts;
  return (
    <div className="relative" key={_id}>
      <Link href="/posts/[slug]" as={`/post/${slug.current}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-slate-100 relative">
            <article className="w-screen bg-slate-500">
              <Image src={urlFor(mainImage).height(200).width(200).url()} />
              <h1 className="blogHeader">{title}</h1>
              <div className="grid grid-rows-2">
                <h2 className="px-2 row-start-1 rows-end-1">{author}</h2>
              </div>
              <p>{new Date(publishedAt).toDateString()}</p>
              <div className="px-2 w-full"></div>
            </article>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
