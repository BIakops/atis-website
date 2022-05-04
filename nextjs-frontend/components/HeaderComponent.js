import Link from "next/link";

const HeaderComponent = () => {
  return (
    <div className="bg-slate-700 w-screen h-14 relative top-0">
      {/* in using sm: md: lg: design mobile before desktop, its mobile priority*/}
      <Link href="/" passHref>
        <a className="headerButtons absolute text-white hover:text-black ">
          ATIS
        </a>
      </Link>
      <button className="headerButtons right-32 md:right-36 lg:right-40">
        AI
      </button>
      <button className="headerButtons right-40 sm:right-40 md:right-48 lg:right-48 xl:right-56">
        About
      </button>
      <Link href="/updates" passHref>
      <a className="headerButtons right-0 ">updates/events</a></Link>
      {/* turn into dropdown at some point*/}
    </div>
  );
};
export default HeaderComponent;
