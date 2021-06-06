import { registerSettings } from "./module/settings";
import { preloadTemplates } from "./module/preloadTemplates";
import { DIM41Actor } from "./module/DIM41Actor";
import { DIM41ActorSheetClass } from "./module/DIM41ActorSheetClass";
import system from "./system.json";
import { migrateWorld } from "./migrations/migrateWorld";
import { dim41SettingsClassInstance } from "./module/DIM41SettingsClass";
import { getSystemMigrationVersion } from "./settingsHelpers";
import { defaultMigratedSystemVersion, pc, systemName } from "./constants";

// Initialize system
Hooks.once("init", async function () {
  console.log(`${systemName} | Initializing system`);
  // Assign custom classes and constants here

  // Register custom system settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // XXX TS needs going over here
  CONFIG.Actor.entityClass = (DIM41Actor as any);

  // Register custom sheets (if any)
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(
    systemName,
    DIM41ActorSheetClass,
    {
      makeDefault: true,
      types: [pc],
    });
});

// Setup system
Hooks.once("setup", function () {
  // Do anything after initialization but before ready
});

// Migration hook
Hooks.on("ready", async () => {
  if (!game.user.isGM) { return; }

  const currentVersion = getSystemMigrationVersion();
  // newest version that needs a migration (make this the current version when
  // you introduce a new migration)
  const NEEDS_MIGRATION_VERSION = "1.0.0";
  // oldest version which can be migrated reliably
  const COMPATIBLE_MIGRATION_VERSION = "1.0.0";
  const needsMigration = isNewerVersion(NEEDS_MIGRATION_VERSION, currentVersion);
  if (!needsMigration) return;

  // warn users on old versions
  if (
    currentVersion &&
    currentVersion !== defaultMigratedSystemVersion &&
    isNewerVersion(COMPATIBLE_MIGRATION_VERSION, currentVersion)
  ) {
    const warning = `Your ${system.title} system data is from too old a version and cannot be reliably migrated to the latest version. The process will be attempted, but errors may occur.`;
    ui.notifications.error(warning, { permanent: true });
  }

  // Perform the migration
  migrateWorld();
});

Hooks.on("renderSettings", (app: Application, html: JQuery) => {
  const button = $("<button><i class=\"fas fa-search\"></i>DIM41 System Settings</button>");
  html.find('button[data-action="configure"]').after(button);

  button.on("click", ev => {
    ev.preventDefault();
    dim41SettingsClassInstance.render(true);
  });
});

CONFIG.debug.hooks = true;
