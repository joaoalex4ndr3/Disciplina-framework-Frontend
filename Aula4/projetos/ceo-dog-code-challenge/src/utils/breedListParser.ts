interface Breed {
    name: string
    subBreed: string
}

export const parseBreedList = (data: any) => {
    try {
        const list: Breed[] = []
        Object.entries(data.message).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
                value.forEach((item:string) => {
                    if(typeof item!=="string"){
                        throw new TypeError("TypeError, sub breed can only be string.")
                    }
                    list.push({name: key, subBreed: item})
                })
            } else {
                list.push({name: key as string, subBreed: ''})
            }
        })
        return list
    } catch (error) {
        throw new TypeError("Error while parsing,missing message props.")
    }

}