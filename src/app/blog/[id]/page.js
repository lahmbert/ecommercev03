'use client';

import { useBlog } from '@/app/Context/BlogContext';
import { useParams } from 'next/navigation'; // For dynamic routes

const BlogPost = () => {
  const { id } = useParams(); // Get the dynamic id from the URL
  const { posts } = useBlog(); // Access the global posts data
  const post = posts.find((post) => post.id.toString() === id);

  if (!post) {
    return <div>Loading...</div>; // Show loading while fetching the post
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
        <div className="mt-4 text-gray-700">{post.content}</div>
      </div>
    </div>
  );
};

export default BlogPost;
