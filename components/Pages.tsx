import Image from "next/image";
import type { ReactNode } from "react";
import { about, backCover, contents, cover, experience, type Project, type Role } from "@/lib/content";
import { cssVars } from "@/lib/css";
import CatJudge from "./CatJudge";
import Clip from "./Clip";
import styles from "./Pages.module.css";

type Side = "right" | "left";

/* A ruled sheet: the writing sits on the lines, the printed page number in the outer corner. */
function Paper({ side, page, children }: { side: Side; page?: number; children: ReactNode }) {
  return (
    <div className={styles.paper} data-side={side}>
      <div className={styles.sheet}>{children}</div>
      {page ? (
        <span className={styles.folio} aria-hidden="true">
          {page}
        </span>
      ) : null}
      <Corner side={side} />
    </div>
  );
}

/* The folded corner that turns the page; the whole page also turns on a click. */
function Corner({ side }: { side: Side }) {
  return (
    <button
      type="button"
      className={styles.corner}
      data-turn={side === "right" ? "next" : "prev"}
      aria-label={side === "right" ? "Next page" : "Previous page"}
    />
  );
}

/* A photograph taped onto the page. */
function Taped({ rows, tilt = -1, children }: { rows: number; tilt?: number; children: ReactNode }) {
  return (
    <figure className={styles.taped} style={cssVars({ "--rows": rows, "--tilt": `${tilt}deg` })}>
      {children}
    </figure>
  );
}

export function CoverFace() {
  return (
    <div className={styles.cover} data-side="right">
      <div className={styles.label}>
        {cover.label.map((row, i) => (
          <div key={row.field} className={styles.labelRow}>
            <span className={styles.field}>{row.field}</span>
            {i === 0 ? (
              <h1 className={styles.entryName}>{row.entry}</h1>
            ) : (
              <span className={styles.entry}>{row.entry}</span>
            )}
          </div>
        ))}
      </div>
      <p className={styles.coverNote}>{cover.note}</p>
      <p className={styles.coverOpen}>
        <span className={styles.openPointer}>{cover.open.pointer}</span>
        <span className={styles.openTouch}>{cover.open.touch}</span>
        <svg className={styles.openArrow} viewBox="0 0 36 14" aria-hidden="true">
          <path d="M2 8.5c7-3 16-3.6 28-1.2M24.5 2.5l6.5 5-7 4.6" />
        </svg>
      </p>
      <Corner side="right" />
    </div>
  );
}

