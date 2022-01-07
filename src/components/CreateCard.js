import { useState } from "react";
import PropTypes from "prop-types";

import "./CreateCard.css";

const CreateCard = ({ addCardCallback, board }) => {
  // get id from clickEvent on board , pass this value as board_id
  const [newCardData, setNewCardData] = useState({
    message: "",
    board_id: "",
  });

  const inputValid = () => {
    return newCardData.message.length <= 40 && newCardData.message.length >= 3;
  };

  const onMessageChange = (event) => {
    setNewCardData({
      message: event.target.value,
      board_id: board.id,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!inputValid()) {
      return;
    }
    // console.log("me");
    // create a new card
    addCardCallback(newCardData);

    setNewCardData({
      ...newCardData,
      message: "",
    });
  };

  return (
    <section className="new-card-form-container">
      <h4 className="playful" aria-label="CREATE NEW BOARD">
        <span aria-hidden="true">CREATE </span>
        <span aria-hidden="true">NEW </span>
        <span aria-hidden="true">CARD </span>
      </h4>

      <form onSubmit={onSubmit} className="new-card-form-form">
        <label htmlfor="message">Message</label>
        <input
          type="text"
          className={!inputValid() ? "invalid-form-input" : "none"}
          value={newCardData.message}
          onChange={onMessageChange}
        />
        <p> Preview: {newCardData.message} </p>
        <button
          type="submit"
          className="new-card-form-submit-btn"
          disabled={!inputValid()}
        >
          submit
        </button>
      </form>
    </section>
  );
};

export default CreateCard;

CreateCard.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};
