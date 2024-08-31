import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import headerConfig from "../config/header";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h1>{headerConfig.siteName}</h1>
            </Link>
            <nav>
                <ul>
                    {
                        headerConfig.links.map((link,i)=>{
                            return (
                                <li>
                                    <Link to={link.href}>{link.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;