import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hi-Tech Smart Solution",
  description: "Dashcode is a popular dashboard template.",
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
