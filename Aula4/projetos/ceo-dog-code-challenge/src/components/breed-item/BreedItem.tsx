import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectBreed} from "../../featuers/breedSlice";
import styles from "./breedItem.module.css"
import {RootState} from "../../app/store";

interface BreedItemType {
    id: string
    name: string
    subBreed: string
}

export default function BreedItem({name, id, subBreed}: BreedItemType) {
    const {id: selectedId} = useSelector((state: RootState) => state.breedInfo.value)
    const dispatch = useDispatch()

    return (
        <div className={(selectedId === id) ? styles["selected" as keyof typeof styles] : styles["breed-item"]} key={id}
             onClick={(e) => {
                 if (selectedId === id) return
                 dispatch(selectBreed({
                     id: id,
                     name: name,
                     subBreed: subBreed
                 }))
             }}>{subBreed !== "" ? `${subBreed} ${name}` : name}</div>)
}