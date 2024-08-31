import React from "react";
import Header from "../components/Header";
import "../css/Home.css";
import { Link } from "react-router-dom";

const AddForm = () => {
    return (
        <>
            <Header />
            <main className="home-body">
                <form id="book-add" className="flex flex-col justify-around items-center w-full h-60">
                    <input type="text" name="title" required   className="text-black"/>
                    <input type="number" name="pages" required className="text-black"/>
                    <button type="submit" className="bg-blue-900 p-4 rounded-lg">Add Book</button>
                </form>
            </main>
        </>
    )
}

export default AddForm;