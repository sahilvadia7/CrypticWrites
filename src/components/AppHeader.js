import React from "react";
import '/home/sahilvadia/projects/crypticwrites/src/style/AppHeaderStyle.css';

function AppHeader() {
    return (
        <div>

            <div className="header">
                <h1 class="logo">Crypticwrites</h1>

                <header >

                    {/* <img src={logo} alt="Company Logo" className="logo" /> */}

                    <nav>

                        <ul>

                            <li><a href="/">Home</a></li>

                            <li><a href="/about">About</a></li>

                            <li><a href="/cetegory">Cetegory</a></li>

                            <li><a href="/contact">Contact</a></li>

                        </ul>

                    </nav>

                </header>
            </div>
        </div>


    );
}


export default AppHeader;


