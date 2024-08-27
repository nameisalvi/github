import { useEffect, type FC, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { getAuthToken } from "../../shared/helpers/general-helper";
import { useAppDispatch } from "../../store";
import {
  bookmarkRepositories,
  getUserPublicRepositories,
} from "../app/app.actions";
import { Header } from "../pages/partials/Header";

/**
 * Repository component.
 *
 * @returns React component.
 */
export const UserRepository: FC = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [repos, setRepos] = useState<any>([]);

  const loadData = useCallback(async () => {
    const response = await dispatch(getUserPublicRepositories(query as string));
    if (response) {
      setRepos(response);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/login");
    } else {
      loadData();
    }
  }, []);

  const handleBookmark = async (data: any) => {
    const bookmarkResponse = await dispatch(bookmarkRepositories(data));
    if (bookmarkResponse?.message) {
      toast(bookmarkResponse.message);
    } else {
      toast("Bookmark added");
    }
  };

  return (
    <>
      <Header name="User Repositories" />
      <div className="relative overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                REPOSITORY NAME
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                ACTION
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                BOOKMARK
              </th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo: any) => (
              <tr
                key={repo.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {repo.full_name}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Go to Git
                  </a>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleBookmark({
                        repositoryId: repo.id,
                        repositoryName: repo.full_name,
                        repositoryUrl: repo.html_url,
                      })
                    }
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <StarIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
