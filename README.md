This is the exercise of Part 4 from https://fullstackopen.com/en/#course-contents
For more explanation refer to https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#project-structure

Most of the code is explained in the comments itself. This is only a high level overveiw

Flow of the Project

The directory structure of project
├── index.js
├── app.js
├── controllers
│ └── blogs.js
├── models
│ └── blog.js
├── package-lock.json
├── package.json
├── utils
│ ├── config.js
│ ├── logger.js
│ └── middleware.js

/models - has all the schemas of documents we use

- blog.js - has schema of blog including .set('toJSON') method

/controllers - has all the event handlers for a given route

- blog.js - has functionality for blogRouter

/utils - has all auxillary stuff needed

- list_helper.js - has dummy function for test practicing along with other functions we use
  (totalLikes, favouriteBlog, mostBlogs, mostLikesByAuthor)

/tests - has all unit tests

- dummy.test.js - test for (dummy, totalLikes, favouriteBlog, mostBlogs, mostLikesByAuthor) in list_helper
- blog_api.test.js - tests for our blog api (explanation in theory of part 4)

Dependencies used

- cors - used for CORS policy. Refer documentation for more info
- dotenv - required to create an environment. .env can't be used without this
- lodash - makes working with arrays and strings easy. Refer https://lodash.com/ for more details

DevDependencies used

- nodemon - used to auto restart server whenever there are file changes
- eslint - used for linting. Initialize by npx eslint --init and follow steps. eslintignore for ignoring files for which eslint is not to be applied
- jest - testing stuff
