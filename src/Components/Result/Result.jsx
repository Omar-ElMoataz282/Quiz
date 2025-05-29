function Result(props) {
  const showQuestion = props.questions.map((question, index) => (
    <div key={index} className="px-4 mb-4">
      <h3 className="mb-3">
        Q{index + 1}: {question.question}
      </h3>

      <div className="d-flex justify-content-between flex-wrap border-bottom">
        <p
          className="fw-bold"
          style={{
            color:
              props.answers[index] === question.correctAnswer ? "green" : "red",
          }}
        >
          Your Anwser:{" "}
          {props.answers[index] ? props.answers[index] : " Not Answered"}
        </p>

        {props.answers[index] !== question.correctAnswer && (
          <p className="fw-bold text-success">
            Right Anwser: {question.correctAnswer}
          </p>
        )}
      </div>
    </div>
  ));

  return (
    <div className="bg-white w-100">
      <div className="px-5 py-3">
        <h1 className="text-center mb-5">Quiz Result</h1>
        <h2 className="text-center">
          Your Score is: <br className="d-inline d-md-none" />
          {props.score} out of {props.questionsNums}
        </h2>
      </div>

      <hr />
      <div className="pt-3">{showQuestion}</div>
    </div>
  );
}

export default Result;
