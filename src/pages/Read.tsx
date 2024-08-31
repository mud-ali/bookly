import React from 'react';
import Header from '../components/Header';
import { bookData } from '../types/bookData';
import { readingLogEntry } from '../types/readingLogEntry';
import ErrorModal from '../components/ErrorModal';

const Read = () => {
    let bookInfo : bookData[] = JSON.parse(localStorage.getItem("books") ?? "[]");

    function sendError(message : string) {
        let modal = document.createElement("div");
        modal.id = "error-modal";
        document.body.appendChild(modal);
        modal.innerHTML = `<ErrorModal message="${message}" />`;
    }

    function saveEntry(e : React.MouseEvent) {
        let entry : readingLogEntry = {
            title: (document.getElementById("entry-create-title") as HTMLInputElement).value,
            startPage: Number((document.getElementById("entry-create-start") as HTMLInputElement).value),
            endPage: Number((document.getElementById("entry-create-end") as HTMLInputElement).value),
            startTime: new Date((document.getElementById("entry-create-start-time") as HTMLInputElement).value),
            endTime: new Date((document.getElementById("entry-create-end-time") as HTMLInputElement).value),
        }

        if (entry.endTime < entry.startTime) {
            sendError("End time must be after start time");
            return;
        }
        console.log(entry);
        e.preventDefault();
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
                                    <option key={index} value={book.title}>{book.title + `(${book.pages} pages)`}</option>
                                )
                            })
                        }
                    </select>


                    <label htmlFor="startPage" className="text-white text-center w-full flex justify-between">
                        <span>Start Page</span>
                        <input type="number" id="entry-create-start" name="startPage" className="text-black" />
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
                        className="bg-blue-900 p-4 rounded-lg"
                        onClick={(e) => saveEntry(e)}
                        value={`Save Entry`}
                    />
                </form>
            </main>
        </>
    )
}

export default Read;