import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import {BreedContainer} from "../components/BreedContainer";
import styles from "./breedInfoContainer.module.css"

export const BreedInfoContainer = () => {
    const {name, subBreed = ""} = useSelector((state: RootState) => state.breedInfo.value)
    if (!name) {
        return <div className="insensitive-message">Please Select A breed From Breed List</div>
    }
    return (<div className={styles["breed-info-container"]}>
        <BreedContainer name={name} subBreed={subBreed}/>
    </div>)
}