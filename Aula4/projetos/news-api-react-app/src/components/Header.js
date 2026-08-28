import React, {useState} from "react"
import {Link} from "react-router-dom"

import myFace from "../images/IMG_2215.png"
import myOtherFace from "../images/IMG_2216.png"

export default function Header() {
    const [img, setImg] = useState(myFace)

    function swapFaces() {
        setImg(myOtherFace)
    }

    function againSwapFaces() {
        setImg(myFace)
    }

    return (
        <div>
            <header className="header">
                <img onMouseOver={swapFaces} onMouseLeave={againSwapFaces} src={img} alt="face"/>
                <h1 >Welcome to <span className="block-letter">newSSource</span></h1>
                <h3>Powered by <a href="https://newsapi.org">News API</a></h3>
            </header>
            <nav className="navbar">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/top-arabic-headlines">Arabic News</Link>
                <Link className="nav-link" to="/top-bbc-news">BBC News</Link>
            </nav>
        </div>
    )
}