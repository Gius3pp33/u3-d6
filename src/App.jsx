import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import Welcome from "./components/Welcome";
import BookList from "./components/BookList";
import { Container } from "react-bootstrap";
import "./App.css";
import fantasyBooks from "./data/fantasy.json";
import historyBooks from "./data/history.json";
import horrorBooks from "./data/horror.json";
import romanceBooks from "./data/romance.json";
import scifiBooks from "./data/scifi.json";

const genres = {
  Fantasy: fantasyBooks,
  History: historyBooks,
  Horror: horrorBooks,
  Romance: romanceBooks,
  Scifi: scifiBooks,
};

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState("Fantasy");

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div>
      <MyNav genres={genres} onSelectGenre={handleSelectGenre} />

      <Container className="mt-5">
        <Welcome />
        <BookList books={genres[selectedGenre]} />
      </Container>
      <MyFooter />
    </div>
  );
};

export default App;
