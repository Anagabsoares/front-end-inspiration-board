import React from "react";
import PropTypes from "prop-types";

const Board = ({ board, deleteBoard, callBoardData }) => {
  const sendData = (event) => {
    callBoardData(board);
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
  callBoardData: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
};
