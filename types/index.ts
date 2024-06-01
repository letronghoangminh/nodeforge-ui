export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type Repository = {
  name: string;
  fullName: string;
  url: string;
  ownerName: string;
};

export type NewDeploymentFrontEnd = {
  type: "FRONTEND";
  framework: "NEXT" | "VUE" | "REACT" | "ANGULAR" | "SVELTE" | "NUXT" | "OTHER";
  name: string;
  repositoryName: string;
  repositoryBranch: string;
  repositoryUrl: string;
  repositoryOwner: string;
  subdomain: string;
  envVars: Record<string, string>;
};

export type NewDeploymentBackEnd = {
  type: "BACKEND";
  framework: "NESTJS";
  name: string;
  command: string;
  repositoryName: string;
  repositoryBranch: string;
  repositoryUrl: string;
  repositoryOwner: string;
  subdomain: string;
  envVars: Record<string, string>;
};

export type NewDeploymentStatic = NewDeploymentFrontEnd | NewDeploymentBackEnd;
