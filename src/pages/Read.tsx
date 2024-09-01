import Header from '../components/Header';
import { bookData } from '../types/bookData';
import { readingLogEntry } from '../types/readingLogEntry';
import React, { useEffect, useState } from 'react';
import '../css/AddReading.css'

const Read = () => {
    let bookInfo: bookData[] = JSON.parse(localStorage.getItem("books") ?? "[]");

    const [title, setTitle] = useState("");

    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        checkEntry();
    }, [title, startPage, endPage, startTime, endTime]);


    function sendError(message: string) {
        console.error(message);
        let modal = document.createElement("div");
        document.body.appendChild(modal);
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

        const book = bookInfo.find((book: bookData) => book.title === entry.title);
        // console.log(title, startPage, endPage, startTime, endTime);
        if (!book) {
            sendError(`Title ${entry.title} not found. Try adding it first`);
            return false;
        }

        // if (entry.endTime < entry.startTime) {
        //     sendError(`End time (${entry.endTime.getMilliseconds()}) must be after start time (${entry.startTime.getMilliseconds()})`);
        //     return false;
        // }

        if (entry.startPage < book.pagesRead) {
            sendError(`You must start reading after the last page read ${entry.startPage} > ${book.pagesRead}`);
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

        return entry;
    }


    return (
        <>
            <Header />
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
                                    <option key={index} value={book.title}>{book.title + ` (${book.pages} pages)`}</option>
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

                    <label htmlFor="startTime" className="text-white text-center w-full flex justify-between bg-blue-800 p-4 rounded-lg">
                        <span id="timer-label">Start Time</span>
                        <input
                            type="button"
                            id="entry-create-start-time"
                            name="startTime"
                            className="mx-auto"
                            onClick={(e) => {
                                setStartTime(new Date());
                                document.getElementById("timer-label")!.innerText = "Click to end time";
                                document.getElementById("entry-create-start-time")!.onclick = (e) => {
                                    setEndTime(new Date());
                                    document.getElementById("timer-label")!.parentElement!.style.display = "none";
                                }
                            }}
                        />
                    </label>

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