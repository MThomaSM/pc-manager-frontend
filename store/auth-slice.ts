"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User, UserState} from "@/interface/auth";

const TOKEN_KEY = 'token';
const EXPIRES_KEY = 'expires';
const USER_KEY = 'user';

const defaultState: UserState = {
    jwt: {
        expiresAt: parseInt(localStorage.getItem(EXPIRES_KEY) ?? '0'),
        token: localStorage.getItem(TOKEN_KEY) ?? '',
    },
    user: JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'),
};

const authSlice = createSlice({
    name: "auth",
    initialState: defaultState,
    reducers: {
        updateUser(
            state,
            action: PayloadAction<{ token: string; expires: number; user: User }>
        ) {
            state.jwt.token = action.payload.token;
            state.jwt.expiresAt = action.payload.expires;
            state.user = action.payload.user;
            localStorage.setItem(TOKEN_KEY, state.jwt.token);
            localStorage.setItem(EXPIRES_KEY, state.jwt.expiresAt.toString());
            localStorage.setItem(USER_KEY, JSON.stringify(state.user));
        },
        logoutUser(state) {
            state.jwt.token = "";
            state.jwt.expiresAt = 0;
            state.user = null;
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(EXPIRES_KEY);
            localStorage.removeItem(USER_KEY);
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;