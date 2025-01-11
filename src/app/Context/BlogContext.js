'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

const BlogContext = createContext();

export const useBlog = () => {
  return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching posts
    const fetchPosts = async () => {
      const fetchedPosts = [
        {
          id: 1,
          title: 'Understanding React Hooks',
          content: 'An introductory guide to React hooks.',
          date: 'January 10, 2025',
          author: 'John Doe',
        },
        {
          id: 2,
          title: 'Mastering TailwindCSS',
          content: 'Learn how to design responsive layouts using TailwindCSS.',
          date: 'January 5, 2025',
          author: 'Jane Smith',
        },
        {
          id: 3,
          title: 'The Future of Web Development',
          content: 'A look into the evolving web development technologies.',
          date: 'December 20, 2024',
          author: 'Sam Green',
        },
      ];
      setPosts(fetchedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider value={{ posts, loading }}>
      {children}
    </BlogContext.Provider>
  );
};
