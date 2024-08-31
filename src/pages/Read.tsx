import Header from '../components/Header';
import { bookData } from '../types/bookData';
import { readingLogEntry } from '../types/readingLogEntry';
import React, { useEffect, useState } from 'react';

const Read = () => {
    let bookInfo: bookData[] = JSON.parse(localStorage.getItem("books") ?? "[]");

    const [title, setTitle] = useState(document.getElementById("entry-create-title")?.children[0].textContent ?? "");
    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        checkEntry();
    }, [title, startPage, endPage, startTime, endTime]);


    function sendError(message: string) {
        let modal = document.createElement("div");
        document.body.appendChild(modal);
        modal.innerHTML = `<ErrorModal message="${message}" />`;
    }

    function storeEntry(entry: readingLogEntry) {
        let entries: readingLogEntry[] = JSON.parse(localStorage.getItem("logs") ?? "[]");
        entries.push(entry);
        localStorage.setItem("logs", JSON.stringify(entries));
    }

    function checkEntry(submit: boolean = false) {
        console.log(title, startPage, endPage, startTime, endTime);
        let entry: readingLogEntry = {
            title: title,
            startPage: startPage,
            endPage: endPage,
            startTime: startTime,
            endTime: endTime,
        }
        const book = bookInfo.find((book: bookData) => book.title === entry.title);

        if (!book) {
            sendError("Title not found. Try adding it first");
            return false;
        }

        if (entry.endTime < entry.startTime) {
            sendError("End time must be after start time");
            return false;
        }

        if (entry.startPage < book.pagesRead) {
            sendError("You must start reading after the last page read");
            return false;
        }

        if (entry.endPage < entry.startPage) {
            sendError("End page must be after start page");
            return false;
        }

        if (entry.endPage > book.pages) {
            sendError("End page cannot be greater than total pages");
            return false;
        }

        if (submit) {
            storeEntry(entry);
            book.pagesRead = entry.endPage;
        }

        return true;
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
                    <select name="bookName" id="entry-create-title" className='text-black p-3 w-full'>
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
                                setStartPage(Number((e.target as HTMLInputElement).value))
                            }}
                        />
                    </label>

                    <label htmlFor="endPage" className="text-white text-center w-full flex justify-between">
                        <span>End Page</span>
                        <input type="number" id="entry-create-end" name="endPage" className="text-black" />
                    </label>

                    <label htmlFor="startTime" className="text-white text-center w-full flex justify-between">
                        <span>Start Time</span>
                        <input type="datetime-local" id="entry-create-start-time" name="startTime" className="text-black" />
                    </label>

                    <label htmlFor="endTime" className="text-white text-center w-full flex justify-between">
                        <span>End Time</span>
                        <input type="datetime-local" id="entry-create-end-time" name="endTime" className="text-black" />
                    </label>

                    <input
                        id="entry-create-button"
                        type="button"
                        disabled={!timerRunning && checkEntry()}
                        className="bg-blue-900 p-4 rounded-lg"
                        onClick={(e) => checkEntry(true)}
                        value={`Save Entry`}
                    />
                </form>
            </main>
        </>
    )
}

export default Read;