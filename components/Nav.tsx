import styles from "./Nav.module.css";

/* The desk's top edge: the monogram, back to the cover. */
export default function Nav() {
  return (
    <header className={styles.bar}>
      <a className={styles.mark} href="#cover" data-goto="cover">
        CS<span className="visually-hidden">, Caden Sun, back to the cover</span>
      </a>
    </header>
  );
}
