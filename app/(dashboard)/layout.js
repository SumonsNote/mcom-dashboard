import { auth } from "@/auth";
import "../globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Next gen Admin Dashboard",
};

const RootLayout = async ({ children }) => {
  const session = await auth();
  //console.log(session);
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dwe6gs8sp/image/upload/v1734704694/ecom_nrtlmo.png"
          sizes="any"
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
