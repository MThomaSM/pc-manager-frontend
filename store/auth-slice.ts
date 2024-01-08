"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User, UserState} from "@/interface/auth";

const TOKEN_KEY = 'token';
const EXPIRES_KEY = 'expires';
const USER_KEY = 'user';

const getLocalStorageItem = (key: string): string|null => {
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
}

const setLocalStorageItem = (key: string, value: string): void => {
    if(typeof window !== "undefined"){
        localStorage.setItem(key, value);
    }
}

const removeLocalStorageItem = (key: string): void => {
    if(typeof window !== "undefined"){
        localStorage.removeItem(key);
    }
}

const defaultState: UserState = {
    jwt: {
        expiresAt: parseInt(getLocalStorageItem(EXPIRES_KEY) ?? '0'),
        token: getLocalStorageItem(TOKEN_KEY) ?? '',
    },
    user: JSON.parse(getLocalStorageItem(USER_KEY) ?? 'null'),
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
            setLocalStorageItem(TOKEN_KEY, state.jwt.token);
            setLocalStorageItem(EXPIRES_KEY, state.jwt.expiresAt.toString());
            setLocalStorageItem(USER_KEY, JSON.stringify(state.user));
        },
        logoutUser(state) {
            state.jwt.token = "";
            state.jwt.expiresAt = 0;
            state.user = null;
            removeLocalStorageItem(TOKEN_KEY);
            removeLocalStorageItem(EXPIRES_KEY);
            removeLocalStorageItem(USER_KEY);
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;