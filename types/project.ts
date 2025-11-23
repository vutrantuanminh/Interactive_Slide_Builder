// types/project.ts
export type ProjectStatus = "draft" | "in-progress" | "completed" | "shared";

export interface Project {
  id: string;
  name: string;
  creator: {
    name: string;
    avatar?: string;
  };
  status: ProjectStatus;
  createdAt: string; // ISO string
  updatedAt: string;
  slideCount?: number;
}