import { requestHandler } from "../../shared/handlers/request-handler";
import { AppThunk } from "../../store";

export function getPublicRepositories(query: string): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: `/api/github/search/repositories?query=${query}`,
        method: "GET",
        redirectOnFailure: true,
      })
    );
  };
}

export function getPublicUsers(query: string): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: `/api/github/search/users?query=${query}`,
        method: "GET",
        redirectOnFailure: true,
      })
    );
  };
}

export function getUserPublicRepositories(
  query: string
): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: `/api/github/users/${query}/repositories`,
        method: "GET",
        redirectOnFailure: true,
      })
    );
  };
}

export function bookmarkRepositories(data: any): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: `/api/bookmarks`,
        method: "POST",
        data,
        redirectOnFailure: true,
      })
    );
  };
}

export function getBookmarkRepositories(): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: `/api/bookmarks`,
        method: "GET",
        redirectOnFailure: true,
      })
    );
  };
}

export function deleteBookmarkRepository(id: string): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: `/api/bookmarks/${id}`,
        method: "DELETE",
        redirectOnFailure: true,
      })
    );
  };
}

export function getBookmarkRepositoriesChartData(): AppThunk<Promise<any>> {
  return async (dispatch): Promise<any> => {
    return await dispatch(
      requestHandler({
        url: `/api/bookmarks/chart`,
        method: "GET",
        redirectOnFailure: true,
      })
    );
  };
}
