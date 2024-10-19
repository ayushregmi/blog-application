import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { loggedIn, user } = useSelector((state) => state.user);

  return (
    <div className="sticky z-50 top-0 bg-[#1d2b34] text-gray-100 flex items-center justify-between px-2 xs:px-6 sm:px-12 xl:px-16 2xl:px-20 py-1 sm:py-3">
      <div className="flex flex-row items-center sm:gap-x-8 md:gap-x-12 lg:gap-x-16 xl:gap-x-20">
        <div className="text-lg sm:text-xl md:text-3xl xl:text-4xl">
          Blogs Website
        </div>
        <Link
          to={"/home"}
          className="hover:bg-[#3a4656] px-2 sm:px-5 py-2 rounded-xl transition duration-400 text-[0.8rem] sm:text-sm md:text-lg"
        >
          Home
        </Link>
        {loggedIn && (
          <>
            <Link
              to={"/myblogs"}
              className="hover:bg-[#3a4656] px-2 sm:px-5 py-2 rounded-xl transition duration-400 text-[0.8em] sm:text-sm md:text-lg"
            >
              My Blogs
            </Link>
          </>
        )}
      </div>
      <div>
        {loggedIn ? (
          <button className="rounded-full overflow-hidden h-8 w-8 sm:h-12 sm:w-12 border-black hover:scale-110 transition flex h-full items-center">
            <img className="object-cover h-full w-full" src={user.profileUrl} />
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-[#3a4656] px-5 py-3 rounded-full hover:scale-105 transition duration-400 font-Roboto"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
