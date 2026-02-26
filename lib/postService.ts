import api from "@/lib/api";
import { Post } from "@/types/post";

export async function getPostsByUserId(userId: number): Promise<Post[]> {
  const { data } = await api.get<Post[]>("/posts", { params: { userId } });
  return data;
}
