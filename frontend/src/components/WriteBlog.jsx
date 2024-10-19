import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const { token } = useSelector((state) => state.user);
  //   console.log(token);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post(
        `http://localhost:8080/api/blog/create`,
        { title, imageUrl, content },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((resp) => {
        toast.success("Blog creatd");
        navigate("/myblogs");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="flex-grow px-5 sm:px-10 md:px-20 lg:px-28 xl:px-40 py-10">
        <div className="text-3xl border-b-2 pb-1 mb-1 border-[#1d2b34]">
          Write a blog
        </div>
        <div className="flex justify-center">
          <div className="w-[450px] sm:w-[550px] md:w-[700px] lg:w-[800px] xl:w-[1000px] flex flex-col gap-y-5">
            <div>
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="w-full px-1 shadow-lg rounded h-8 outline-none hover:shadow-xl focus:shadow-xl"
              />
            </div>
            <div>
              <label>Image url</label>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type="text"
                className="w-full px-1 shadow-lg rounded h-8 outline-none hover:shadow-xl focus:shadow-xl"
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[300px] p-2 shadow-lg outline-none rounded-xl hover:shadow-xl focus:shadow-xl"
              />
            </div>
            <div className="px-4 flex justify-end">
              <button
                className="hover:bg-[#3a4656] bg-[#1a4359] text-white px-5 py-3 rounded-xl transition duration-400"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteBlog;
