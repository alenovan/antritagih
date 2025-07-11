"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme: mode } = useTheme();
  return (
    <div>
      <Image
        src="/logo.png"
        alt="logo"
        width={1024}
        height={1024}
        className="w-20 h-20"
      />
    </div>
  );
};

export default Logo;
