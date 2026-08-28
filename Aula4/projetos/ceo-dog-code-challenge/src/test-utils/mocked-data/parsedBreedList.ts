import {parseBreedList} from "../../utils/breedListParser";
const rawResponse = {
    "message": {
        "affenpinscher": [],
        "african": [],
        "airedale": [],
        "akita": [],
        "appenzeller": [],
        "australian": [
            "shepherd"
        ],
        "basenji": [],
        "beagle": [],
        "bulldog": [
            "boston",
            "english",
            "french"
        ]
    },
    "status": "success"
}
export const parsedBreedingList = parseBreedList(rawResponse)