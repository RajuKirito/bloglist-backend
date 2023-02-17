const _ = require("lodash");

const dummy = (blogs) => {
  return 1 || blogs * 0;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((like, blog) => like + blog.likes, 0);

  return likes;
};

/*
The logic of this function is really simple
 -What we are doing is first filtering the blogs array so that 
 it only stores the next blog in the array only if it's likes 
 are greater than the one blog before it
 - By doing this we will get a list of blogs which have likes in 
 ascending order (think about this)
 -Then we are using array.prototype.pop() method to get the last 
 element of the new array (newBlogs) in our case
 - That element will have the highest likes
 */
const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  let likes = 0;
  const mostBlogs = blogs.filter((blog) => {
    if (blog.likes > likes) {
      likes = blog.likes;
      return true;
    }
    false;
  });

  const mostLiked = mostBlogs.pop();

  const result = {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  };
  return result;
};

/*Lodash library is extensively used. Refer https://lodash.com/docs/4.17.15 for more
 - First we are using _.groupBy method of lodash to group each author by their blogposts (in blogsByAuthor)
 - Then we are using blogsByAuthor and creating a new array consisting of each author any number of posts they made
 - Then we are using _.maxBy to find the author with maximum number of posts  
*/
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const blogsByAuthor = _.groupBy(blogs, (blog) => {
    return blog.author;
  });

  const authorPosts = _.map(blogsByAuthor, (blogs, author) => {
    return {
      author: author,
      posts: _.size(blogs)
    };
  });

  const maxAuthor = _.maxBy(authorPosts, (author) => author.posts);

  return maxAuthor;
};

/*Lodash library is extensively used. Refer https://lodash.com/docs/4.17.15 for more
 - First we are using _.groupBy method of lodash to group each author by their blogposts (in blogsByAuthor)
 - Then we are using blogsByAuthor and creating a new array consisting of each author and the total number of likes they received
 - Then we are using _.maxBy to find the author with maximum number of likes  
*/
const mostLikesByAuthor = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const blogsByAuthor = _.groupBy(blogs, (blog) => {
    return blog.author;
  });

  const authorPosts = _.map(blogsByAuthor, (blogs, author) => {
    return {
      author: author,
      likes: _.sumBy(blogs, (blog) => blog.likes)
    };
  });

  const maxAuthor = _.maxBy(authorPosts, (author) => author.likes);

  return maxAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikesByAuthor
};
