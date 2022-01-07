import { useState } from "react";
import PropTypes from "prop-types";
import "./CreateBoard.css";

const CreateBoard = (props) => {
  const [formFields, setFormFields] = useState({
    title: "",
    owner: "",
  });

  const onTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value,
    });
  };

  const onOwnerChange = (event) => {
    setFormFields({
      ...formFields,
      owner: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.addBoardCallback({
      titleData: formFields.title,
      ownerData: formFields.owner,
    });

    setFormFields({
      owner: "",
      title: "",
    });
    props.hideBoard();
  };

  const inputValid = () => {
    return formFields.owner.length >= 3 && formFields.title.length >= 3;
  };

  return (
    <form id="board-form" onSubmit={onFormSubmit}>
      <div className="form-group">
        <h4 className="playful" aria-label="CREATE NEW BOARD">
          <span aria-hidden="true">Create </span>
          <span aria-hidden="true">New </span>
          <span aria-hidden="true">Board</span>
        </h4>

        <label hmtlFor="title">Title</label>
        <div>
          <input
            type="text"
            value={formFields.title}
            onChange={onTitleChange}
            className={!inputValid() ? "invalid-form-input" : "none"}
          />
        </div>
        <div>
          <label hmtlFor="owner">Owner</label>
          <input
            type="text"
            value={formFields.owner}
            onChange={onOwnerChange}
            className={!inputValid() ? "invalid-form-input" : "none"}
          />
        </div>

        <button
          type="submit"
          className="new-card-form-submit-btn"
          value="add board"
          disabled={!inputValid()}
        >
          add board
        </button>
      </div>
    </form>
  );
};

CreateBoard.propTypes = {
  addBoardCallback: PropTypes.func.isRequired,
  hideBoard: PropTypes.func.isRequired,
};

export default CreateBoard;
