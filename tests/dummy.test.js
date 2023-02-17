const helper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "3b422aa71b54a496234d17f8",
    title: "Come Here Statement Considered Harmless",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 10,
    __v: 0
  },
  {
    _id: "4c422ja71b54a676143d17f8",
    title: "Go There Statement Considered Harmful",
    author: "Raju W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 2,
    __v: 0
  }
];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
];

test("dummy returns one", () => {
  const result = helper.dummy(blogs);
  expect(result).toBe(1);
});

describe("most blogs of an author", () => {
  test("of only one blog is the author of that blog itself", () => {
    const result = helper.mostBlogs(listWithOneBlog);

    expect(result).toEqual({ author: "Edsger W. Dijkstra", posts: 1 });
  });

  test("of a bunch of blogs is returned correct", () => {
    const result = helper.mostBlogs(blogs);

    expect(result).toEqual({ author: "Edsger W. Dijkstra", posts: 2 });
  });

  test("of a list with no blogs is nil", () => {
    const result = helper.mostBlogs([]);
    expect(result).toEqual({});
  });
});

describe("favourite blog", () => {
  test("for only one blog is itself", () => {
    const result = helper.favouriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5
    });
  });

  test("of  a bunch of blogs is  most liked blog", () => {
    const result = helper.favouriteBlog(blogs);
    expect(result).toEqual({
      title: "Come Here Statement Considered Harmless",
      author: "Edsger W. Dijkstra",
      likes: 10
    });
  });

  test("of a list of empty blogs is empty object", () => {
    const result = helper.favouriteBlog([]);
    expect(result).toEqual({});
  });
});

describe("Author with most number likes", () => {
  test("of only one blog is the author of that blog itself", () => {
    const result = helper.mostLikesByAuthor(listWithOneBlog);

    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 5 });
  });

  test("of a bunch of blogs is returned correct", () => {
    const result = helper.mostLikesByAuthor(blogs);

    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 15 });
  });

  test("of a list with no blogs is nil", () => {
    const result = helper.mostLikesByAuthor([]);
    expect(result).toEqual({});
  });
});

describe("total likes", () => {
  test("of only one post is equal to the likes of that post", () => {
    const result = helper.totalLikes(listWithOneBlog);
    expect(result).toBe(blogs[0].likes);
  });

  test("of a couple of posts is correct", () => {
    const result = helper.totalLikes(blogs);
    expect(result).toBe(17);
  });

  test("of empty list is 0", () => {
    const result = helper.totalLikes([]);
    expect(result).toBe(0);
  });
});
