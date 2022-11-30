import React, {useState} from 'react';
import {Header} from "../header/Header";
import {Footer} from "../footer/Footer";
import {Main} from "../main/Main";


function Layout() {

    return(
        <div>
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
        </div>
    );
}
export default Layout;
