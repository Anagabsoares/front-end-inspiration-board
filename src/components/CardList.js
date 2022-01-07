import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import CreateCard from "./CreateCard";
import "./CardList.css";

const URL = "https://guarded-savannah-52656.herokuapp.com";

const CardList = ({ board }) => {
  const [cards, setCards] = useState([]);

  console.log(board.id);

  // useEffect((boardId) => {
  //   getCards(boardId);
  // }, []);

  // useEffect((boardId) => {
  //   getCards(boardId);
  // }, []);

  // const getCards = (id) =>
  //   axios
  //     .get(`${URL}/boards/${id}/cards`)
  //     .then((res) => {
  //       const newCards = res.data.map((card) => {
  //         return {
  //           card_id: card.card_id,
  //           message: card.message,
  //           likes_count: card.likes_count,
  //           board_id: card.board_id,
  //         };
  //       });
  //       setCards(newCards);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  console.log(board);
  useEffect(() => {
    axios
      .get(`${URL}/boards/${board.id}/cards`)
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        alert("sorry!! This board has no cards");
      });
  }, [board]);

  const deleteCard = (id) => {
    axios
      .delete(`${URL}/cards/${id}`)
      .then((response) => {
        const newCards = cards.filter((card) => card.card_id !== id);
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateLikes = (id) => {
    console.log(id);
    console.log(cards);
    const newCards = cards.map((card) => {
      if (card.card_id === id) {
        card.likes_count += 1;
        axios
          .patch(`${URL}/cards/${id}/likes`, { likes_count: card.likes_count })
          .then(() => setCards(newCards))
          .catch((err) => console.log(err));
      }
      return card;
    });
  };

  const addCard = ({ message, board_id }) => {
    console.log(board_id);
    axios
      .post(`${URL}/boards/${board_id}/cards`, {
        message: message,
        likes_count: 0,
        board_id: board_id,
      })
      .then((res) => {
        const newCard = {
          id: res.data.card_id,
          likes_count: res.data.likes_count,
          message: res.data.message,
          board_id: res.data.board_id,
        };
        setCards([...cards, newCard]);
      })
      .catch((err) => console.log(err.response.data));
  };

  const cardsItems = cards.map((card) => {
    console.log(card.message);
    return (
      <Card
        card={card}
        updateLikes={updateLikes}
        deleteCard={deleteCard}
      ></Card>
    );
  });

  return (
    <section className="cards-container">
      <section>
        <h2 className="playful" aria-label="PICK ME">
          <span aria-hidden="true">
            {board.title ? board.title : "Pick me"}
          </span>
        </h2>
        <div className="cards-item-container">{cardsItems}</div>
      </section>
      <CreateCard addCardCallback={addCard} board={board}></CreateCard>
    </section>
  );
};

export default CardList;
