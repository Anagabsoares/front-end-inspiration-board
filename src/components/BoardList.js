import Board from "./Board";
import PropTypes from "prop-types";
import "./BoardList.css";
import "./Board.css";

const BoardList = ({ boards, deleteBoard, callBoardData, loading }) => {
  const board = boards.map((board) => {
    return (
      <Board
        key={board.id}
        board={board}
        deleteBoard={deleteBoard}
        callBoardData={callBoardData}
      />
    );
  });

  return <li className="boards_display">{board}</li>;
};

export default BoardList;

BoardList.propTypes = {
  callBoardData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  boards: PropTypes.array.isRequired,
};
