import axios from "axios";
import { useEffect, useState } from "react";
import BlogsContainer from "./BlogsContainer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RiAddBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      axios
        .get("http://localhost:8080/api/blog/myblogs", {
          headers: {
            Authorization: token,
          },
        })
        .then((resp) => {
          setLoading(false);
          setBlogs(resp.data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    fetchMyBlogs();
  }, []);

  return (
    <>
      <div className="flex-grow px-5 sm:px-10 md:px-20 lg:px-28 xl:px-40 py-10">
        <div className="border-b-2 pb-1 mb-1 border-[#1d2b34] flex flex-row justify-between items-end">
          <div className="text-3xl">My Blogs</div>
          <Link
            to="/create"
            className="bg-[#3a4656] text-white rounded px-2 py-1 flex flex-row items-center gap-x-2"
          >
            <RiAddBoxLine className="h-4 w-4" />
            <div>Write a blog</div>
          </Link>
        </div>
        {loading ? <div>Loading...</div> : <BlogsContainer blogList={blogs} />}
      </div>
    </>
  );
};

export default MyBlogs;
