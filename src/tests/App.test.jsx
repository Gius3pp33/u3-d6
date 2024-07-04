import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { describe, expect, it } from "vitest";
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
//   const commentArea = screen.getByText(/Comments/i);
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
it("il bordo cambia colore?",async () => {
  render (<App />)
  const allTheBookCards = await screen.findAllByRole('card')
  const firstBookCard = allTheBookCards[0]
  fireEvent.click(firstBookCard)
  expect(firstBookCard).toHaveStyle('border: 2px solid red')
})
//Esercizio 6
it ('il bordo ritorna normale?',async () =>{
  render (<App />);
  const allTheBookCard =await screen.findAllByRole('card')
  const firstBookCard = allTheBookCard[0]
  fireEvent.click(firstBookCard);
  expect(firstBookCard).toHaveStyle('border: 2px solid red')
  const secondBookCard = allTheBookCard[1]
  fireEvent.click(secondBookCard)
  expect(firstBookCard).not.toHaveStyle('border: 2px solid red')
})
//Esercizio 7
it ('non ci devono essere istanze del singlecomment all avvio',async () =>{
  render(<App />);
  const allTheBooksComments = screen.queryAllByTestId('single-comment')
  expect(allTheBooksComments).toHaveLength(0)
})


// Esercizio 8
it(' caricamento recensioni al click su libro',async () =>{
  render (<App />);
  const allTheBookCards = await screen.findAllByRole('card')
  const firstBookCard = allTheBookCards[0]
  fireEvent.click(firstBookCard)
  const allTheBookComments = await screen.findAllByTestId('single-comment')
  // Verifica che ci siano delle recensioni caricate nel DOM
  expect(allTheBookComments).not.toHaveLength(0)
})

});