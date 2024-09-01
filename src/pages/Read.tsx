import Header from '../components/Header';
import { bookData } from '../types/bookData';
import { readingLogEntry } from '../types/readingLogEntry';
import React, { useEffect, useState } from 'react';
import ErrorModal from '../components/ErrorModal';
import '../css/AddReading.css'

const Read = () => {
    let bookInfo: bookData[] = JSON.parse(localStorage.getItem("books") ?? "[]");

    const [title, setTitle] = useState("");

    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        checkEntry();
    }, [title, startPage, endPage, startTime, endTime]);


    function sendError(message: string) {
        console.error(message);
        let modal = document.getElementsByClassName('modal-holder')[0] as HTMLDivElement;
        modal.innerHTML = `<ErrorModal message="${message}" />`;
    }

    function storeEntry() {
        let entry = checkEntry();
        if (entry !== false) {
            let entries: readingLogEntry[] = JSON.parse(localStorage.getItem("logs") ?? "[]");
            entries.push(entry);
            localStorage.setItem("logs", JSON.stringify(entries));
        } else console.error("Entry not stored");
    }

    function checkEntry() {
        let entry: readingLogEntry = {
            title: title,
            startPage: startPage,
            endPage: endPage,
            startTime: startTime,
            endTime: endTime,
        }

        const bookIndex = bookInfo.findIndex((book: bookData) => book.title === entry.title);
        const book = bookInfo[bookIndex];

        if (book === undefined) {
            sendError(`Title ${entry.title} not found. Try adding it first`);
            return false;
        } else {
            console.log(`Book found: ${book.title}`);
        }

        if (startTime === 0 || endTime === 0) return false;

        if (entry.startPage < book.pagesRead) {
            sendError(`You must start reading after the last page read ${entry.startPage} isnt > ${book.pagesRead}`);
            return false;
        }

        if (entry.endPage < entry.startPage) {
            sendError(`End page ${entry.endPage} must be after start page ${entry.startPage}`);
            return false;
        }

        if (entry.endPage > book.pages) {
            sendError(`End page ${entry.endPage} cannot be greater than total pages in ${entry.title} (${book.pages})`);
            return false;
        }

        book.pagesRead = entry.endPage;
        localStorage.setItem("books", JSON.stringify(bookInfo));
        return entry;
    }


    return (
        <>
            <Header />
            <div className='modal-holder hidden'>
                <ErrorModal message=''/>
            </div>
            <main className='h-screen'>
                <form
                    id="entry-create"
                    className="flex flex-col justify-around items-center w-full md:w-1/5 mx-auto my-6 h-1/2"
                >
                    <label htmlFor="bookName" className="text-white text-center w-full flex justify-between">
                        <span>Title</span>
                    </label>
                    <select
                        name="bookName"
                        id="entry-create-title"
                        className='text-black p-3 w-full'
                        onChange={(e)=>{
                            setTitle((document.getElementById("entry-create-title") as HTMLSelectElement).value)
                        }}
                    >
                        <option value="" disabled selected>Select a book</option>
                        {
                            bookInfo.map((book: bookData, index: number) => {
                                return (
                                    <option key={index} value={book.title}>{book.title + ` (${book.pagesRead} / ${book.pages} pages read)`}</option>
                                )
                            })
                        }
                    </select>


                    <label htmlFor="startPage" className="text-white text-center w-full flex justify-between">
                        <span>Start Page</span>
                        <input
                            type="number"
                            id="entry-create-start"
                            name="startPage"
                            className="text-black"
                            onChange={(e)=>{
                                setStartPage(parseInt((document.getElementById("entry-create-start") as HTMLInputElement).value))
                            }}
                        />
                    </label>

                    <label htmlFor="endPage" className="text-white text-center w-full flex justify-between">
                        <span>End Page</span>
                        <input type="number" id="entry-create-end" name="endPage" className="text-black" onChange={(e) => {
                            setEndPage(parseInt((document.getElementById("entry-create-end") as HTMLInputElement).value))
                        }} />
                    </label>

                    <input
                        type="button"
                        id="entry-create-start-time"
                        name="startTime"
                        value={!timerRunning ? `Start Time` : `End Time`}
                        className="mx-auto text-white text-center w-full flex justify-between bg-blue-800 p-4 rounded-lg"
                        onClick={(e) => {
                            if (timerRunning) {
                                setEndTime((new Date()).getTime());
                                console.log("End time set");
                                setTimerRunning(!timerRunning);
                                return;
                            }
                            setStartTime((new Date()).getTime());
                            console.log("Start time set");
                            setTimerRunning(!timerRunning);
                        }}
                    />

                    <input
                        id="entry-create-button"
                        type="submit"
                        // disabled={checkEntry(false)}
                        className="bg-blue-900 p-4 rounded-lg"
                        onClick={(e) => {storeEntry(); e.preventDefault()}}
                        value={`Save Entry`}
                    />
                </form>
            </main>
        </>
    )
}

export default Read;