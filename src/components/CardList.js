import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import CreateCard from "./CreateCard";
import "./CardList.css";

const URL = "https://kinder-code.herokuapp.com";

const CardList = (props) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/cards`)
      .then((res) => {
        const newCards = res.data.map((card) => {
          return {
            card_id: card.card_id,
            message: card.message,
            likes_count: card.likes_count,
            board_id: card.board_id,
          };
        });
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    board_id = 26;
    axios
      .post(`${URL}/boards/${board_id}/cards`, {
        message,
        likes_count: 0,
        board_id,
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
        <h2 class="playful" aria-label="PICK ME">
          <span aria-hidden="true">P</span>
          <span aria-hidden="true">I</span>
          <span aria-hidden="true">C</span>
          <span aria-hidden="true">K</span>
          <span aria-hidden="true"> </span>
          <span aria-hidden="true">M</span>
          <span aria-hidden="true">E</span>
        </h2>
        <div className="cards-item-container">{cardsItems}</div>
      </section>
      <CreateCard addCardCallback={addCard}></CreateCard>
    </section>
  );
};

export default CardList;
