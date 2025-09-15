"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleChangeTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
      return;
    }

    setTheme("dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={handleChangeTheme} className="cursor-pointer">
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
