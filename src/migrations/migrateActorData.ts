import { migrateItemData } from "./migrateItemData";

/**
 * Migrate a single Actor entity to incorporate latest data model changes
 * Return an Object of updateData to be applied
 * @param {object} actor    The actor data object to update
 * @return {Object}         The updateData to apply
 */
export const migrateActorData = function (actorData: any) {
  const updateData: any = {};

  // do actual actor migrations here
  // e.g.
  // _moveOldNotesToNewNoteSlots(actorData, updateData);

  // Migrate Owned Items
  if (!actorData.items) return updateData;
  let hasItemUpdates = false;
  const items = actorData.items.map((i: any) => {
    // Migrate the Owned Item
    const itemUpdate = migrateItemData(i);

    // Update the Owned Item
    if (!isObjectEmpty(itemUpdate)) {
      hasItemUpdates = true;
      return mergeObject(i, itemUpdate, { enforceTypes: false, inplace: false });
    } else {
      return i;
    }
  });
  if (hasItemUpdates) updateData.items = items;
  return updateData;
};
