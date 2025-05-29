import { Button, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Questions } from "../../Data/Questions";
import Result from "../Result/Result";
import Timer from "../Timer/Timer";

function Quiz() {
  const [curQue, setCurQue] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(Questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  // Add a useEffect to set showResult to true when finished is true
  useEffect(() => {
    if (finished) {
      setShowResult(true);
    }
  }, [finished]);

  // Load saved answers and current question from localStorage on component mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem("Answers");
    setCurQue(parseInt(localStorage.getItem("CurrentQuestion")) || 0);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  // Save answers and current question to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("Answers", JSON.stringify(selectedAnswers));
    localStorage.setItem("CurrentQuestion", curQue);
  }, [selectedAnswers, curQue]);

  // Function to handle the answer change
  function handleAnswerChange(answer) {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[curQue] = answer;
    setSelectedAnswers(updatedAnswers);
  }

  // Function to handle the next button click
  function handleNext() {
    if (curQue < Questions.length - 1) {
      setCurQue(curQue + 1);
    } else {
      setShowResult(true);
    }
  }

  // Function To handle the previous button click
  function handlePrevious() {
    if (curQue > 0) {
      setCurQue(curQue - 1);
    }
  }

  // Function to calculate the score
  function getScore() {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === Questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  }

  // Function to show current question
  const currentQuestion = Questions[curQue];
  const showOptions = currentQuestion.answer.map((option, index) => (
    <Form.Check
      key={index}
      type="radio"
      label={option}
      id={`${curQue}-${index}`}
      value={option}
      name={`question-${curQue}`}
      checked={selectedAnswers[curQue] === option}
      onChange={() => {
        handleAnswerChange(option);
      }}
      className="custom-point mb-3"
    />
  ));

  return (
    <Container className="min-vh-100 d-flex align-items-center">
      {!showResult ? (
        <div className="bg-white w-100">
          <div className="p-5 pb-2 d-flex justify-content-between align-items-center">
            <div>
              <h3>{curQue === 0 ? `Questions:` : `Question ${curQue + 1}`}</h3>
              <p>{curQue === 0 && "Fill out this quiz with right answer"}</p>
            </div>
            <Timer setFinished={setFinished} />
          </div>

          <hr />

          <div className="px-5 py-2">
            <p className="fw-bold">{currentQuestion.question} ?</p>
            {showOptions}
          </div>

          <hr />

          <div
            className="px-4 pb-3 d-flex"
            style={{
              justifyContent: curQue === 0 ? "flex-end" : "space-between",
            }}
          >
            <Button
              style={{ display: curQue === 0 ? "none" : "block" }}
              className="py-2 px-4"
              onClick={handlePrevious}
            >
              Prev
            </Button>

            <Button className="py-2 px-4" onClick={handleNext}>
              {curQue < Questions.length - 1 ? "Next" : "Submit"}
            </Button>
          </div>
        </div>
      ) : (
        <Result
          score={getScore()}
          questions={Questions}
          questionsNums={Questions.length}
          answers={selectedAnswers}
        />
      )}
    </Container>
  );
}

export default Quiz;
