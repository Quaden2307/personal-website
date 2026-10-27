import { cat } from "@/lib/content";
import YarnController from "./behaviour/YarnController";
import styles from "./Cat.module.css";

/* The cat's outline, drawn 190 wide and lying on y = 106: chest, back, the hip rolled onto its side, the rump. */
const BODY =
  "M14,106 C8,92 12,76 26,70 C38,64 56,62 72,63 C88,64 100,63 114,57 C126,51 136,48 148,49 C164,50 174,65 174,83 C174,96 171,103 166,106 Z";
/* The tail runs out along the desk from under the rump and curls up; its last quarter is darker. */
const TAIL = "M154,100 C168,108 183,106 183,93 C183,85 179,80 174,80";

/* Running, in the same box: the body on four legs, the tail held up behind. */
const TRUNK =
  "M36,58 C36,44 50,36 70,36 C96,36 118,32 142,33 C160,34 170,44 168,56 C166,68 156,74 142,74 C118,75 94,77 70,75 C50,73 36,70 36,58 Z";
const RUN_TAIL = "M162,46 C178,42 188,28 184,14 C182,8 177,6 173,8";

/* The face, a brown mask with the white inverted V. Lying down, its eyes follow the ball. */
function Face({ follow }: { follow?: boolean }) {
  return (
    <>
      <path className={styles.ear} d="M7,52 C6,42 7,32 11,25 C12,23 14,23 16,24 C22,29 26,34 29,38 Z" />
      <path className={styles.ear} d="M31,38 C34,34 38,29 44,24 C46,23 48,23 49,25 C53,32 54,42 53,52 Z" />
      <path className={styles.earIn} d="M11,42 C11,36 12,31 14,28 C18,31 21,34 23,37 Z" />
      <path className={styles.earIn} d="M37,37 C39,34 42,31 46,28 C48,31 49,36 49,42 Z" />
      <ellipse className={styles.fur} cx="30" cy="56" rx="25" ry="21" />
      <path
        className={styles.mask}
        d="M5.72,61 A25,21 0 1 1 54.28,61 C50,63.5 44,64.5 37,63 L30,44 L23,63 C16,64.5 10,63.5 5.72,61 Z"
      />
      <g className={follow ? styles.eyes : undefined} data-eyes={follow ? "" : undefined}>
        <ellipse className={styles.eye} cx="19.5" cy="54" rx="4.6" ry="4.4" />
        <ellipse className={styles.eye} cx="40.5" cy="54" rx="4.6" ry="4.4" />
        <circle className={styles.pupil} cx="19.9" cy="52.6" r="2.4" />
        <circle className={styles.pupil} cx="40.9" cy="52.6" r="2.4" />
        <circle className={styles.glint} cx="18.4" cy="51.6" r="0.9" />
        <circle className={styles.glint} cx="39.4" cy="51.6" r="0.9" />
      </g>
      <path className={styles.nose} d="M26.8,60.4 Q30,59.6 33.2,60.4 Q31.4,63.4 30,63.8 Q28.6,63.4 26.8,60.4 Z" />
      <path
        className={styles.whiskers}
        d="M30,63.8 V65.6 M30,65.6 Q28,67.6 25.8,66.4 M30,65.6 Q32,67.6 34.2,66.4 M20,63.5 L4,60.5 M20,65.5 L3,66 M20,67.5 L5.5,71.5 M40,63.5 L56,60.5 M40,65.5 L57,66 M40,67.5 L54.5,71.5"
      />
    </>
  );
}

/* The ball of yarn: a rose ball wound with darker strands. */
function Ball({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle className={styles.ballFill} cx="16" cy="16" r="16" />
      <path
        className={styles.strand}
        d="M9,3.2 C14,10 14,22 9,28.8 M5,6.4 C8.5,12 8.5,20 5,25.6 M15,1.2 C22,6 27,12 30.6,20.4 M13.4,7 C20,10.4 25,16.6 27.4,25.8 M12.4,13.6 C18,16.6 21.6,22 22.6,30"
      />
    </svg>
  );
}

