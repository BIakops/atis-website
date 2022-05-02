const FooterComponent = () => {
  return (
    // <div className="absolute bottom-0 bg-slate-700 py-2 container w-screen">
    //   <p className="text-center font-Sora font-light text-white align-middle w-fit py-2 px-16">
    //     © 2021. created by Sean Lai, Chloe Lee, Dave Nyugen, and Amonsh Agoklu.
    //     AI responses are not to be heeded as professional advice. The creators
    //     hold no responsibility of the results created by the AI. The creators
    //     have created this site for educational purposes only.
    //   </p>
    // </div>
    <div className="p-4 bg-white shadow md:flex md:items-center  md:justify-between md:p-6 dark:bg-gray-800 w-screen content-end bottom-0">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        2021-2022{" "}
        <a href="https://flowbite.com" className="hover:underline">
          {" "}
          {/* change using Next Link for optimization */}
          Sean Lai, Chloe Lee, Dave Nyugen, and Amonsh Agoklu
        </a>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        {/* <li>
          <a href="#" class="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" class="hover:underline">
            Contact
          </a>
        </li> */}
      </ul>
    </div>
  );
};
export default FooterComponent;
