This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

1. Setup emulator
    - Cần setup java version từ 7 trở lên
    - Install firebase-tool: npm install -g firebase-tools
    - Login vào tài khoản được share access vào project: firebase login
    - Init firebase: firebase init (project chỉ sử dụng authticate và firestore => chỉ chọn 2 phần này, setup port UI: 9000, Auth: 9001, Firestore: 9002)
    - Start emulator: npx firebase emulators:start

2. Multiple languages
    - File i18n.config.js dùng để cấu hình ngôn ngữ. Nếu muốn thêm ngôn ngữ nào thì sửa trong file này
    - Khi thêm một ngôn ngữ mới thì phải sửa lại logic trong file /hooks/useTrans.js
    - Folder public/lang là nơi chứa những file dịch. Khi thêm một ngôn ngữ thì cần thêm một file dịch trong folder này, và import file đó vào file public/lang/index.js
