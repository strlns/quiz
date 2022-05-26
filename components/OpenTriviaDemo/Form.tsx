import styles from "../../styles/OpenTriviaApiForm.module.css";
import { FormEvent, FormEventHandler, useState } from "react";
import btnStyles from "../../styles/Button.module.css";

type OpenTriviaApiFormProps = {
  numberOfQuestions: number;
  onChangeNumberOfQuestions: (numberOfQuestions: number) => void;
  onSubmit?: FormEventHandler;
  action?: string;
};

const OpenTriviaApiForm = ({
  numberOfQuestions,
  onChangeNumberOfQuestions,
  onSubmit,
  action,
}: OpenTriviaApiFormProps) => {
  const [isEmpty, setIsEmpty] = useState(false);
  return (
    <form className={styles.form} {...{ onSubmit, action }}>
      <div className={styles.formElement}>
        <label htmlFor="number-of-questions">Number of questions</label>
        <input
          type="number"
          onInput={(event: FormEvent<HTMLInputElement>) => {
            const value = (event.target as HTMLInputElement).value;
            const valueIsEmpty = value === "";
            setIsEmpty(valueIsEmpty);
            if (valueIsEmpty) {
              return;
            } else {
              onChangeNumberOfQuestions(Number(value));
            }
          }}
          value={isEmpty ? "" : numberOfQuestions}
          id="number-of-questions"
          min="1"
          max="50"
        />
      </div>
      <div className={styles.formElement}>
        <button className={`${btnStyles.button} ${styles.submit}`}>
          Get new questions
        </button>
      </div>
    </form>
  );
};

export default OpenTriviaApiForm;
