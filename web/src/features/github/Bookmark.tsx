import { useEffect, type FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getAuthToken } from "../../shared/helpers/general-helper";
import { useAppDispatch } from "../../store";
import { Header } from "../pages/partials/Header";
import {
  deleteBookmarkRepository,
  getBookmarkRepositories,
} from "../app/app.actions";

/**
 * Page component.
 *
 * @returns React component.
 */
export const Bookmark: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [repos, setRepos] = useState<any>([]);

  const loadData = useCallback(async () => {
    const response = await dispatch(getBookmarkRepositories());
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

  const handleDeleteBookmark = async (id: string) => {
    await dispatch(deleteBookmarkRepository(id));
    loadData();
    toast("Bookmark deleted");
  };

  return (
    <>
      <Header name="Bookmarks" />
      <div className="relative overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                REPOSITORY NAME
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                GIT
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                CREATED ON
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo: any) => (
              <tr
                key={repo.repositoryId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {repo.repositoryName}
                </td>
                <td className="px-6 py-4">
                  <a
                    href={repo.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Go to Git
                  </a>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {repo.createdAt}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  <button
                    onClick={() => handleDeleteBookmark(repo.repositoryId)}
                  >
                    Delete
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
