import type { ReactNode } from "react";
import { experience, projects } from "@/lib/content";
import { cssVars } from "@/lib/css";
import NotebookController from "./behaviour/NotebookController";
import Cat from "./Cat";
import Desk from "./Desk";
import Nav from "./Nav";
import { AboutPage, BackCoverFace, ContentsPage, CoverFace, ProjectPage, RolePage } from "./Pages";
import styles from "./Notebook.module.css";

type Face = { label: string; chapter?: string; kind?: "cover"; node: ReactNode };

/*
  The faces in reading order. Even faces are right-hand pages (the front of a leaf),
  odd faces are left-hand pages (its back). Six leaves, twelve faces.
*/
function faces(): Face[] {
  const [bits, procogia, jimmy, wat] = experience.roles;
  const [flight, cat, chess, worldCup] = projects.list;
  return [
    { label: "Cover", chapter: "cover", kind: "cover", node: <CoverFace /> },
    { label: "Contents", chapter: "contents", node: <ContentsPage /> },
    { label: "Page 1, about me", chapter: "about", node: <AboutPage /> },
    { label: `Page 2, ${bits.title}`, chapter: "experience", node: <RolePage role={bits} side="left" page={2} chapter /> },
    { label: `Page 3, ${procogia.title}`, node: <RolePage role={procogia} side="right" page={3} /> },
    { label: `Page 4, ${jimmy.title}`, node: <RolePage role={jimmy} side="left" page={4} /> },
    { label: `Page 5, ${wat.title}`, node: <RolePage role={wat} side="right" page={5} /> },
    { label: `Page 6, ${flight.title}`, chapter: "projects", node: <ProjectPage project={flight} side="left" page={6} chapter /> },
    { label: `Page 7, ${cat.title}`, node: <ProjectPage project={cat} side="right" page={7} /> },
    { label: `Page 8, ${chess.title}`, node: <ProjectPage project={chess} side="left" page={8} /> },
    { label: `Page 9, ${worldCup.title}`, node: <ProjectPage project={worldCup} side="right" page={9} /> },
    { label: "Back cover, thanks for reading", kind: "cover", node: <BackCoverFace /> },
  ];
}

export default function Notebook() {
  const all = faces();
  const leaves = Array.from({ length: all.length / 2 }, (_, i) => [all[2 * i], all[2 * i + 1]] as const);

  return (
    <div className={styles.stage} data-notebook>
      <Nav />
      <div className={styles.window}>
        <div className={styles.book} data-book data-show="right" style={cssVars({ "--n": leaves.length })}>
          {leaves.map(([front, back], i) => (
            <div key={i} className={styles.leaf} data-leaf={i} style={cssVars({ "--i": i })}>
              <section
                className={`${styles.face} ${styles.front} ${front.kind === "cover" ? styles.coverFace : ""}`}
                id={front.chapter}
                data-face={2 * i}
                data-chapter={front.chapter}
                aria-label={front.label}
              >
                {front.node}
              </section>
              <section
                className={`${styles.face} ${styles.back} ${back.kind === "cover" ? styles.coverFace : ""}`}
                id={back.chapter}
                data-face={2 * i + 1}
                data-chapter={back.chapter}
                aria-label={back.label}
              >
                {back.node}
              </section>
            </div>
          ))}
          <div className={styles.rings} aria-hidden="true" />
        </div>
      </div>
      <Desk />
      <Cat />
      <p className="visually-hidden" aria-live="polite" data-announce />
      <NotebookController />
    </div>
  );
}
