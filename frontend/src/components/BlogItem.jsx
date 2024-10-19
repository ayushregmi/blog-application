import { Link } from "react-router-dom";

const BlogItem = ({ blog }) => {
  const { imageUrl, title, content, author, blogId } = blog;

  const { username, profileUrl } = author;

  return (
    <Link
      to={`/blog/${blogId}`}
      className="w-full rounded-xl overflow-hidden bg-white group shadow-lg hover:shadow-xl  transition duration-400 flex flex-col"
    >
      <div className="w-full h-32 sm:h-40 xl:h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition duration-400"
          src={imageUrl}
        />
      </div>
      <div className="px-4 py-2 flex flex-col justify-between flex-grow">
        <div>
          <div className="text-lg xl:text-xl line-clamp-1">{title}</div>
          <div className="line-clamp-2 text-xs xl:text-sm">{content}</div>
        </div>
        <div className="w-full flex flex-row justify-between pt-5 lg:pt-7 xl:pt-10 pb-5 itens-center ">
          <div className="text-gray-500 text-[0.7rem] lg:text-sm xl:text-base flex items-center">
            by {username}
          </div>
          <img
            className="h-4 w-4 sm:h-6 sm:w-6 xl:h-8 xl:w-8 rounded-full"
            src={profileUrl}
          />
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
