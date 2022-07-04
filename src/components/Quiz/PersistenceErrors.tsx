import { Dispatch, SetStateAction } from "react";
import { CheckIcon } from "../UserInterface/Icons";
import btnStyles from "../../styles/Button.module.css";
import boxStyles from "../../styles/UtilityStyles.module.css";
import clsx from "clsx";

type PersistenceErrorsProps = {
  errors: string[];
  dismissErrors: Dispatch<void>;
};

const PersistenceErrors = ({
  errors,
  dismissErrors,
}: PersistenceErrorsProps) => {
  if (errors.length === 0) {
    return <></>;
  }
  return (
    <div className={clsx(boxStyles.flex, boxStyles.gap, boxStyles.my4)}>
      {errors.map((error) => (
        <p style={{ color: "red", fontWeight: "bold" }} key={error}>
          {error}
        </p>
      ))}
      <button className={btnStyles.button} onClick={() => dismissErrors()}>
        OK <CheckIcon />
      </button>
    </div>
  );
};

export default PersistenceErrors;
