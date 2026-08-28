import {parseBreedList} from "./breedListParser";

describe('parse breeding list', () => {
    const apiResponse = {
        message:{"briard":[],"buhund":["norwegian"],"bulldog":["boston","english","french"],"bullterrier":["staffordshire"]},
        status:"success"
    }
    it("return parsed breeding list that flat all breed and their sub breeds into one array",()=>{
        const result = parseBreedList(apiResponse)
        expect(result).toEqual([
            {name:"briard",subBreed:""},
            {name:"buhund",subBreed:"norwegian"},
            {name:"bulldog",subBreed:"boston"},
            {name:"bulldog",subBreed:"english"},
            {name:"bulldog",subBreed:"french"},
            {name:"bullterrier",subBreed:"staffordshire"},
        ])
    })
    it("return empty array if response messages were empty",()=>{
        const result = parseBreedList({message:{}})
        expect(result).toEqual([])
    })
    it("expect to throw TypeError if message property was not passed",()=>{
        expect(() => {
            parseBreedList({someProp:{}})
        }).toThrow(TypeError)
        expect(() => {
            parseBreedList({messages:{}})
        }).toThrow("Error while parsing,missing message props.")

    })
    it("expect to throw TypeError if sub breed was not a string",()=>{
        expect(() => {
            parseBreedList({message:{"bulldog":["english",555]}})
        }).toThrow(TypeError)

    })
});