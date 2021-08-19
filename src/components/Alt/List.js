import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import "../App.css";
import { listChallanges } from "../graphql/queries";
import { Link } from "react-router-dom";

function List() {
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false);

  async function fetchBooks() {
    setFetching(true);
    try {
      const bookData = await API.graphql(graphqlOperation(listChallanges));
      const books = bookData.data.listChallanges.items;
      setBooks(books);
      setFetching(false);
    } catch (err) {
      console.error("error fetching books!", err);
    }
    setFetching(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      {fetching ? (
        <p>Fetching books...</p>
      ) : (
        <div>
          <h2>Our books:</h2>
          {books.length > 0 ? (
            <ul>
              {books.map((book, index) => (
                <li key={index}>
                  <Link to={`/Detail/${book.id}`}>
                    {book.orgaTitle} - {book.orgaLocat}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              We don't have any books right now <span role="img">😢</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default List;