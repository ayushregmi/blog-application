import BlogItem from "./BlogItem";

const BlogsContainer = ({ blogList }) => {
  return (
    <div className="px-2 sm:px-5 md:px-10 pt-5 sm:pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-3 gap-y-5 lg:gap-x-5">
        {blogList.map((blog, index) => (
          <BlogItem blog={blog} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogsContainer;
