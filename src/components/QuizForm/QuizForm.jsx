import { useForm } from "react-hook-form";
import "./QuizForm.css";

function QuizForm({ onGameStart }) {
  const { register, handleSubmit, reset } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onGameStart(data);
        reset();
      })}
    >
      <div className="form-field">
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-control"
        >
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Books</option>
          <option value="11">Film</option>
          <option value="12">Music</option>
          <option value="13">Musicals &amp; Theatres</option>
          <option value="14">Television</option>
          <option value="15">Video Games</option>
          <option value="16">Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Computers</option>
          <option value="19">Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Comics</option>
          <option value="30">Gadgets</option>
          <option value="31">Japanese Anime &amp; Manga</option>
          <option value="32">Cartoon &amp; Animations</option>{" "}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="difficulty" className="form-label">
          Difficulty:
        </label>
        <select
          {...register("difficulty")}
          id="difficulty"
          className="form-control"
        >
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button className="btn-primary" type="submit">
        Start Quiz
      </button>
    </form>
  );
}

export default QuizForm;
