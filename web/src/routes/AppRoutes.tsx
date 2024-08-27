import { useEffect, type FC } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Login } from "../features/auth/Login";
import { NotFoundPage } from "../features/pages/NotFoundPage";
import { Register } from "../features/auth/Register";
import { Repository } from "../features/github/Repository";
import { User } from "../features/github/User";
import { Logout } from "../features/auth/Logout";
import { Bookmark } from "../features/github/Bookmark";
import { useAppSelector } from "../store";
import { Home } from "../features/home/Home";

/**
 * Component that define all the application routes and its UI (view) component.
 *
 * @returns React component.
 */
export const AppRoutes: FC = () => {
  const navigate = useNavigate();
  const { route } = useAppSelector((store) => store.app);

  useEffect(() => {
    // This useEffect hook only for handling navigation
    // for manual route changes from redux store.
    // Navigate to route when there is changes in the route path.
    if (route) {
      navigate(route.path, { replace: route.replace, state: route.state });
    }

    // Ignore `navigate` func from hook dependency array to prevent
    // multiple calls of `navigate` func.
  }, [route]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="register" element={<Register />} />
      <Route path="home" element={<Home />} />
      <Route path="github/repositories/:query" element={<Repository />} />
      <Route path="github/users/:query" element={<User />} />
      <Route path="bookmarks" element={<Bookmark />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
