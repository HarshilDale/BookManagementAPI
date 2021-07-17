const books = [
{
    ISBN: "12345Books",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: ["english","hindi","french"],
    numPage: "250",
    author: [1,2],
    publications: [1],
    category:["tech","programming","education","thriller"],
},
];

const author = [{
id: 1,
name: "Harshil",
books: ["12345Books"],
},

{
id: 2,
name: "Sahil",
books: ["12345Books"],
},

];

const publication = [{
    id: 1,
    name: "writex",
    books: ["12345Books"],
}];


module.exports = {books, author, publication };