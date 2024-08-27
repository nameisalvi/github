/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, HttpStatusCode } from "axios";
import type { Method, RawAxiosRequestHeaders, AxiosResponse } from "axios";

import { getAuthToken } from "../helpers/general-helper";
import { toast } from "react-toastify";
import { AppThunk } from "../../store";
import { setRoute } from "../../features/app/app.slice";

interface IRequestOptions {
  /**
   * URL HTTP Request.
   */
  url: string;
  /**
   * HTTP Request Method.
   * Default value is GET.
   */
  method?: Method;
  /**
   * HTTP Headers that is to be passed to Backend.
   */
  headers?: RawAxiosRequestHeaders;
  /**
   * Whether toast message should be shown after the http request.
   * Default is false.
   */
  showToast?: boolean;
  /**
   * HTTP request body.
   */
  data?: any;
  /**
   * HTTP request params (query string)
   */
  params?: any;
  /**
   * Whether or not need to failure page when request failed.
   * Default is true.
   */
  redirectOnFailure?: boolean;
}

/**
 * Send HTTP request.
 *
 * @param options - HTTP request options.
 * @returns HTTP Response.
 */
export const requestHandler = ({
  url,
  data,
  headers: reqHeaders,
  method = "GET",
  params,
  redirectOnFailure = false,
  showToast = false,
}: IRequestOptions): AppThunk<Promise<AxiosResponse<any, any>["data"]>> => {
  return async (dispatch) => {
    const jwt = getAuthToken();

    const headers: RawAxiosRequestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (jwt) {
      headers.Authorization = `Bearer ${jwt}`;
    }

    try {
      const response = await axios.request({
        baseURL: import.meta.env.VITE_API_URL,
        url,
        params,
        data,
        method,
        headers: {
          ...headers,
          ...reqHeaders,
        },
      });

      const responseData = response.data;

      if (showToast) {
        toast(responseData.message);
      }

      return response.data;
    } catch (err: any) {
      return handleErrors(err, showToast, redirectOnFailure, dispatch);
    }
  };
};

const handleErrors = (
  err: any,
  showToast: boolean,
  redirectOnFailure: boolean,
  dispatch: any
) => {
  console.log(123);

  if (err instanceof AxiosError) {
    const errorResponse = err.response;
    const errorResponseData = errorResponse?.data;

    if (showToast) {
      toast(errorResponseData.message);
    }

    if (redirectOnFailure) {
      if (
        err.response?.status === HttpStatusCode.NotFound ||
        err.response?.status === HttpStatusCode.Forbidden ||
        err.response?.status === HttpStatusCode.Unauthorized
      ) {
        dispatch(setRoute({ path: "/not-found" }));
      }
    }

    return errorResponseData;
  }

  if (showToast) {
    toast(err.message);
  }

  return err;
};
