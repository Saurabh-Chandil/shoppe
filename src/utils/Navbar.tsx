import React from 'react';
import {  Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <>
            <ul className="navbar">    
                <li>
                    <Link to="/shoppingHistory">Shopping History</Link>
                </li>
                <li>
                    <Link to="/addNewItem">Add New Item</Link>
                </li>
            </ul>
        </>
    )
}

export default Navbar