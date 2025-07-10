import { Button } from "@heroui/button";
import React from "react";

export default function Login() {
  return (
    <div className="w-full min-h-screen relative">
      <div className="w-full absolute z-30 min-h-screen flex items-center ">
        <Button
          variant="bordered"
          size="lg"
          className="  border-2 absolute bottom-32 left-[25%]"
        >
          login
        </Button>
        <Button
          variant="bordered"
          size="lg"
          className=" absolute bottom-32 left-[58%]"
        >
          sigin
        </Button>
      </div>
      <div className="relative z-0">
        <img
          alt="hello"
          src="/background-k32-gecut.png"
          className=" w-full min-h-screen relative z-0 "
        />
      </div>
    </div>
  );
}
