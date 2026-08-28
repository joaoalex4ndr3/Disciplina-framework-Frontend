import React from "react";
import {render,screen} from "@testing-library/react";
import Gallery from "./Gallery";

describe("Create image gallery by passing image array",()=>{
    test("passing an image array will render images with the passed resources",()=>{
        const images=["https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg","https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg"];
        render(<Gallery images={images}/>)
        const imgElements = screen.getAllByRole('img')
        imgElements.map((img,index)=>{
            expect(img).toHaveAttribute("src",images[index])
            expect(imgElements.length).toBe(2)
        })
    })
})
