import { preloadTemplates } from "./module/preloadTemplates";
import { systemName } from "./constants";

// Initialize system
Hooks.once("init", async function () {
  console.log(`${systemName} | Initializing system`);
  // Assign custom classes and constants here

  // Preload Handlebars templates
  await preloadTemplates();

  // XXX TS needs going over here
  // CONFIG.Actor.entityClass = (DIM41Actor as any);

  // Register custom sheets (if any)
  // Actors.unregisterSheet("core", ActorSheet);
  // Actors.registerSheet(
  //   systemName,
  //   DIM41ActorSheetClass,
  //   {
  //     makeDefault: true,
  //     types: [pc],
  //   });
});

// Setup system
Hooks.once("setup", function () {
  // Do anything after initialization but before ready
});

// Migration hook
Hooks.on("ready", async () => {
  // if (!(game.user?.isGM ?? false)) { }
});

CONFIG.debug.hooks = true;
