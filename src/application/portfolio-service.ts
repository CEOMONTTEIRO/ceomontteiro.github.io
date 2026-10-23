import {
  archive,
  identity,
  projects,
  stackGroups,
  type ProjectId,
} from "@/domain/portfolio";

export function getPortfolio() {
  return { identity, projects, stackGroups, archive };
}

export function findProject(id: ProjectId) {
  return projects.find((project) => project.id === id);
}
