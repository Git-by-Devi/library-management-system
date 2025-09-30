
let bookslist = [
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
// GET paginated list
exports.getPaginatedBooks = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : bookslist.length;
  let offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const pagination = bookslist.slice(offset, offset + limit);
  res.json({
    totalBooks: bookslist.length,
    limit: limit,
    offset: offset,
    books: pagination,
  });
};

// GET all with sorting
exports.getAllBooks = (req, res) => {
  let result = [...bookslist];
  if (req.query.sort === "author") {
    result.sort((a, b) => a.author.localeCompare(b.author));
  } else if (req.query.sort === "year") {
    result.sort((a, b) => a.yearofpublication - b.yearofpublication);
  }
  res.json(result);
};

// GET by ID
exports.getBookById = (req, res) => {
  const book = bookslist.find((b) => b.bookId == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

// Search by title
exports.searchBook = (req, res) => {
  const name = req.params.name.toLowerCase();
  const filtered = bookslist.filter((b) => b.title.toLowerCase().includes(name));
  if (filtered.length === 0) return res.status(404).json({ message: "No books found" });
  res.json(filtered);
};

// Add new book
exports.addBook = (req, res) => {
  const { title, author, yearofpublication, availablestatus } = req.body;
  const newBook = {
    bookId: bookslist.length + 1,
    title,
    author,
    yearofpublication,
    availablestatus,
  };
  bookslist.push(newBook);
  res.status(201).json({ message: "Book added successfully", data: newBook });
};

// Update book
exports.updateBook = (req, res) => {
  const book = bookslist.find((b) => b.bookId == req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { title, author, yearofpublication, availablestatus } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (yearofpublication) book.yearofpublication = yearofpublication;
  if (availablestatus !== undefined) book.availablestatus = availablestatus;

  res.json({ message: "Book updated successfully", data: book });
};
// Delete book
exports.deleteBook = (req, res) => {
  const index = bookslist.findIndex((b) => b.bookId == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  bookslist.splice(index, 1);
  res.json({ message: "Book deleted successfully" });
};
