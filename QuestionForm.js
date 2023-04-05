import React, { useState } from "react";
import "./QuestionForm.css";

function QuestionForm ({ onSubmit, onDelete, index, initialQuestion, initialChoices, initialCorrectAnswerIndex }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [choices, setChoices] = useState(initialChoices);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(initialCorrectAnswerIndex);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleChoiceChange = (index, event) => {
    const newChoices = [...choices];
    newChoices[index] = event.target.value;
    setChoices(newChoices);
  };

  const handleAddChoice = () => {
    const newChoices = [...choices, ""];
    setChoices(newChoices);
  };

  const handleDeleteChoice = (index) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    setChoices(newChoices);
  };

  const handleCorrectAnswerIndexChange = (event) => {
    setCorrectAnswerIndex(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(question, choices, correctAnswerIndex);
  };

  const handleDeleteQuestion = () => {
    onDelete(index);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="question-form-container">
        <div className="question-container">
          <label>
            Question:
            <input type="text" value={question} onChange={handleQuestionChange} required />
          </label>
        </div>

        <div>
          <label>
            Choices:
            {choices.map((choice, index) => (
              <div key={index}>
                <input type="text" value={choice} onChange={(event) => handleChoiceChange(index, event)} required />
                <button type="button" onClick={() => handleDeleteChoice(index)}>Delete Choice</button>
              </div>
            ))}
            <button type="button" onClick={handleAddChoice}>Add Choice</button>
          </label>
        </div>
        <div>
          <label>
            Correct Answer Index:
            <input type="number" value={correctAnswerIndex} onChange={handleCorrectAnswerIndexChange} required />
          </label>
        </div>
      </div>
      {onDelete && <button type="button" onClick={handleDeleteQuestion}>Delete Question</button>}
      <button type="submit">Submit Question</button>
    </form>
  );
}

export default QuestionForm;
