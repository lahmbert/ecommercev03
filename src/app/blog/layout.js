'use client';

import { BlogProvider } from '../Context/BlogContext'; // Import the BlogProvider

export default function BlogLayout({ children }) {
  return (
    <BlogProvider>
      <div>{children}</div>
    </BlogProvider>
  );
}
