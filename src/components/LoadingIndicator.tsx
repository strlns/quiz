import { ReactNode } from "react";
import styles from "../styles/LoadingIndicator.module.css";

type LoadingIndicatorProps = {
  waitFor: any;
  children: ReactNode;
  placeholder?: ReactNode;
  width?: string;
  minHeight?: string;
};

const LoadingIndicator = ({
  waitFor,
  children,
  placeholder,
  width = "100%",
  minHeight = "7.5rem",
}: LoadingIndicatorProps) => {
  return waitFor ? (
    <>{children}</>
  ) : (
    <div className={styles.loading} style={{ width, minHeight }}>
      {placeholder}
    </div>
  );
};

export default LoadingIndicator;
