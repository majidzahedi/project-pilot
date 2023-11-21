import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const User = sqliteTable("User", {
  id: text("id")
    .primaryKey()
    .default(`${Math.floor(Math.random() * 1000)}`),
  username: text("username"),
  email: text("email").unique(),
  role: text("role"),
  image: text("image"),
  // Assuming a foreign key relationship in Drizzle
  // projects: text("projects").foreignKey("Project.id"),
});

// export const Project = sqliteTable("Project", {
//   id: text("id").primaryKey(),
//   name: text("name"),
//   description: text("description"),
//   deadline: text("deadline"),
//   manager: text("manager").foreignKey("User.id"),
//   tasks: text("tasks").foreignKey("Task.id"),
//   members: text("members").foreignKey("User.id"),
// });

// export const Task = sqliteTable("Task", {
//   id: text("id").primaryKey(),
//   title: text("title"),
//   description: text("description"),
//   status: text("status"),
//   project: text("project").foreignKey("Project.id"),
//   assignedTo: text("assignedTo").foreignKey("User.id"),
//   comments: text("comments").foreignKey("Comment.id"),
// });

// export const Comment = sqliteTable("Comment", {
//   id: text("id").primaryKey(),
//   text: text("text"),
//   task: text("task").foreignKey("Task.id"),
//   author: text("author").foreignKey("User.id"),
// });
