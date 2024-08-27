/**
 * Get auth token from local storage.
 *
 * @returns Token.
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

/**
 * Set auth token to local storage.
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

/**
 * Remove auth token to local storage.
 */
export const removeAuthToken = () => {
  localStorage.removeItem("auth_token");
};
