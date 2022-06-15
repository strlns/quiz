import boxStyles from "../../styles/UtilityStyles.module.css";
import btnStyles from "../../styles/Button.module.css";
import navStyles from "../../styles/QuestionNavigation.module.css";
import React, { Dispatch } from "react";
import { ArrowLeft, ArrowRight } from "../Icons/Icons";
import clsx from "clsx";

type NavigationProps = {
  next?: Dispatch<void>;
  prev?: Dispatch<void>;
  nextDisabled?: boolean;
  prevDisabled?: boolean;
};

const Finished = ({
  next,
  prev,
  nextDisabled,
  prevDisabled,
}: NavigationProps) => {
  return (
    <div
      className={clsx(
        boxStyles.flex,
        boxStyles.setGapM,
        boxStyles.gap,
        boxStyles.justifyEvenly
      )}
      style={
        { marginTop: "1rem", "--icon-size": "3rem" } as React.CSSProperties
      }
    >
      {prev ? (
        <button
          type="button"
          onClick={() => !prevDisabled && prev()}
          title={"Go back"}
          className={clsx({
            [btnStyles.bigButton]: true,
            [navStyles.disabled]: prevDisabled,
          })}
        >
          <ArrowLeft />
        </button>
      ) : (
        <button
          disabled
          className={btnStyles.bigButton}
          style={{
            background: "none",
            border: "none",
            boxShadow: "none",
            outline: "none",
          }}
        >
          <span
            style={{
              minWidth: "var(--icon-size)",
              display: "inline-block",
            }}
          ></span>
        </button>
      )}
      {next ? (
        <button
          type="button"
          onClick={() => !nextDisabled && next()}
          className={clsx({
            [btnStyles.bigButton]: true,
            [navStyles.disabled]: nextDisabled,
          })}
          title={"Go forward"}
        >
          <ArrowRight />
        </button>
      ) : null}
    </div>
  );
};
export default Finished;
