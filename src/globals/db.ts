import { PrismaClient } from "@prisma/client";

/*
See
https://github.com/prisma/prisma/issues/6219
and
https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#solution

The official solution (without checking `window`)
led to unexpected problems despite only using prisma in getServerSideProps and API routes.
 */

let prisma: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    // @ts-ignore
    if (!global.prisma) {
      // @ts-ignore
      global.prisma = new PrismaClient();
    }
    // @ts-ignore
    prisma = global.prisma;
  }
}

// @ts-ignore
export default prisma;
