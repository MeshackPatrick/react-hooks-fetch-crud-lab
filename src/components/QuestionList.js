import React,{useState,useEffect} from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";


function QuestionList() {
const [questions,setQuestions]=useState([])
    useEffect(() => {
        fetch("http://localhost:4000/questions")
            .then((response) => response.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error("Error fetching questions:", error));
    }, []);
    const handleUpdateCorrectIndex = (id, correctIndex) => {
        fetch(`http://localhost:4000/questions/${id}`, {
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


    return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
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
