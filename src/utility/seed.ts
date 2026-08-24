import config from "../config/env";
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt'


export const seedSuperAdmin = async () => {
  try {
    const existSuperAdmin = await prisma.admin.findFirst({
      where: { role: "SUPER_ADMIN" },
    });

    if (existSuperAdmin) {
      console.log("super admin already exists");
      return;
    }

    const name = config.super_admin_name;
    const email = config.super_admin_email;
    const password = config.super_admin_password;

    if (!name || !email || !password) {
      throw new Error("no super admin name, email, password");
    }

    const hasPass = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const superAdmi = await prisma.admin.create({
      data: {
        name,
        email,
        password: hasPass,
        role: "SUPER_ADMIN"
      },
      omit: {
        password: true
      }
    });

    console.log("super admin created", superAdmi);
  }
  catch (error) {
    console.log("error", error);
    await prisma.admin.delete({
      where: { email: config.super_admin_email },
    });
  }
};