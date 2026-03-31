// Matches the shape of a Payload `projects` collection document.
// Run `npm run generate:types` to regenerate from your collection definitions.
export interface Project {
  id: string | number;
  title: string;
  category: string;
  year: string;
  description: string;
  live?: string | null;
  github?: string | null;
  featured?: boolean | null;
  updatedAt?: string;
  createdAt?: string;
}
