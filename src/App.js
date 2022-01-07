import React, { useState, useEffect } from "react";
// import NavBarCom from "./components/NavBar";
// import { Container } from "react-bootstrap";
import axios from "axios";
import CardList from "./components/CardList";
import BoardList from "./components/BoardList";
import CreateBoard from "./components/CreateBoard";
import "./App.css";

const URL = "https://guarded-savannah-52656.herokuapp.com";

function App() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCardForm, setVisibleCardForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState({
    board_id: "",
    owner: "",
    title: "",
  });

  useEffect(() => {
    getBoards();
  }, []);

  console.log(selectedBoard);
  const getBoards = async () => {
    try {
      const res = await axios.get(`${URL}/boards`);
      setBoards(res.data);
      setLoading(true);
    } catch (err) {
      alert(err.message);
    }
  };

  // console.log(boards[0].id);

  const addBoard = (newBoard) => {
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
        console.log(error);
      });
  };

  const toggleState = () => {
    if (visibleCardForm === false) {
      setVisibleCardForm(true);
    } else {
      setVisibleCardForm(false);
    }
  };

  const handleCallback = (board_data) => {
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
                <ol className="boards-list" onClick={() => toggleState()}>
                  <BoardList
                    loading={loading}
                    boards={boards}
                    deleteBoard={deleteBoard}
                    onClickCall={handleCallback}
                  />
                </ol>
              </section>

              <section id="selected-boards-section">
                <h3 className="playful" aria-label="SELECT NEW BOARD">
                  <span aria-hidden="true">SELECTED </span>
                  <span aria-hidden="true">BOARD</span>
                </h3>

                <p>
                  {selectedBoard.id
                    ? `${selectedBoard.title} - ${selectedBoard.owner}`
                    : "Select a Board from the Board List!"}
                </p>
              </section>

              <section className="new-board-form-container">
                <CreateBoard addBoardCallback={addBoard} />
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

          <footer>
            <span>This is a demo! Please be gentle!</span>
          </footer>
        </div>
      </div>
    </body>
  );
}

export default App;
