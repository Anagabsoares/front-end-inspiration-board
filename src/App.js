import React, { useState, useEffect } from "react";
import axios from "axios";
import CardList from "./components/CardList";
import BoardList from "./components/BoardList";
import CreateBoard from "./components/CreateBoard";
import "./App.css";

const URL = process.env.REACT_APP_DATABASE_URL;

function App() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState({
    board_id: "",
    owner: "",
    title: "",
  });

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    try {
      const res = await axios.get(`${URL}/boards`);
      setBoards(res.data);
      setLoading(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const addBoard = (newBoard) => {
    console.log(newBoard);
    axios
      .post(`${URL}/boards`, {
        title: newBoard.titleData,
        owner: newBoard.ownerData,
      })
      .then(function (response) {
        const newBoard = {
          owner: response.data.owner,
          title: response.data.title,
          id: response.data.id,
        };
        setBoards([...boards, newBoard]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteBoard = async (id) => {
    axios
      .delete(`${URL}/boards/${id}`)
      .then((response) => {
        const newBoard = boards.filter((board) => board.id !== id);
        setBoards(newBoard);
      })
      .catch((error) => {
        alert("Sorry, we can't delete this board");
        console.log(error);
      });
  };

  // const toggleState = () => {
  //   if (visibleCardForm === false) {
  //     setVisibleCardForm(true);
  //   } else {
  //     setVisibleCardForm(false);
  //   }
  // };

  const getBoardData = (board_data) => {
    setSelectedBoard(board_data);
  };

  return (
    <body>
      <div className="App">
        <div className="page-container">
          <div className="content-container">
            <h1>Inspiration Board </h1>

            <section className="boards-container">
              <section>
                <h2 className="playful" aria-label="BOARDS">
                  <span aria-hidden="true">BOARDS</span>
                </h2>
                <ol className="boards-list">
                  <BoardList
                    loading={loading}
                    boards={boards}
                    deleteBoard={deleteBoard}
                    callBoardData={getBoardData}
                  />
                </ol>
              </section>

              <section id="selected-boards-section">
                <h3 className="playful" aria-label="SELECT NEW BOARD">
                  <span aria-hidden="true">SELECTED </span>
                  <span aria-hidden="true">BOARD</span>
                </h3>

                <p className="select-board">
                  {selectedBoard.id
                    ? `${selectedBoard.title} - ${selectedBoard.owner}`
                    : "Select a Board from the Board List!"}
                </p>
              </section>

              <section className="new-board-form-container">
                <CreateBoard
                  addBoardCallback={addBoard}
                  hideBoard={() => console.log("hide")}
                />
              </section>
            </section>
          </div>
          <section>
            {selectedBoard.id ? (
              <CardList board={selectedBoard}></CardList>
            ) : (
              ""
            )}
          </section>

          <footer>&copy; Copyright 2022 HTML.am</footer>
        </div>
      </div>
    </body>
  );
}

export default App;
