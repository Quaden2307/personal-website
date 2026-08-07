export type Stop = {
  id: string;
  nav: string;
};

// The line, in order. Station codes live in each station component;
// these are the wayfinding labels the route rail shows.
export const STOPS: Stop[] = [
  { id: "launch", nav: "Launch" },
  { id: "about", nav: "About" },
  { id: "education", nav: "Education" },
  { id: "experience", nav: "Experience" },
  { id: "projects", nav: "Projects" },
  { id: "skills", nav: "Skills" },
  { id: "contact", nav: "Contact" },
];
