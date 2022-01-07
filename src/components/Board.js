import React, { useState, useEffect } from "react";

const Board = ({ board, deleteBoard, onClickCall }) => {
  const sendData = (event) => {
    onClickCall(board);
    event.preventDefault();
  };

  return (
    <section onClick={sendData}>
      <li>{`${board.title}`}</li>
      <li>by {board.owner}</li>
      <button
        onClick={() => {
          deleteBoard(board.id);
        }}
      >
        Delete
      </button>
    </section>
  );
};

export default Board;
