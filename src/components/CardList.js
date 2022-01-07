import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import CreateCard from "./CreateCard";
import Card from "./Card";
import "./CardList.css";

const URL = process.env.REACT_APP_DATABASE_URL;

const CardList = ({ board }) => {
  const [cards, setCards] = useState([]);

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
    return (
      <Card
        key={card.card_id}
        card={card}
        updateLikes={updateLikes}
        deleteCard={deleteCard}
      />
    );
  });

  return (
    <section className="cards-container">
      <section>
        <h2 className="playful" aria-label="PICK ME">
          <span aria-hidden="true">
            {board.title ? board.title : "Pick a board"}
          </span>
        </h2>
        <div className="cards-item-container">{cardsItems}</div>
      </section>
      <CreateCard addCardCallback={addCard} board={board}></CreateCard>
    </section>
  );
};

export default CardList;

CardList.propTypes = {
  board: PropTypes.object.isRequired,
};
