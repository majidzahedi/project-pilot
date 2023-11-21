/**
 * یک ماژول که توابعی برای ارتباط با جدول کاربر در پایگاه داده فراهم می‌کند.
 */
import { db } from "@/db";
import { User } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * تمام کاربران را از جدول کاربران بازیابی می‌کند.
 * @returns {Promise<Array<typeof User>>} یک آرایه از اشیاء کاربری که از جدول کاربران بازیابی شده‌اند.
 */
const get = async () => await db.select().from(User);

/**
 * یک کاربر را بر اساس شناسه‌ی آن بازیابی می‌کند.
 * @param {string} id - شناسه‌ی کاربر برای بازیابی.
 * @returns {Promise<typeof User>} یک شیء کاربری که از جدول کاربران بازیابی شده‌است.
 */
const getUserById = async (id: string) =>
  await db.select().from(User).where(eq(User.id, id));

/**
 * یک کاربر را بر اساس ایمیل بازیابی می‌کند.
 * @param {string} email - ایمیل کاربر برای بازیابی.
 * @returns {Promise<typeof User>} یک شیء کاربری که از جدول کاربران بازیابی شده‌است.
 * @throws {Error} اگر کاربر یافت نشود یا چندین کاربر یافت شود.
 */
const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(User).where(eq(User.email, email));
    if (user.length !== 1) throw new Error("کاربر یافت نشد!");
    return user[0];
  } catch (error) {
    console.log("کاربر یافت نشد");
  }
};

type CreateValues = {
  email: string;
  username: string;
  role: string;
  image: string;
};

/**
 * یک کاربر جدید را در جدول کاربران ایجاد می‌کند.
 * @param {CreateValues} values - یک شیء حاوی ایمیل، نام کاربری، نقش و تصویر کاربر برای ایجاد یک کاربر جدید.
 * @returns {Promise<any>} نتیجه‌ی عملیات درج، که ممکن است شامل شناسه‌ی کاربر جدید یا نشانگر دیگری از موفقیت باشد.
 */
const create = async (values: CreateValues): Promise<any> =>
  await db.insert(User).values(values);

export const userService = { get, getUserById, getUserByEmail, create };
