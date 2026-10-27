import Image from "next/image";
import type { Cat } from "@/lib/content";
import styles from "./CatJudge.module.css";

/*
  Four cats, one judge: four photographs taped in a row. Pick one and read what the
  real model said about it. The verdicts came from the live classifier; the switching
  is plain radio buttons and CSS, so it works without script.
*/
export default function CatJudge({ judge }: { judge: { legend: string; cats: Cat[] } }) {
  return (
    <fieldset className={styles.judge} data-no-turn>
      <legend className="visually-hidden">{judge.legend}</legend>
      <div className={styles.strip}>
        {judge.cats.map((cat, i) => (
          <label key={cat.key} className={styles.thumb}>
            <input className="visually-hidden" type="radio" name="judge-cat" value={i} defaultChecked={i === 0} />
            <Image
              src={cat.picture.src}
              width={cat.picture.width}
              height={cat.picture.height}
              alt={cat.picture.alt}
              sizes="(min-width: 900px) 9vw, 22vw"
            />
            <span className="visually-hidden">{cat.label}</span>
          </label>
        ))}
      </div>
      <p className={styles.verdicts} aria-live="polite">
        {judge.cats.map((cat, i) => (
          <span key={cat.key} className={styles.verdict} data-i={i}>
            The judge: {cat.verdict}
          </span>
        ))}
      </p>
    </fieldset>
  );
}
