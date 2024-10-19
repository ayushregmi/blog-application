import { useEffect, useState } from "react";
import BlogsContainer from "./BlogsContainer";
import { BlogsDummy } from "../data/BlogsDummy";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState(BlogsDummy);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      axios.get("http://localhost:8080/api/blog/all").then((resp) => {
        setLoading(false);
        setBlogs(resp.data);
      });
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="flex-grow px-5 sm:px-10 md:px-20 lg:px-28 xl:px-40 py-10">
        <div className="text-3xl border-b-2 pb-1 mb-1 border-[#1d2b34]">
          All Blogs
        </div>
        {loading ? <div>Loading...</div> : <BlogsContainer blogList={blogs} />}
      </div>
    </>
  );
};

export default Home;
