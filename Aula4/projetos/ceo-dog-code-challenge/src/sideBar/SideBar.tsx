import {useGetBreedListQuery} from "../service/dogApi";
import React from "react";
import BreedItem from "../components/breed-item/BreedItem";
import styles from "./sideBar.module.css"

export const SideBar = () => {
    const {data: breedList, isError, error, isLoading} = useGetBreedListQuery("")
    if (isError) {
        return <div className="error-message">{`There was error in fetching Breed list, error: ${error}`}</div>
    } else if (isLoading) {
        return <div className="insensitive-message">{`Loading,please wait.....`}</div>
    }

    return (<div className="side-bar">
        <div>
            <h5 className="header-title">List of all breed types</h5>
            <div className={styles["side-bar-container"]}>
                {
                    breedList && breedList.map((item: any, index: number) => {
                        const id = item.subBreed!=="" ? `${item.name}-${item.subBreed}-${index}` :`${item.name}-${index}`
                        return <BreedItem name={item.name} subBreed={item.subBreed} id={id} key={id}/>
                    })
                }
            </div>
        </div>
    </div>)
}