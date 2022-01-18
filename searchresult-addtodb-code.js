// db.Book.findAll({
//     where: {
//       isbn: (apiBooks[0].volumeInfo.industryIdentifiers[0].type == "ISBN_13") ? apiBooks[0].volumeInfo.industryIdentifiers[0].identifier : apiBooks[0].volumeInfo.industryIdentifiers[1].identifier
//     }
//   })
//   .then(dbBooks =>  {
//     // if there is an existing book ??? pass?
//     if (dbBooks.length) {
//       console.log(`Backend log: book already in DB, ${dbBooks[0].title}, ISBN: ${dbBooks[0].isbn}`)
//     } //end if
//     // otherwise add book to DB
//     else {
    //   // create a book in Book database: title, author, isbn, apiId (may not be needed), imgUrl, blurb
    //   db.Book.create({
    //     title: apiBooks[0].volumeInfo.title,
    //     author: apiBooks[0].volumeInfo.authors[0],
    //     isbn: (apiBooks[0].volumeInfo.industryIdentifiers[0].type == "ISBN_13") ? apiBooks[0].volumeInfo.industryIdentifiers[0].identifier : apiBooks[0].volumeInfo.industryIdentifiers[1].identifier,
    //     apiId: apiBooks[0].id,
    //     imgUrl: (!("imageLinks" in apiBooks[0].volumeInfo)) ? null : apiBooks[0].volumeInfo.imageLinks.thumbnail,
    //     blurb: apiBooks[0].volumeInfo.description,
    //   })// end create
    //   .then(createdBook => {
    //     console.log(`Backend log: book created successfully, ${createdBook.title}, ISBN: ${createdBook.isbn}`)
    //   }) //end .then on db.create
    // }// end else