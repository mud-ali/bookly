import React from "react";
import Header from "../components/Header";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { bookData } from "../types/bookData";

const Home = () => {
    const bookInfo : bookData[] = JSON.parse(localStorage.getItem("books") ?? "[]");

    return (
        <>
            <Header />
            <main className="home-body">
                <div className={`w-[4%] min-w-max rounded-lg bg-slate-800 p-8 flex justify-center items-center
                    text-center text-5xl mx-auto border-2 border-white hover:bg-slate-900 transition-all duration-200 hover:scale-95`}>
                    <Link to="/add">Add Book</Link>
                </div>
                <div id="info" className="w-full my-8">
                    <table className="w-2/3 min-w-max mx-auto ">
                        <thead>
                            <tr>
                                <th>Book ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Pages Read</th>
                                <th>Total Pages</th>
                                <th>% Complete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookInfo.map((book: bookData, index: number) => {
                                    return (
                                        <tr data-highlight={String(book.pagesRead === book.pages)}>
                                            <td>{index + 1}</td>
                                            <td>{book.title}</td>
                                            <td>{book.author ?? "--"}</td>
                                            <td>{book.pagesRead}</td>
                                            <td>{book.pages}</td>
                                            <td>{Math.round((book.pagesRead / book.pages) * 1000)/10}%</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default Home;