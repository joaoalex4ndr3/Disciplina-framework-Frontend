import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {parseBreedList} from "../utils/breedListParser";

interface BreedQueryParams {
    name:string,
    subBreed:string
}
export const API_BASE_URI = process.env.REACT_APP_API_BASE_URL || "https://dog.ceo/api/"
export const dogApi = createApi({
    reducerPath: "dogApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URI
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getBreedList: builder.query({
            query: () => 'breeds/list/all',
            transformResponse:((rawResult,meta)=>{
                return parseBreedList(rawResult)
            })
        }),
        getGalleryByBreedName: builder.query({
            query: (args:BreedQueryParams) => {
                return args.subBreed==="" ? `breed/${args.name}/images` : `breed/${args.name}/${args.subBreed}/images`
            }
        })

    })
})



export const {useGetBreedListQuery, useGetGalleryByBreedNameQuery} = dogApi