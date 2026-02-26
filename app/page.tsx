import { getUsers } from "@/lib/userService";
import UserDashboard from "../components/UserDashboard";

export default async function HomePage() {
  const users = await getUsers();

  return <UserDashboard initialUsers={users} />;
}
