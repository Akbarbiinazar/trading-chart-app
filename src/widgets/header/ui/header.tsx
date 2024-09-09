import { Link } from "react-router-dom";

import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles["header__wrapper"]}>
        <Link to="/">
          <h2 className={styles["header__title"]}>Trading Test</h2>
        </Link>
      </div>
    </header>
  );
}
