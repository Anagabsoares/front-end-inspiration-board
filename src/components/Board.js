import React from "react";

const Board = ({ board, deleteBoard }) => {
  return (
    <section>
      <li>{`${board.title}`}</li>

      <div>
        <strong>Owner:</strong>
        {board.owner}
      </div>

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
