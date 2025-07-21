'use client';

import { useEffect, useState } from 'react';
import Blogs from './blogs';

export default function BlogsServer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load posts:', err);
      }
    }

    fetchPosts();
  }, []);

  return <Blogs blogPosts={posts} />;
}
