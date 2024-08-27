import { useEffect, type FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { getAuthToken } from "../../shared/helpers/general-helper";
import { useNavigate } from "react-router-dom";
import { Header } from "../pages/partials/Header";
import { BookmarkGraph } from "./BookmarkGraph";
import { CsvImporter } from "./CsvImporter";

/**
 * Page component for Home route.
 *
 * @returns React component.
 */
export const Home: FC = () => {
  const navigate = useNavigate();

  const [searchtype, setSearchType] = useState<string>("repositories");

  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/login");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<any>();

  // Submit handler function
  const onSubmit: SubmitHandler<any> = async (data) => {
    if (searchtype === "repositories") {
      navigate(`/github/repositories/${data.query}`);
    } else if (searchtype === "users") {
      navigate(`/github/users/${data.query}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header Section */}
        <Header name="Home" />
        <CsvImporter />

        {/* Main Content Section */}
        <div className="w-full bg-gray-100 flex flex-col items-center justify-center">
          {/* Container for Graph and Form */}
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6 py-8">
            {/* Left Side: Graph */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Bookmarks Over Time
              </h2>
              <BookmarkGraph />
            </div>

            {/* Right Side: Search Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Search
              </h2>
              <section className="w-full">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-4"
                >
                  {/* Dropdown for Type */}
                  <div className="relative">
                    <select
                      id="type"
                      onChange={(e) => setSearchType(e?.target?.value)}
                      className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="repositories" selected>
                        Repositories
                      </option>
                      <option value="users">Users</option>
                    </select>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search..."
                      {...register("query")}
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 bottom-2.5 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
