import { getUserById } from "@/lib/userService";
import Link from "next/link";
import { notFound } from "next/navigation";
import UserDetail from "@/components/UserDetail";
import {getPostsByUserId} from "@/lib/postService";
import UserPosts from "@/components/UserPosts";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }

  let user;
  let posts;
  try {
    user = await getUserById(numericId);
    posts = await getPostsByUserId(numericId);
  } catch {
    notFound();
  }

  return (
    <>
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Volver al listado
        </Link>
      </div>
      <UserDetail user={user} />
      <UserPosts posts={posts} />
    </>
  );
}
