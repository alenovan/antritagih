import Image from "next/image";
import React from "react";

type IconProps = React.HTMLAttributes<SVGElement>;

const DashCodeLogo = (props: IconProps) => {
  return (
    <>
      <Image
        src="/logo.png"
        alt="logo"
        width={1024}
        height={1024}
        className="w-20 h-20"
      />
    </>
  );
};

export default DashCodeLogo;
