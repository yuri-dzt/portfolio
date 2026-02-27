export type Project = {
  name: string;
  type: string;
  status: "developing" | "paused" | "active" | "discontinued";
  description: string;
  stack: string[];
  link?: string;
};
