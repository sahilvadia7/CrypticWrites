import React from "react";

import '../style/CardView.css'

function SlideView({description,topic}){
    return(
        <>
        <div className="slideCard">
            <p style={{fontSize:"32px"}} className="slideTitle">Trending Stories in <br/> <b>{topic}</b></p>
            <p style={{fontSize:"20px"}} className="slideDescription">{description}</p>
            
        </div>
        </>
    )
}

export default SlideView;