/* The back cover: how to reach Caden, on a label like the front cover's, and a way back to the start. */
export function BackCoverFace() {
  return (
    <div className={`${styles.cover} ${styles.backCover}`} data-side="left">
      <ul className={styles.label}>
        {backCover.links.map((link) => (
          <li key={link.field} className={styles.labelRow}>
            <span className={styles.field}>{link.field}</span>
            <a
              className={styles.contact}
              href={link.href}
              {...(link.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a className={styles.restart} href="#cover" data-goto="cover">
        <svg viewBox="0 0 22 22" aria-hidden="true">
          <path d="M8 4 3 9l5 5M3.5 9H14a5 5 0 0 1 0 10h-4" />
        </svg>
        {backCover.restart}
      </a>
      <Corner side="left" />
    </div>
  );
}

export function ContentsPage() {
  return (
    <Paper side="left">
      <h2 className={styles.title}>{contents.title}</h2>
      <ol className={styles.toc}>
        {contents.entries.map((entry) => (
          <li key={entry.chapter}>
            <button type="button" className={styles.tocEntry} data-goto={entry.chapter}>
              <span className={styles.tocTitle}>{entry.title}</span>
              <span className={styles.tocPage}>{entry.page}</span>
            </button>
          </li>
        ))}
      </ol>
    </Paper>
  );
}

export function AboutPage() {
  return (
    <Paper side="right" page={1}>
      <h2 className={styles.title}>{about.title}</h2>
      {about.paragraphs.map((runs, i) => (
        <p key={i} className={styles.para}>
          {runs.map((run, j) => (typeof run === "string" ? run : <mark key={j}>{run.mark}</mark>))}
        </p>
      ))}
      <figure className={`${styles.taped} ${styles.portrait}`}>
        <Image
          src={about.portrait.src}
          width={about.portrait.width}
          height={about.portrait.height}
          alt={about.portrait.alt}
          sizes="(min-width: 900px) 18vw, 50vw"
        />
      </figure>
    </Paper>
  );
}

/* Snapshots are taped in a little crooked, each its own way. */
const SNAP_TILTS = [-3, 2, -1.5];

/* A hand-drawn arrow from a note down to what it points at. */
function Arrow() {
  return (
    <svg viewBox="0 0 34 26" aria-hidden="true">
      <path d="M2 4c12-1 22 4 26 17M21.5 17.5l6.8 4.6 2.6-7.8" />
    </svg>
  );
}

export function RolePage({ role, side, page, chapter }: { role: Role; side: Side; page: number; chapter?: boolean }) {
  return (
    <Paper side={side} page={page}>
      {chapter ? <h2 className={styles.title}>{experience.title}</h2> : null}
      <h3 className={styles.heading}>{role.title}</h3>
      <p className={styles.meta}>{role.dates}</p>
      <p className={styles.para}>{role.summary}</p>
      {role.tools ? <p className={styles.tools}>{role.tools}</p> : null}
      {role.photos ? (
        <figure className={styles.album}>
          <figcaption className={styles.scribble}>
            {role.photos.note}
            <Arrow />
          </figcaption>
          <div className={styles.albumRow}>
            {role.photos.pictures.map((picture, i) => (
              <span key={picture.src} className={styles.snap} style={cssVars({ "--tilt": `${SNAP_TILTS[i % 3]}deg` })}>
                <Image
                  src={picture.src}
                  width={picture.width}
                  height={picture.height}
                  alt={picture.alt}
                  sizes="(min-width: 900px) 12vw, 30vw"
                />
              </span>
            ))}
          </div>
        </figure>
      ) : null}
      {role.reading ? (
        <figure className={styles.album}>
          <figcaption className={styles.scribble}>
            {role.reading.note}
            <Arrow />
          </figcaption>
          <a className={styles.reading} href={role.reading.href} target="_blank" rel="noreferrer">
            <span className={styles.readingTitle}>{role.reading.title}</span>
            <span className={styles.readingSource}>
              {role.reading.authors}, {role.reading.source}
            </span>
          </a>
        </figure>
      ) : null}
      <div className={styles.logoLine}>
        <Image
          className={role.logo.width / role.logo.height < 1.5 ? `${styles.logo} ${styles.logoSquare}` : styles.logo}
          src={role.logo.src}
          width={role.logo.width}
          height={role.logo.height}
          alt={role.logo.alt}
          sizes="160px"
        />
      </div>
    </Paper>
  );
}

export function ProjectPage({
  project,
  side,
  page,
  chapter,
}: {
  project: Project;
  side: Side;
  page: number;
  chapter?: boolean;
}) {
  return (
    <Paper side={side} page={page}>
      {chapter ? <h2 className={styles.title}>Projects</h2> : null}
      <h3 className={styles.heading}>{project.title}</h3>
      <p className={styles.meta}>{project.category}</p>

      {project.judge ? (
        <CatJudge judge={project.judge} />
      ) : project.clip ? (
        <Taped rows={5} tilt={1}>
          <Clip src={project.clip.src} type={project.clip.type} poster={project.clip.poster} label={project.clip.poster.alt} />
        </Taped>
      ) : project.picture ? (
        <Taped rows={5} tilt={-1}>
          <Image
            src={project.picture.src}
            width={project.picture.width}
            height={project.picture.height}
            alt={project.picture.alt}
            sizes="(min-width: 900px) 30vw, 70vw"
          />
        </Taped>
      ) : null}

      <p className={styles.para}>{project.summary}</p>
      {project.facts.length ? (
        <dl className={styles.facts}>
          {project.facts.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className={styles.links}>
        {project.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
            <span className="visually-hidden"> for {project.title}</span>
          </a>
        ))}
      </p>
    </Paper>
  );
}
