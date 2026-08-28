import React from "react"
import {Switch, Route} from "react-router-dom"

import Header from "./Header"
import HomePage from "./HomePage"
import TopEgypt from "./TopEgypt"
import TopBbcNews from "./TopBbcNews"

export default function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/"><HomePage /></Route>
                <Route path="/top-arabic-headlines"><TopEgypt /></Route>
                <Route path="/top-bbc-news"><TopBbcNews /></Route>
            </Switch>
        </div>
    )
}