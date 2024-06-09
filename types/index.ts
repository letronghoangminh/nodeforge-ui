export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type Repository = {
  id?: number;
  name: string;
  fullName: string;
  url: string;
  ownerName: string;
};

export type Deployment = {
  id: number;
  type: "FRONTEND" | "BACKEND";
  framework:
    | "NEXT"
    | "VUE"
    | "REACT"
    | "ANGULAR"
    | "SVELTE"
    | "NUXT"
    | "NESTJS"
    | "OTHER";
  repositoryId: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  name: string;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
  repository: Repository;
  amplifyConfiguration: {
    id: number;
    appId: string;
    webhookUrl: string | null;
    environmentId: number;
    subdomain: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  ecsConfiguration: any;
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

export type ProfileType = {
  id: number;
  email: string;
  role: Role;
  phoneNumber: string;
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
