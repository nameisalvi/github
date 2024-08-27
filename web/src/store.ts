import { configureStore } from "@reduxjs/toolkit";
import type { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { appReducer } from "./features/app/app.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

/**
 * Type declaration for application redux store state.
 */
export type AppReduxState = ReturnType<typeof store.getState>;

/**
 * Global application dispatch hook.
 *
 * @returns App redux dispatch hook.
 */
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

/**
 * Global application selector hook.
 */
export const useAppSelector: TypedUseSelectorHook<AppReduxState> = useSelector;

/**
 * Type declaration fpr application thunk.
 */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppReduxState,
  unknown,
  AnyAction
>;
