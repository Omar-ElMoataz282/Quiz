import { Form } from "react-bootstrap";
import { Questions } from "../../Data/Questions";

function QueOptions(props) {
  const showQuestions = Questions.map((_, index) => {
    const isAnswered = props.selectedAnswers[index] !== null;

    return (
      <option
        key={index}
        value={index}
        style={{ color: isAnswered ? "green" : "red" }}
      >
        {`Question ${index + 1}`}
      </option>
    );
  });
  return (
    <Form.Select
      aria-label="select"
      className="w-50 m-auto mb-4"
      value={props.curQue}
      onChange={(e) => {
        props.setCurQue(parseInt(e.target.value));
      }}
    >
      {showQuestions}
    </Form.Select>
  );
}

export default QueOptions;
