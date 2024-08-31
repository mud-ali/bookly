import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { readingLogEntry } from '../types/readingLogEntry';
import { bookData } from '../types/bookData';

const Log = () => {
    const logData : readingLogEntry[] = JSON.parse(localStorage.getItem("logs") ?? "[]");
    const bookInfo: bookData[] = JSON.parse(localStorage.getItem("books") ?? "[]");


    return (
        <>
            <Header />
            <main>
                <div className={`w-[4%] min-w-max rounded-lg bg-slate-800 p-8 flex justify-center items-center
                    text-center text-5xl mx-auto my-8 border-2 border-white hover:bg-slate-900 transition-all duration-200 hover:scale-95`}>
                    <Link to="/read">Start a session</Link>
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
                                logData.map((entry: readingLogEntry, index: number) => {
                                    const book = bookInfo.find((book: bookData) => book.title === entry.title);
                                    return (
                                        <tr data-highlight={String(entry.endPage === book?.pages)}>
                                            <td>{index + 1}</td>
                                            <td>{entry.title}</td>
                                            <td>{book?.author ?? "--"}</td>
                                            <td>{entry.endPage - entry.startPage}</td>
                                            <td>{book?.pages}</td>
                                            <td>{Math.round(((entry.endPage - entry.startPage) / (book?.pages ?? 1)) * 1000)/10}%</td>
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

export default Log;