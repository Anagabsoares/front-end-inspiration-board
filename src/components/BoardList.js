import Board from "./Board";
import PropTypes from "prop-types";
import "./BoardList.css";
import "./Board.css";

const BoardList = ({ boards, deleteBoard, getBoardData }) => {
  const board = boards.map((board) => {
    return (
      <Board
        board={board}
        deleteBoard={deleteBoard}
        getBoardData={getBoardData}
      />
    );
  });

  return <li className="boards_display">{board}</li>;
};

export default BoardList;

BoardList.propTypes = {
  getBoardData: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
};
