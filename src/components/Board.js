import React from "react";
import PropTypes from "prop-types";

const Board = ({ board, deleteBoard, getBoardData }) => {
  const sendData = (event) => {
    getBoardData(board);
    event.preventDefault();
  };

  return (
    <section onClick={sendData}>
      <li className="board-items">
        <strong>{`${board.title}`}</strong>
      </li>
      <li>by {board.owner}</li>
      <button
        className="button-delete"
        onClick={() => {
          deleteBoard(board.id);
        }}
      >
        delete
      </button>
    </section>
  );
};

export default Board;

Board.propTypes = {
  getBoardData: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
};
