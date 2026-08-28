import React from 'react'
import {useGetGalleryByBreedNameQuery} from "../service/dogApi";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Gallery from "./image-gallery/Gallery";
import styles from "./breedContainer.module.css"

interface BreedGalleryContainerType {
    name:string
    subBreed:string
}

export const BreedContainer = ({name,subBreed}:BreedGalleryContainerType)=>{
    const {data:images,isError, error, isLoading} = useGetGalleryByBreedNameQuery({name,subBreed})
    if (isError) {
        const targetedBreed = subBreed!=="" ? `${subBreed} ${name}` :`${name}`
        return <div className="error-message">{`There was error in fetching Breed ${targetedBreed}, error: ${error}`}</div>
    } else if (isLoading) {
        return <div className="insensitive-message">{`Loading,please wait.....`}</div>
    }

    if(!(images && images.message)) return null
    return <div className={styles["breed-container"]}>
        <h5 className="header-title">{`List of images for ${subBreed} ${name}`}</h5>
        <Gallery images={images?.message} ></Gallery>
    </div>
}