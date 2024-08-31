import React from "react";
import Header from "../components/Header";
import "../css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Header />
            <main className="home-body">
                <div className={`w-[4%] min-w-max rounded-lg bg-blue-700 p-8 flex justify-center items-center
                    text-center text-5xl mx-auto`}>
                    <Link to="/add">Add Book</Link>
                </div>
            </main>
        </>
    )
}

export default Home;