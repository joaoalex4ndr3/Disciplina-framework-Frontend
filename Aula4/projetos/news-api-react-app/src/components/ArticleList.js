import React from "react"

export default function ArticleList({article}) {
    return (
        <div className="article">
            <img style={{width: "300px", height: "178px"}} src={article.urlToImage} alt=""/>
            <h3><a href={article.url}>{article.title}</a></h3>
            <p> {article.description} </p>
            <p>Source: {article.source.name}</p>
        </div>
    )
}