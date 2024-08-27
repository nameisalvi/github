import { FC } from "react";

type HeaderProps = {
  name: string;
};

export const Header: FC<HeaderProps> = ({ name }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">{name}</div>
        <div className="flex items-center space-x-4">
          <a href="/home" className="hover:text-gray-400">
            Home
          </a>
          <a href="/bookmarks" className="hover:text-gray-400">
            Bookmarks
          </a>
          <a href="/logout" color="light">
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};
