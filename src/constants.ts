import system from "./system.json";

export const systemName = system.name;
export const defaultMigratedSystemVersion = "1.0.0" as const;
export const templatesPath = `systems/${systemName}/templates` as const;
export const reactTemplatePath = `${templatesPath}/react-application.hbs` as const;
export const systemMigrationVersion = "systemMigrationVersion" as const;

export const pc = "pc" as const;
