import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store";
import { loginUser } from "./auth.actions";
import { setAuthToken } from "../../shared/helpers/general-helper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type LoginUserFormValues = {
  email: string;
  password: string;
};

/**
 * Render login component.
 *
 * @returns Login component.
 */
export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Submit handler function
  const onSubmit: SubmitHandler<LoginUserFormValues> = async (data) => {
    const response = await dispatch(loginUser(data));
    if (response?.access_token) {
      setAuthToken(response.access_token);
      toast("Login Success");
      navigate("/home");
    } else if (response?.message) {
      toast(response?.message);
    } else {
      toast("Something went wrong!");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                {...register("email", { required: "Email is required" })}
                required
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("password", { required: "Password is required" })}
                required
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light dark:text-gray-400">
              Don&apos;t have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
