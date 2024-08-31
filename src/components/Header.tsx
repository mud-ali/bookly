import React from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import headerConfig from "../config/header";

const Header = () => {
    return (
        <div className="header py-4">
            <Link to="/">
                <h1>{headerConfig.siteName}</h1>
            </Link>
            <nav>
                <ul>
                    {
                        headerConfig.links.map((link,i)=>{
                            return (
                                <li key={i}>
                                    <Link to={link.href}>{link.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    );
}

export default Header;