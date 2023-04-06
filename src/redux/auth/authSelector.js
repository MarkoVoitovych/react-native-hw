export const selectIsAuth = (state) => state.auth?.isAuth;

export const selectUser = (state) => state.auth?.user;

export const selectIsFetching = (state) => state.auth?.isFetching;