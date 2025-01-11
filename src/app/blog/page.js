'use client';

import { useRouter } from 'next/navigation';
import { useBlog } from '../Context/BlogContext'; // Import the context

const Blog = () => {
  const router = useRouter();
  const { posts, loading } = useBlog(); // Use the context to get the posts data

  // Navigate to the individual blog post when clicked
  const navigateToPost = (id) => {
    router.push(`/blog/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Blog</h1>
        <p className="text-gray-500">
          Insights and articles on web development, design, and more.
        </p>
      </header>

      {/* Blog Posts */}
      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              <span className="font-medium">{post.author}</span> | {post.date}
            </p>
            <p className="text-gray-700 mt-4">{post.excerpt}</p>
            <button
              onClick={() => navigateToPost(post.id)} // Navigate to /blog/[id]
              className="text-blue-500 hover:text-blue-600 mt-4 inline-block"
            >
              Read more →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
