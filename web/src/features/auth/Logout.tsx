import { useEffect, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "../../shared/helpers/general-helper";

/**
 * Render Logout component.
 *
 * @returns Logout component.
 */
export const Logout: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    removeAuthToken();
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      Signing out...
    </section>
  );
};
