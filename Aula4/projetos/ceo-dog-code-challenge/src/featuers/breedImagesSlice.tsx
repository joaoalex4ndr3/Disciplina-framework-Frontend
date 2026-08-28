import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface BreedImagesState{
    value:Breed
}
export interface Breed {
    urls:string[]
    name:string
    breed:string
}

const initialState:BreedImagesState = {
    value: {
        urls:[],
        name:"",
        breed:"",
    }
};


export const selectedBreedSlice = createSlice({
    name:"breedImages",
    initialState:initialState,
    reducers: {
        setSelectedBreed:(state,action:PayloadAction<Breed>)=>{
            state.value= action.payload
        }
    }
})

export default selectedBreedSlice.reducer;
