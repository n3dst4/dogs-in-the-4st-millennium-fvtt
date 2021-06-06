import React from "react";
import { DIM41Settings } from "../components/DIM41Settings";
import { ReactApplicationMixin } from "./ReactApplicationMixin";
import { reactTemplatePath, systemName } from "../constants";

class DIM41SettingsClassBase extends FormApplication {
  constructor (object: any, options: any) {
    super(object, options);
    console.log(object, options);
  }

  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: [systemName, "sheet", "item", "dialog"],
      template: reactTemplatePath,
      width: 700,
      height: 800,
      resizable: true,
      title: "GUMSHOE Settings",
    });
  }
}

const render = (sheet: DIM41SettingsClassBase) => {
  $(sheet.element).find(".header-button.close").hide();
  return (
    <DIM41Settings
      foundryApplication={sheet}
    />
  );
};

export const DIM41SettingsClass = ReactApplicationMixin(
  DIM41SettingsClassBase,
  render,
);

export const dim41SettingsClassInstance = new DIM41SettingsClass({}, {});
