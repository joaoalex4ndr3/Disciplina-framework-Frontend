import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface BreedListState{
    value:Breed
}
export interface Breed {
    id:string
    name:string
    subBreed:string
}
const initialState:BreedListState = {
    value:{} as Breed
};

export const breedSlice = createSlice({
    name:"breedInfo",
    initialState,
    reducers: {
        selectBreed:(state,action:PayloadAction<Breed>)=>{
            state.value=action.payload
        },
    }
})

export const {selectBreed} = breedSlice.actions

export default breedSlice.reducer;
