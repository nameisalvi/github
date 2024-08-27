import { requestHandler } from "../../shared/handlers/request-handler";
import { AppThunk } from "../../store";

/**
 * Make API call to register user.
 *
 * @param data - Data.
 */
export function registerUser(data: any): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: "/api/user",
        method: "POST",
        data,
      })
    );
  };
}

/**
 * Make API call to login user.
 *
 * @param data - Data.
 */
export function loginUser(data: any): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: "/api/auth/login",
        method: "POST",
        data,
      })
    );
  };
}
