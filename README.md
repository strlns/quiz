# What is this?

This was/is planned to be an app to allow users to create, edit, persist, share and play a quiz / quizzes.

Currently, only loading demo quiz questions from [here](https://opentdb.com/) fully works.
Login and persistence of quiz questions and game states are also already possible, but because there
is no UI to create quizzes, this is only possible with the demo questions as of now.
Also, everything is kind of ugly :D

## next-auth

[next-auth](https://next-auth.js.org/) is used for authentication in this project. Login via "Magic Link" is already possible when entering suitable credentials for an e-mail server in `.env`.

The accounts are also persisted in a MySQL database, but every signup needs to be confirmed separately via E-mail, despite the account being persisted.

Google as a sign-in provider is enabled in the code,
but not enabled in the Google account linked to the deployed `<SUPER_SECRET_URL>`.
Important note: next-auth is not compatible with HTTP-Basic-Authentication out of the box, or I haven't found out yet how to do that.

## Custom `server.js` and `start` command

To make this work on a shared hosting with Plesk, this uses a custom server.

This is **not recommended** for a first-time next.js project according to documentation,
and it has plenty of drawbacks.

Normally, we'd use the `next start` command as provided by next.js.

See https://nextjs.org/docs/advanced-features/custom-server

---

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited
in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated
as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
