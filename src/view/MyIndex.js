import React from "react";
import AppHeader from "../components/Header_Footer/AppHeader";
import AppFooter from "../components/Header_Footer/AppFooter";
import CardViewcontroller from "../components/CardViewcontroller";


function MyIndex(){
    return(
        <div>
            <AppHeader/>
            <CardViewcontroller/>
            <AppFooter/>
        </div>
        
    );
}

export default MyIndex;