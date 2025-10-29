import React from "react";

export default async function PostPage({ params }) {
  const { id } = await params; // Unwrap the Promise here with await
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }

    const post = await res.json();

    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <p>Ocurrió un error al cargar el post</p>
        <p>{error.message}</p>
      </div>
    );
  }
}
