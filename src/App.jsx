import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
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

class App extends Component {
  state = {
    selectedGenre: "Fantasy",
  };

  handleSelectGenre = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    return (
      <div>
        <MyNav genres={genres} onSelectGenre={this.handleSelectGenre} />
        <Container className="mt-5">
          <Welcome />
          <BookList books={genres[this.state.selectedGenre]} />
        </Container>
        <MyFooter />
      </div>
    );
  }
}

export default App;
