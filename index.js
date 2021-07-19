const express = require("express");

// Database
const database = require("./database")

// Initialization
const Booky = express();

// Configuration
Booky.use(express.json());

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

/* 
Route          /book/add
Description    Add new book
Access         Public
Parameter      none
Methods        Post
*/
Booky.post("/book/add", (req,res) => {
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({ books : database.books});
});

/* 
Route          /author/add
Description    Add new book
Access         Public
Parameter      none
Methods        Post
*/
Booky.post("/author/add", (req,res) => {
    const {newAuthor} = req.body;
    database.author.push(newAuthor);
    return res.json({ authors : database.books});
});

/* 
Route          /book/update/title
Description    Update book title
Access         Public
Parameter      isbn
Methods        Put
*/
Booky.put("/book/update/title/:isbn" , (req,res) => {
database.books.forEach((book) => {
if(book.ISBN === req.params.isbn){
    book.title = req.body.newBookTitle;
    return;
}
});
return res.json({books: database.books});
});

/* 
Route          /book/update/author
Description    Update/add new authors
Access         Public
Parameter      isbn
Methods        Put
*/

Booky.put("/book/update/author/:isbn", (req,res) => {
// Upaate Book database
database.books.forEach((book) => {
if(book.ISBN === req.params.isbn){
return book.author.push(parseInt(req.params.authorId));
}
});
// update authors database
database.author.forEach((author) => {
    if(author.id === parseInt(req.params.authorId))
    return author.books.push(req.params.isbn);
});
return res.json({ books: database.books, author: database.author});
});

/* 
Route          /publication/update/book
Description    Update/Add Books to a publications
Access         Public
Parameter      isbn
Methods        Put
*/

Booky.put("/publication/update/book/:isbn", (req,res) => {
 // Upaate publication database
database.publications.forEach((publication) => {
    if(publication.id === req.body.pubId){
    return publication.books.push(req.params.isbn);
    }
});
   // Upaate Book database
database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
    book.publication = req.body.pubId;
    return;
    }
    });    

    return res.json({books: database.books,
         publications: database.publications, 
         message: "Successfully update publication",
        });
});

Booky.listen(3000, () => console.log("Hey Server is Running!😎"));
