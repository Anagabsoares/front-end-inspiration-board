import React, { useState, useEffect } from "react";
// import NavBarCom from "./components/NavBar";
// import { Container } from "react-bootstrap";
import axios from "axios";
import CardList from "./components/CardList";
import BoardList from "./components/BoardList";
import CreateBoard from "./components/CreateBoard";
import "./App.css";

const URL = "https://kinder-code.herokuapp.com";

function App() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [visibleCardForm, setVisibleCardForm] = useState(false);

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
          board_id: response.data.id,
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

  const hideBoardForm = () => {
    return setShowBoardForm(false);
  };

  const toggleState = () => {
    if (visibleCardForm === false) {
      setVisibleCardForm(true);
    } else {
      setVisibleCardForm(false);
    }
  };

  return (
    <body>
      <div className="App">
        <div class="page-container">
          <div class="content-container">
            <h1>Inspiration Board</h1>

            <section class="boards-container">
              <section>
                <h2 class="playful" aria-label="BOARDS">
                  <span aria-hidden="true">B</span>
                  <span aria-hidden="true">O</span>
                  <span aria-hidden="true">A</span>
                  <span aria-hidden="true">R</span>
                  <span aria-hidden="true">D</span>
                  <span aria-hidden="true">S</span>
                </h2>
                <ol class="boards-list">
                  <BoardList
                    loading={loading}
                    boards={boards}
                    deleteBoard={deleteBoard}
                  />
                </ol>
              </section>

              <section id="selected-boards-section">
                <h3 class="playful" aria-label="SELECT NEW BOARD">
                  <span aria-hidden="true">S</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true">L</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true">C</span>
                  <span aria-hidden="true">T</span>
                  <span aria-hidden="true"> </span>
                  <span aria-hidden="true">N</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true">W</span>
                  <span aria-hidden="true"> </span>
                  <span aria-hidden="true">B</span>
                  <span aria-hidden="true">O</span>
                  <span aria-hidden="true">A</span>
                  <span aria-hidden="true">R</span>
                  <span aria-hidden="true">D</span>
                </h3>
                <p>Select a Board from the Board List!</p>
              </section>

              <section class="new-board-form-container">
                <CreateBoard
                  addBoardCallback={addBoard}
                  hideBoard={hideBoardForm}
                />
                <span class="new-board-form-toggle-btn">
                  Hide New Board Form
                </span>
              </section>
            </section>
          </div>
          <section>{visibleCardForm ? <CardList /> : null}</section>
          <footer>
            <span>This is a demo! Please be gentle!</span>
          </footer>
        </div>
      </div>
    </body>
  );
}

export default App;
