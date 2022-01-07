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

  return (
    <form id="board-form" onSubmit={onFormSubmit}>
      <div class="form-group">
        <h4 class="playful" aria-label="CREATE NEW BOARD">
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

        <label for="title">Title</label>
        <div>
          <input
            type="text"
            value={formFields.title}
            onChange={onTitleChange}
          />
        </div>
        <div>
          <label for="owner">Owner</label>
          <input
            type="text"
            value={formFields.owner}
            onChange={onOwnerChange}
          />
        </div>
        <input type="submit" value="add board" />
      </div>
    </form>
  );
};

CreateBoard.propTypes = {
  addBoardCallback: PropTypes.func.isRequired,
  hideBoard: PropTypes.func.isRequired,
};

export default CreateBoard;
