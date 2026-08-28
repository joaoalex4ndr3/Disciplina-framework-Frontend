import React, {useState} from "react"
import Axios from "axios"

import ArticleList from "./ArticleList"
require("dotenv").config()

export default function HomePage() {
    const [inputData, setInputData] = useState({searchKeyword: ""})
    const [searchResults, setSearchResults] = useState([])
    const [toggle, setToggle] = useState(false)
    const [forVariable, setForVariable] = useState({searchTerm: ""})

    const apiKey = process.env.REACT_APP_API_KEY

    function handleChange(e) {
    const {name, value} = e.target
    setInputData({ [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        getData()
        setForVariable({searchTerm: inputData.searchKeyword})
        setInputData({searchKeyword: ""})
        setToggle(true)
    }

    function getData() {
        Axios.get(`https://newsapi.org/v2/everything?q=${inputData.searchKeyword}&language=en&pageSize=25&apiKey=${apiKey}`)
            .then(response => {
                const articles = response.data.articles
                setSearchResults([...articles])
            })
            .catch(err => console.log(err))
    }

    const articleList = searchResults.map((article, i) => {
        return <ArticleList key={article.title + i.toString()} article={article} />
    })

    return (
        <div className="home-content-container">
            <form onSubmit={handleSubmit} id="search-form">
                <input 
                    onChange={handleChange}
                    type="text" 
                    name="searchKeyword" 
                    value ={inputData.searchKeyword} 
                    placeholder="Enter search keyword to find relevant news articles"
                />
                <button>Search</button>
            </form>
            <h2 className="search-results" style={{display: toggle ? "block" : "none"}}>Search results for '{`${forVariable.searchTerm}`}' : </h2>
            <div className="article-container" >
                {articleList}
            </div>
        </div>
    )
}