import system from "../system.json";
import { migrateActorData } from "./migrateActorData";
import { migrateCompendium } from "./migrateCompendium";
import { migrateItemData } from "./migrateItemData";
import { migrateSceneData } from "./migrateSceneData";
import { setSystemMigrationVersion } from "../settingsHelpers";

const title = system.title;

/**
 * Perform a system migration for the entire World, applying migrations for Actors, Items, and Compendium packs
 * @return {Promise}      A Promise which resolves once the migration is completed
 */
export const migrateWorld = async function () {
  ui.notifications.info(
    `Applying ${title} System Migration for version ${game.system.data.version}. 
    Please be patient and do not close your game or shut down your server.`,
    { permanent: true },
  );

  // perform world migrations here
  // e.g.
  // await migrateAbilityCategories();

  // Migrate World Actors
  for (const a of game.actors.entities) {
    try {
      const updateData = migrateActorData(a.data);
      if (!isObjectEmpty(updateData)) {
        console.log(`Migrating Actor entity ${a.name}`);
        await a.update(updateData, { enforceTypes: false });
      }
    } catch (err) {
      err.message = `Failed ${title} system migration for Actor ${a.name}: ${err.message}`;
      console.error(err);
    }
  }

  // Migrate World Items
  for (const i of game.items.entities) {
    try {
      const updateData = migrateItemData(i.data);
      if (!isObjectEmpty(updateData)) {
        console.log(`Migrating Item entity ${i.name}`);
        await i.update(updateData, { enforceTypes: false });
      }
    } catch (err) {
      err.message = `Failed ${title} system migration for Item ${i.name}: ${err.message}`;
      console.error(err);
    }
  }

  // Migrate Actor Override Tokens
  for (const s of game.scenes.entities) {
    try {
      const updateData = migrateSceneData(s.data);
      if (!isObjectEmpty(updateData)) {
        console.log(`Migrating Scene entity ${s.name}`);
        await s.update(updateData, { enforceTypes: false });
      }
    } catch (err) {
      err.message = `Failed {title} system migration for Scene ${s.name}: ${err.message}`;
      console.error(err);
    }
  }

  // Migrate World Compendium Packs
  // XXX another any
  for (const p of (game.packs as any)) {
    if (p.metadata.package !== "world") continue;
    if (!["Actor", "Item", "Scene"].includes(p.metadata.entity)) continue;
    await migrateCompendium(p);
  }

  // Set the migration as complete
  setSystemMigrationVersion(system.version);
  ui.notifications.info(`${system.title} system migration to version ${system.version} completed!`, { permanent: true });
};
