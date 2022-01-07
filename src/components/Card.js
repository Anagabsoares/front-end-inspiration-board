import "./Card.css";

const Card = (props) => {
  return (
    <div className="card-item">
      <p className="card-item-message">{props.card.message}</p>
      <ul className="card-options">
        <li className="likes-count card-options">
          {props.card.likes_count} 💕
        </li>
        <li
          className="click-for-like card-options"
          onClick={() => props.updateLikes(props.card.card_id)}
        >
          +1
        </li>
        <li
          className="click-to-delete card-options"
          onClick={() => props.deleteCard(props.card.card_id)}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default Card;
