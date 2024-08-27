import { useEffect, type FC, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAuthToken } from "../../shared/helpers/general-helper";
import { useAppDispatch } from "../../store";
import { getPublicUsers } from "../app/app.actions";
import { Header } from "../pages/partials/Header";

/**
 * Page component.
 *
 * @returns React component.
 */
export const User: FC = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<any>([]);

  const loadData = useCallback(async () => {
    const response = await dispatch(getPublicUsers(query as string));
    if (response?.items) {
      setUsers(response?.items);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/login");
    } else {
      loadData();
    }
  }, []);

  return (
    <>
      <Header name="Users" />
      <div className="relative overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                PROFILE IMAGE
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                NAME
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <td className="px-6 py-4">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-24 h-24 object-cover rounded-full border border-gray-200 dark:border-gray-600"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {user.login}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
