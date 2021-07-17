const express = require("express");

// Database
const database = require("./database")

// Initialization
const Booky = express();

/* 
Route          /
Description    Get all Books
Access         Public
Parameter      None
Methods        Get
*/

Booky.get("/", (req, res) => {
return res.json({ books: database.books });
});

/* 
Route          /is
Description    Get specific Books based on ISBN
Access         Public
Parameter      isbn
Methods        Get
*/

Booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn);

        if (getSpecificBook.length === 0){
            return res.json({ error: `No book found for ISBN of ${req.params.isbn}`, });
        }
        return res.json({ book: getSpecificBook});
});

/* 
Route          /c
Description    Get specific Books based on Category
Access         Public
Parameter      Catagory
Methods        Get
*/

Booky.get("/c/:category", (req,res) => {
const getSpecificBook = database.books.filter((book) => 
book.category.includes(req.params.category));
if (getSpecificBook.length === 0){
    return res.json({ error: `No book found for the catagory of ${req.params.category}`, });
}
return res.json({ book: getSpecificBook});
});

/* 
Route          /l
Description    Get specific Books based on Language
Access         Public
Parameter      Language
Methods        Get
*/

Booky.get("/l/:language", (req,res) => {
    const getSpecificBook = database.books.filter((book) => 
    book.language.includes(req.params.language));
    if (getSpecificBook.length === 0){
        return res.json({ error: `No book found for the language in ${req.params.language}`, });
    }
    return res.json({ book: getSpecificBook});
    });
    
/* 
Route          /author
Description    Get all authors
Access         Public
Parameter      None
Methods        Get
*/

Booky.get("/author", (req,res) => {
    return res.json({authors: database.author });
});

/* 
Route          /author/book/category
Description    Get specific Books based on Authors
Access         Public
Parameter      Catagory
Methods        Get
*/

Booky.get("/authors/book/:category", (req,res) => {
    const getSpecificAuthor = database.author.filter((author) => 
    book.category.includes(req.params.category));
    if (getSpecificAuthor.length === 0){
        return res.json({ error: `No Authors found for the catagory of ${req.params.category}`, });
    }
    return res.json({ authors: getSpecificAuthor});
    });
    

/* 
Route          /author/book
Description    Get all authors based on books
Access         Public
Parameter      isbn
Methods        Get
*/
Booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter((author) => 
author.books.includes(req.params.isbn));
if (getSpecificAuthor.length === 0){
    return res.json({ error: `No Author found for the book of ${req.params.isbn}`, });
}
return res.json({ authors: getSpecificAuthor });

});

/* 
Route          /publications
Description    Get all publications
Access         Public
Parameter      none
Methods        Get
*/

Booky.get("/publications", (req,res) =>{
    return res.json({ publications: database.publication});
});

Booky.listen(3000, () => console.log("Hey Server is Running!😎"));
