import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogsPost = () => {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      axios
        .get(`http://localhost:8080/api/blog/blog_id=${slug}`)
        .then((resp) => {
          console.log(resp.data);
          setBlogData(resp.data);
        })
        .catch((e) => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchBlog();
  }, []);

  return (
    <div className="flex-grow px-5 sm:px-10 md:px-20 lg:px-28 xl:px-40 py-10 flex flex-col gap-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <div className="text-4xl font-black">{blogData.title}</div>
          </div>
          <div className="w-full flex justify-center">
            <img className="w-[1000px]" src={blogData.imageUrl} />
          </div>
          <div>
            <div>{blogData.content}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogsPost;
