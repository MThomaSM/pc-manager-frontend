import {configureStore} from "@reduxjs/toolkit";
import authSlice from "@/store/auth-slice";
import uiSlice from "@/store/ui-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
