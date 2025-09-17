import Image from "next/image";
import React from "react";

import { Button } from "./ui/button";

const SocialsSignIn = () => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button variant="ghost" size="icon" className="size-10 cursor-pointer">
        <Image src="/assets/socials/facebook.svg" width={28} height={28} alt="facebook icon" />
      </Button>

      <Button variant="ghost" size="icon" className="size-10 cursor-pointer">
        <Image
          src="/assets/socials/github.svg"
          width={28}
          height={28}
          alt="github icon"
          className="dark:invert"
        />
      </Button>

      <Button variant="ghost" size="icon" className="size-10 cursor-pointer">
        <Image src="/assets/socials/google.svg" width={28} height={28} alt="google icon" />
      </Button>
    </div>
  );
};

export default SocialsSignIn;
