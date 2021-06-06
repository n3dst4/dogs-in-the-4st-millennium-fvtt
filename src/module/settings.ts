import {
  systemName,
} from "../constants";
import { DIM41SettingsClass } from "./DIM41SettingsClass";

// any of these could have an `onChange` added if we wanted to

export const registerSettings = function () {
  // game.settings.register(systemName, systemMigrationVersion, {
  //   name: "System migration version",
  //   hint: "",
  //   scope: "world",
  //   config: false,
  //   default: defaultMigratedSystemVersion,
  //   type: String,
  // });

  // Define a settings submenu which handles advanced configuration needs
  game.settings.registerMenu(systemName, "gumshoeSettingsMenu", {
    name: "DIM41 Settings",
    label: "Open DIM41 System Settings", // The text label used in the button
    // hint: "A description of what will occur in the submenu dialog.",
    icon: "fas fa-bolt", // A Font Awesome icon used in the submenu button
    type: DIM41SettingsClass, // A FormApplication subclass which should be created
    restricted: true, // Restrict this submenu to gamemaster only?
  });
};
