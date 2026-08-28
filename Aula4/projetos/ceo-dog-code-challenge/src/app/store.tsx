import {configureStore} from "@reduxjs/toolkit";
import {breedSlice} from "../featuers/breedSlice";
import {dogApi} from "../service/dogApi";

export const store = configureStore({
    reducer:{
        breedInfo:breedSlice.reducer,
        [dogApi.reducerPath]:dogApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(dogApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch