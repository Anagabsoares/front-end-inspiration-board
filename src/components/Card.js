import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ card, updateLikes, deleteCard }) => {
  return (
    <div className="card-item">
      <p className="card-item-message">{card.message}</p>
      <ul className="card-options">
        <li className="likes-count card-options">{card.likes_count} 💕</li>
        <li
          className="click-for-like card-options"
          onClick={() => updateLikes(card.card_id)}
        >
          +1
        </li>
        <li
          className="click-to-delete card-options"
          onClick={() => deleteCard(card.card_id)}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default Card;

Card.propTypes = {
  updateLikes: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};
