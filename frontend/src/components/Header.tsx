import React from "react";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="bg-white border border-gray-200 shadow-md w-full rounded-lg">
      <div className="flex flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            To-do App
          </span>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Header;
