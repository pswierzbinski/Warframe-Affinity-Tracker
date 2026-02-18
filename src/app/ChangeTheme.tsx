"use client";
import React from "react";

import { useEffect, useState } from 'react';
import { Button } from "@heroui/react";
export const DarkThemeIcon = ({fill = "currentColor", ...props}) => {
  return (
    <svg
width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd" clipRule="evenodd" d="M10.9866 2.81264C11.1759 3.25273 11.0265 3.76528 10.6304 4.03473C9.04069 5.11602 8 6.93663 8 8.99999C8 12.3137 10.6863 15 14 15C16.9001 15 19.3217 12.9413 19.8791 10.205C19.9749 9.7348 20.3912 9.39893 20.871 9.40466C21.3508 9.4104 21.7589 9.75612 21.8434 10.2285C21.9464 10.8042 22 11.3962 22 12C22 17.5229 17.5229 22 12 22C6.47713 22 2 17.5229 2 12C2 7.21279 5.36283 3.21342 9.85431 2.23097C10.3223 2.1286 10.7972 2.37255 10.9866 2.81264ZM6.51162 6.17934C4.96517 7.6383 4 9.70684 4 12C4 16.4183 7.5817 20 12 20C15.4257 20 18.3485 17.8468 19.4889 14.8199C18.0565 16.1715 16.1254 17 14 17C9.58175 17 6 13.4182 6 8.99999C6 8.00706 6.18101 7.05645 6.51162 6.17934Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const LightThemeIcon = ({fill = "currentColor", ...props}) => {
  return (
    <svg
width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="5" stroke={fill} strokeWidth="1.5"/>
<path d="M12 2V4" stroke={fill} strokeWidth="1.5" strokeLinecap="round"/>
<path d="M12 20V22" stroke={fill} strokeWidth="1.5" strokeLinecap="round"/>
<path d="M4 12L2 12" stroke={fill} strokeWidth="1.5" strokeLinecap="round"/>
<path d="M22 12L20 12" stroke={fill} strokeWidth="1.5" strokeLinecap="round"/>
<path d="M19.7778 4.22266L17.5558 6.25424" stroke={fill} strokeWidth="1.5" strokeLinecap="round"/>
<path d="M4.22217 4.22266L6.44418 6.25424" stroke={fill} strokeWidth="1.5" strokeLinecap="round"/>
<path d="M6.44434 17.5557L4.22211 19.7779" stroke={fill} strokeWidth="1.5" strokeLinecap="round"/>
<path d="M19.7778 19.7773L17.5558 17.5551" stroke={fill} strokeWidth="1.5" strokeLinecap="round" />

    </svg>
  );
};
export default function ChangeTheme() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);
// using replace did not work ):
    const toggleTheme = () => {
        const html = document.documentElement;
        if (theme === "light") {
            html.classList.remove("light");
            html.classList.add("dark");
            setTheme("dark");
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
            setTheme("light");
        }
    };

    return (
        <Button isIconOnly onPress={toggleTheme}>
            {theme === "light" ? <DarkThemeIcon /> : <LightThemeIcon />}
        </Button>
    );
}