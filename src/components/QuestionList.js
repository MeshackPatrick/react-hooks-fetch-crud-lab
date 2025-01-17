import React,{useState,useEffect} from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";


function QuestionList() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/questions")
            .then((response) => response.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);

    const handleUpdateCorrectIndex = (id, correctIndex) => {
        fetch(`http://localhost:3000/questions/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correctIndex }),
        })
            .then((response) => response.json())
            .then((data) => {
                setQuestions(
                    questions.map((question) =>
                        question.id === id ? { ...question, correctIndex } : question
                    )
                );
            })
            .catch((error) => console.error("Error updating correct index:", error));
    };

    const handleDeleteQuestion = (id) => {
        fetch(`http://localhost:3000/questions/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setQuestions(questions.filter((question) => question.id !== id));
            })
            .catch((error) => console.error("Error deleting question:", error));
    };

    const handleAddQuestion = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
    };


    return (
        <section>
            <h1>Quiz Questions</h1>
            <QuestionForm onAddQuestion={handleAddQuestion} />
            <ul>
                {questions.map((question) => (
                    <QuestionItem
                        key={question.id}
                        question={question}
                        onDelete={handleDeleteQuestion}
                        onUpdateCorrectIndex={handleUpdateCorrectIndex}
                    />
                ))}
            </ul>
        </section>
  );
}

export default QuestionList;
