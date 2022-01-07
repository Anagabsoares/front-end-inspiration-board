import Board from "./Board";
import "./Board.css";
import "./BoardList.css";

const BoardList = ({ boards, loading, deleteBoard, onClickCall }) => {
  const board = boards.map((board) => {
    return (
      <Board
        board={board}
        deleteBoard={deleteBoard}
        onClickCall={onClickCall}
      />
    );
  });

  return <li className="boards_display">{board}</li>;
};

export default BoardList;
