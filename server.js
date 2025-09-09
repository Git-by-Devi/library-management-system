const express = require("express");
const connectdb = require("./db");
connectdb();
const Book = require("./librarySchema");
const app = express();
const PORT = 3000;
app.use(express.json());

let books = [
  {
    title: "Animal farm",
    author: "George orwell",
    bookId: 1,
    yearofpublication: 1998,
    availablestatus: true,
  },
  {
    title: "The call of the wild",
    author: "Jack london",
    bookId: 2,
    yearofpublication: 1898,
    availablestatus: false,
  },
  {
    title: "Rich dad and poor dad",
    author: "Robert",
    bookId: 3,
    yearofpublication: 1982,
    availablestatus: true,
  },
  {
    title: "Wonder",
    author: "Palacio",
    bookId: 4,
    yearofpublication: 1996,
    availablestatus: true,
  },
  {
    title: "Harry potter and sorcerer's stone",
    author: "J.K.Rowling",
    bookId: 5,
    yearofpublication: 1896,
    availablestatus: false,
  },
  {
    title: "Harry potter and the chamber of secret",
    author: "J.K.Rowling",
    bookId: 6,
    yearofpublication: 2010,
    availablestatus: true,
  },
];

//Get all books
app.get("/books", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
  } catch (err) {
    res.status(500).json({ message: "Error in fetching books" });
  }
});

// Add a new book
app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book by bookId
app.put("/books/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedBook = await Book.findOneAndUpdate({ bookId: id }, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully", data: updatedBook });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  Delete a book by bookId
app.delete("/books/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedBook = await Book.findOneAndDelete({ bookId: id });
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book deleted successfully", data: deletedBook });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log(`The server is running at the port ${PORT}`);
});
