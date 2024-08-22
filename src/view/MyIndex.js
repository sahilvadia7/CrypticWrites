import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import CardView from "../components/CardView";


function MyIndex(){
    return(
        <div>
            <AppHeader/>
            <CardView/>
            <AppFooter/>
        </div>
        
    );
}

export default MyIndex;