/*
  A cat lying on the desk on the right of the notebook, batting at a ball of yarn that hangs
  from the top of the screen. It is Caden's cat, a seal bicolour ragdoll: white, with a fawn
  saddle, a brown mask, dark ears and tail, blue eyes. The yarn can be picked up and thrown,
  and the cat goes after it (lib/yarn.ts); the ball in play and its thread are drawn over
  the whole desk. data-no-turn keeps a click here from turning the page.
*/
export default function Cat() {
  // GingerInk has letters only, so a closing "!" is drawn in the same marker, kept on the last word's line.
  const bang = cat.hint.endsWith("!");
  const words = bang ? cat.hint.slice(0, -1) : cat.hint;
  const lead = words.slice(0, words.lastIndexOf(" ") + 1);

  return (
    <>
      <div className={styles.zone} data-cat data-no-turn>
        <div className={styles.scene} data-scene>
          <div className={styles.cat} data-cat-body>
            <svg className={styles.lying} viewBox="0 0 190 106" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="cat-body">
                  <path d={BODY} />
                </clipPath>
              </defs>

              <g className={styles.tail}>
                <path className={styles.tailFur} d={TAIL} />
                <path className={styles.tailTip} pathLength={100} d={TAIL} />
              </g>

              <path className={styles.fur} d={BODY} />
              <g className={styles.saddle} clipPath="url(#cat-body)">
                <path d="M70,50 L180,40 L180,90 C170,86 160,80 148,77 C134,74 122,80 108,78 C96,76 86,76 79,72 C74,69 71,66 70,61 Z" />
                <ellipse cx="148" cy="84" rx="25" ry="21" />
              </g>

              {/* The hind foot, under the hip. */}
              <path className={styles.fur} d="M116,106 C110,106 109,96 116,96 L156,96 C160,96 162,106 156,106 Z" />
              <path className={styles.toes} d="M116.8,97.6 V100.6 M120.8,97 V100.2" />

              {/* The raised front paw, pads up to the ball; it turns at the shoulder. */}
              <g className={styles.paw} data-paw>
                <path className={styles.leg} d="M62,78 Q63.5,46 55.5,20" />
                <circle className={styles.fur} cx="54.5" cy="12.4" r="9" />
                <ellipse className={styles.pad} cx="54.1" cy="13.4" rx="3.6" ry="2.9" transform="rotate(-35 54.1 13.4)" />
                <circle className={styles.pad} cx="48.3" cy="11.2" r="1.7" />
                <circle className={styles.pad} cx="49.5" cy="6.8" r="1.7" />
                <circle className={styles.pad} cx="53.5" cy="4.8" r="1.7" />
              </g>

              {/* The other front paw, on the desk. */}
              <path className={styles.fur} d="M9,106 C3,106 3,96 10,96 L36,96 L36,106 Z" />
              <path className={styles.toes} d="M9.4,97.4 V100.6 M13.4,96.8 V100.2" />

              {/* The head, tilted, looking up at the ball. */}
              <g className={styles.head} data-head>
                <Face follow />
              </g>
            </svg>

            {/* Running after the ball: a trot, each leg swinging with the opposite one on the far side. */}
            <svg className={styles.runner} viewBox="0 0 190 106" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="cat-run-body">
                  <path d={TRUNK} />
                </clipPath>
              </defs>
              <path className={`${styles.limbFar} ${styles.farFore}`} d="M60,62 L56,100" />
              <path className={`${styles.limbFar} ${styles.farHind}`} d="M146,58 L152,100" />
              <g className={styles.trunk}>
                <path className={styles.tailFur} d={RUN_TAIL} />
                <path className={styles.tailTip} pathLength={100} d={RUN_TAIL} />
                <path className={styles.fur} d={TRUNK} />
                <path
                  className={styles.saddle}
                  clipPath="url(#cat-run-body)"
                  d="M64,24 L178,24 L178,50 C162,48 148,52 130,50 C112,48 98,50 86,50 C76,48 70,42 64,28 Z"
                />
                <ellipse className={styles.fur} cx="141" cy="58" rx="19" ry="16" />
              </g>
              <path className={`${styles.limb} ${styles.nearFore}`} d="M68,64 L64,101" />
              <path className={`${styles.limb} ${styles.nearHind}`} d="M138,62 L142,101" />
              <g className={styles.trunk}>
                <g transform="translate(6,-22)">
                  <Face />
                </g>
              </g>
            </svg>
          </div>

          {/* Written on the desk beside the yarn, with an arrow to it. */}
          <p className={styles.hint} aria-hidden="true">
            {lead}
            <span className={styles.last}>
              {words.slice(lead.length)}
              {bang && (
                <svg className={styles.bang} viewBox="0 0 12 30" focusable="false">
                  <path d="M2,3 C2,0.5 10,0.5 10,3 L7.6,20 C7.4,21.8 4.6,21.8 4.4,20 Z" />
                  <circle cx="6" cy="26" r="3.2" />
                </svg>
              )}
            </span>
          </p>
          <svg className={styles.hintArrow} viewBox="0 0 30 24" aria-hidden="true" focusable="false">
            <path d="M27,3 C20,4 13,9 6,19 M5.5,12.5 L5.8,19.6 L12.6,18" />
          </svg>

          <div className={styles.hang} data-hang>
            <span className={styles.string} aria-hidden="true" />
            <button className={styles.yarn} type="button" aria-label={cat.yarn.label} data-yarn>
              <Ball className={styles.ball} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.play} data-play data-no-turn hidden aria-hidden="true">
        <svg className={styles.thread} focusable="false">
          <path className={styles.threadLine} data-thread />
        </svg>
        <span className={styles.playBall} data-play-ball>
          <Ball className={styles.ball} />
        </span>
      </div>
      <YarnController />
    </>
  );
}
