import { useState } from "react";
import PropTypes from "prop-types";

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
          <span aria-hidden="true">C</span>
          <span aria-hidden="true">R</span>
          <span aria-hidden="true">E</span>
          <span aria-hidden="true">A</span>
          <span aria-hidden="true">T</span>
          <span aria-hidden="true">E</span>
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
        <input type="submit" value="add board" disabled={!inputValid()} />
      </div>
    </form>
  );
};

CreateBoard.propTypes = {
  addBoardCallback: PropTypes.func.isRequired,
  hideBoard: PropTypes.func.isRequired,
};

export default CreateBoard;
