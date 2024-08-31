import React from "react";
import Header from "../components/Header";
import "../css/AddForm.css";
import { bookData } from "../types/bookData";

const AddForm = () => {
    function saveBook(e : React.MouseEvent) {
        let form = document;
        let book: bookData = {
            title: (form.getElementById("book-add-title") as HTMLInputElement).value,
            author: (form.getElementById("book-add-author") as HTMLInputElement)?.value,
            pages: Number((form.getElementById("book-add-pages") as HTMLInputElement).value),
            pagesRead: Number((form.getElementById("book-add-read") as HTMLInputElement)?.value) || 0,
        }
        
        let books: bookData[] = JSON.parse(localStorage.getItem("books") || "[]");
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

        e.preventDefault();
        window.location.href = "/";
    }

    return (
        <>
            <Header />
            <main className="home-body">
                <form 
                    id="book-add"
                    className="flex flex-col justify-around items-center w-full md:w-1/5 mx-auto h-60"
                >
                    <label htmlFor="title" className="text-white text-center w-full flex justify-between">
                        <span>Title<sup>*</sup></span>
                        <input type="text" id="book-add-title" name="title" required className="text-black" />
                    </label>
                    
                    <label htmlFor="author" className="text-white text-center w-full flex justify-between">
                        <span>Author</span>
                        <input type="text" id="book-add-author" name="author" className="text-black" />
                    </label>

                    <label htmlFor="pages" className="text-white text-center w-full flex justify-between">
                        <span>Page Count<sup>*</sup></span>
                        <input type="number" id="book-add-pages" name="pages" required className="text-black" />
                    </label>

                    <label htmlFor="pagesRead" className="text-white text-center w-full flex justify-between">
                        <span>Page Read</span>
                        <input type="number" id="book-add-read" name="pagesRead" className="text-black" />
                    </label>

                    <input
                        id="book-add-button"
                        type="button"
                        className="bg-blue-900 p-4 rounded-lg"
                        onClick={(e)=>saveBook(e)}
                        value={`Add Book`}
                    />
                </form>
            </main>
        </>
    )
}

export default AddForm;