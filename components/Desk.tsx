import { desk } from "@/lib/content";
import styles from "./Desk.module.css";

/* Half-centimetre marks along the ruler, 0 to 15 cm. */
const MARKS = Array.from({ length: 31 }, (_, i) => i);

/* The pencil case seen from above: its fabric, with the zip opened along the right half, and the opening. */
const FABRIC =
  "M46 6H294A44 44 0 0 1 338 50Q246 20 150 62Q246 106 338 80V84A44 44 0 0 1 294 128H46A44 44 0 0 1 2 84V50A44 44 0 0 1 46 6Z";
const MOUTH = "M150 62Q246 20 338 50V80Q246 106 150 62Z";

/*
  A pencil case spilled on the desk beside the notebook. The pencil, the eraser and
  the sticky note are the ways to get in touch (email, GitHub, LinkedIn); the rest is just
  what falls out of a pencil case. The ruler and the highlighter, still half inside, lie
  between the case's lining and its fabric, so they come out of the open zip.
  data-no-turn keeps a click on the desk from turning the page.
*/
export default function Desk() {
  const { pencil, eraser, note } = desk;
  return (
    <nav className={styles.desk} data-no-turn aria-label={desk.label}>
      <svg className={`${styles.case} ${styles.lining}`} viewBox="0 0 340 130" aria-hidden="true" focusable="false">
        <path d={MOUTH} />
      </svg>

      <svg className={`${styles.thing} ${styles.ruler}`} viewBox="0 0 330 30" aria-hidden="true" focusable="false">
        <rect className={styles.rulerBody} width="330" height="30" rx="3" />
        {MARKS.map((i) => (
          <rect key={i} className={styles.ink} x={10 + i * 10.4} width="1.1" height={i % 2 ? 5 : 9} />
        ))}
        {MARKS.filter((i) => i % 2 === 0).map((i) => (
          <text key={i} className={styles.rulerNumber} x={10.5 + i * 10.4} y="19.5" textAnchor="middle">
            {i / 2}
          </text>
        ))}
      </svg>

      <svg className={`${styles.thing} ${styles.highlighter}`} viewBox="0 0 170 30" aria-hidden="true" focusable="false">
        <polygon className={styles.felt} points="2,11 14,5 14,25 2,19" />
        <rect className={styles.barrel} x="14" y="3" width="124" height="24" rx="4" />
        <rect className={styles.cap} x="132" y="2" width="36" height="26" rx="6" />
        <rect className={styles.capClip} x="138" y="12" width="26" height="6" rx="3" />
      </svg>


      <svg className={`${styles.case} ${styles.fabric}`} viewBox="0 0 340 130" aria-hidden="true" focusable="false">
        <path className={styles.caseFabric} d={FABRIC} />
        <path className={styles.stitch} d="M140 14H46A36 36 0 0 0 10 50V84A36 36 0 0 0 46 120H294A36 36 0 0 0 330 92" />
        <path className={styles.teeth} d="M22 62H150M150 62Q246 20 338 50M150 62Q246 106 338 80" />
        <rect className={styles.pull} x="122" y="56" width="24" height="12" rx="4" />
        <circle className={styles.pullHole} cx="128.5" cy="62" r="2.2" />
      </svg>

      <a className={`${styles.obj} ${styles.pencil}`} href={pencil.href} aria-label={pencil.name}>
        <span className={styles.pencilCap} aria-hidden="true" />
        <span className={styles.pencilBody}>
          <span className={styles.pencilText}>{pencil.text}</span>
        </span>
        <svg
          className={styles.pencilTip}
          viewBox="0 0 42 26"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <polygon className={styles.wood} points="0,0 42,13 0,26" />
          <polygon className={styles.woodShade} points="0,13 42,13 0,26" />
          <path className={styles.paintSide} d="M0,0 L1,0.31 Q8,3 2,6 L0,6 Z" />
          <path className={styles.paint} d="M0,6 L2,6 Q13,12.5 2,19 L0,19 Z" />
          <path className={styles.paintSide} d="M0,19 L2,19 Q8,23 1,25.69 L0,26 Z" />
          <polygon className={styles.lead} points="28,8.67 42,13 28,17.33" />
        </svg>
      </a>

      <svg className={`${styles.thing} ${styles.sharpener}`} viewBox="0 0 36 28" aria-hidden="true" focusable="false">
        <rect className={styles.sharpenerBody} width="36" height="28" rx="4" />
        <circle className={styles.sharpenerHole} cx="13" cy="14" r="6.5" />
        <rect className={styles.sharpenerBlade} x="21" y="4" width="10" height="20" rx="1.5" />
      </svg>

      <svg className={`${styles.thing} ${styles.clip} ${styles.clipOne}`} viewBox="0 0 16 40" aria-hidden="true" focusable="false">
        <path d="M5 9V30A3.5 3.5 0 0 0 12 30V6A4.5 4.5 0 0 0 3 6V33A6 6 0 0 0 15 33V12" />
      </svg>
      <svg className={`${styles.thing} ${styles.clip} ${styles.clipTwo}`} viewBox="0 0 16 40" aria-hidden="true" focusable="false">
        <path d="M5 9V30A3.5 3.5 0 0 0 12 30V6A4.5 4.5 0 0 0 3 6V33A6 6 0 0 0 15 33V12" />
      </svg>

      <a
        className={`${styles.obj} ${styles.eraser}`}
        href={eraser.href}
        target="_blank"
        rel="noreferrer"
        aria-label={eraser.name}
      >
        <span className={styles.sleeve}>
          <span className={styles.brand}>{eraser.brand}</span>
          <span className={styles.model}>{eraser.model}</span>
        </span>
      </a>
      <a className={`${styles.obj} ${styles.note}`} href={note.href} target="_blank" rel="noreferrer" aria-label={note.name}>
        <span className={styles.noteWord}>{note.word}</span>
        <span className={styles.noteHandle}>{note.handle}</span>
      </a>
    </nav>
  );
}
