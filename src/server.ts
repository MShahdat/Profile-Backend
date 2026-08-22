import app from "./app";
import config from "./config/env";
import { prisma } from "./lib/prisma";
import { seedSuperAdmin } from "./utility/seed";


const port = config.port ?? 3000;

const main = async () => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    await prisma.$connect();
    console.log('database connect successfully');
    await seedSuperAdmin();
  }
  catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1)
  }
}



main()