import * as constants from "./constants";

const getSetting = <T = string>(key: string) => (): T => game.settings.get(constants.systemName, key);
const setSetting = <T = string>(key: string) => (value: T) => game.settings.set(constants.systemName, key, value);
export const getSystemMigrationVersion = getSetting(constants.systemMigrationVersion);
export const setSystemMigrationVersion = setSetting(constants.systemMigrationVersion);
