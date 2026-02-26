import { Post } from "@/types/post";

export default function UserPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Publicaciones del usuario
        </h2>
      </div>

      <div className="p-6">
        {posts.length === 0 ? (
          <p className="text-sm text-gray-500">Este usuario no tiene posts.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                <h3 className="text-sm font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                  {post.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
