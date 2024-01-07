"use client"

import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialUiStateInterface {
    page: string;
}

interface setPageActionInterface {
    page: string;
}

const initialUiState: initialUiStateInterface = {
    page: "",
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        setPage(state, action: PayloadAction<setPageActionInterface>) {
            state.page = action.payload.page;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;