import Board from "./Board";
import "./Board.css";
import "./BoardList.css";

const BoardList = ({ boards, loading, deleteBoard }) => {
  return (
    <section>
      <li className="boards_display">
        {loading &&
          boards.map((board) => (
            <Board board={board} deleteBoard={deleteBoard} />
          ))}
      </li>
    </section>
  );
};

export default BoardList;
