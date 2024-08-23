import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
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