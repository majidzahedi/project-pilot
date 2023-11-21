import { userService } from "@/services/user-service";
import { revalidatePath } from "next/cache";

export default async function TestPage() {
  const users = await userService.get();

  async function addUser() {
    "use server";
    await userService.create({
      email: "majidzahedi@gmail.com",
      image: "someplace.net",
      role: "2",
      username: "majid",
    });
    revalidatePath("/");
  }

  return (
    <div className="container">
      <form action={addUser}>
        <button>adduser</button>
      </form>
      {JSON.stringify(users)}
    </div>
  );
}
