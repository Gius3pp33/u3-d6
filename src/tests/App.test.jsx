import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { describe, it } from "vitest";
// Esercizio 1
describe("App component", () => {
  it("renders Welcome component", () => {
    render(<App />);
    const welcomeElement = screen.getByText(/welcome to epibooks/i);
    expect(welcomeElement).toBeInTheDocument();
  });

// Esercizio 2
it("renders all the 150 books", async () => {
  render(<App />);
  const allTheBookCards = await screen.findAllByRole("card");
  expect(allTheBookCards).toHaveLength(150);
});
// Esercizio 3
// it("CommentArea viene reindirizzato", async () => {
//   render(<App />);
//   const books = await screen.findAllByRole("card");
//   fireEvent.click(books[0]);
//   const commentArea = screen.getByText(/Commentssssss/i);
//   expect(commentArea).toBeInTheDocument();
// });
// Esercizio 4
it ('il filtraggio dei libri funziona sull input?',async () =>{
  render (<App />);
  
  const searchInput = screen.getByPlaceholderText('Search books...');
  fireEvent.change(searchInput,{target: {value:"History"}});

  const filteredBooks = await screen.findAllByRole("card");
  expect(filteredBooks).toHaveLength(1);
})

//Esercizio 5
it ('il bordo cambia colore?',async () =>{
  render (<App />);

})
 });
