import Link from "next/link";
import React from "react";

export default async function page() {
  try {
    const url = "https://jsonplaceholder.typicode.com/posts";

    const res = await fetch(url);
    const posts = await res.json();

    return (
      <div>
        <h1>Posts</h1>

        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li  className="bg-gray-300 w-fit p-5" key={post.id}>
              <p>{post.title}</p>
              <Link href={`/posts/${post.id}`}>Ver detalles</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    <p>Ocurrio un error al cargar los usuarios</p>;
    <p>{error.message}</p>
  }
}
