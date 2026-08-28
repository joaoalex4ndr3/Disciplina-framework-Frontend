import React from "react";
import {render,screen,fireEvent} from "@testing-library/react";
import BreedItem from "./BreedItem";
import {Provider} from "react-redux";
import {store} from "../../app/store";

describe("creating Breed Item that will update store state",()=>{
    test("clicking on item will change selected breed state on the store",()=>{
        render(<Provider store={store}>
            <BreedItem id={"bulldog-english-3"} name={"bulldog"} subBreed={"english"}/>
            <BreedItem id={"bullterrier-staffordshire-4"} name={"bullterrier"} subBreed={"staffordshire"}/>
        </Provider>)
        const breedItem = screen.getByText("english bulldog");
        fireEvent.click(breedItem)
        let selectedBreed = store.getState().breedInfo.value
        expect(selectedBreed).toEqual({name:"bulldog",subBreed:"english",id:"bulldog-english-3"})
        const breedItem2 = screen.getByText("staffordshire bullterrier");
        fireEvent.click(breedItem2)
        selectedBreed = store.getState().breedInfo.value
        expect(selectedBreed).toEqual({name:"bullterrier",subBreed:"staffordshire",id:"bullterrier-staffordshire-4"})
    })

    test("clicking multiple times on same breed item will change selected breed state only once",()=>{
        render(<Provider store={store}><BreedItem id={"bulldog-english-3"} name={"bulldog"} subBreed={"english"}/></Provider>)
        const breedItem = screen.getByText("english bulldog");
        fireEvent.click(breedItem)
        fireEvent.click(breedItem)
        fireEvent.click(breedItem)
        fireEvent.click(breedItem)
        const selectedBreed = store.getState().breedInfo.value
        expect(selectedBreed).toEqual({name:"bulldog",subBreed:"english",id:"bulldog-english-3"})
    })
})
