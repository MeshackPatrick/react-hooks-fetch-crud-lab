import React from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectIndex }) {
    const { id, prompt, answers, correctIndex } = question;

    // Handle cases where answers might be empty or not available
    if (!answers || answers.length === 0) {
        return <li>Question {id}: No answers available.</li>;
    }

    const options = answers.map((answer, index) => (
        <option key={index} value={index}>
            {answer}
        </option>
    ));

    const handleDelete = () => {
        onDelete(id);
    };

    const handleCorrectIndexChange = (event) => {
        const newIndex = parseInt(event.target.value);
        onUpdateCorrectIndex(id, newIndex);
    };

    return (
        <li>
            <h4>Question {id}</h4>
            <h5>Prompt: {prompt}</h5>
            <label>
                Correct Answer:
                <select value={correctIndex} onChange={handleCorrectIndexChange}>
                    {options}
                </select>
            </label>
            <button onClick={handleDelete}>Delete Question</button>
        </li>
    );
}

export default QuestionItem;
