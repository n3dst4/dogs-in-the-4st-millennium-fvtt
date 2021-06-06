// import ReactDOM from "react-dom";
import React from "react";
import { DIM41ActorSheet } from "../components/characters/DIM41ActorSheet";
import { reactTemplatePath, systemName } from "../constants";
import { ReactApplicationMixin } from "./ReactApplicationMixin";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
class DIM41ActorSheetClassBase extends ActorSheet {
  /** @override */
  static get defaultOptions () {
    return mergeObject(super.defaultOptions, {
      classes: [systemName, "sheet", "actor"],
      template: reactTemplatePath,
      width: 660,
      height: 900,
    });
  }
}

const render = (sheet: DIM41ActorSheetClassBase) => {
  return (
    <DIM41ActorSheet
      actor={sheet.entity}
      foundryApplication={sheet}
    />
  );
};

export const DIM41ActorSheetClass = ReactApplicationMixin(
  DIM41ActorSheetClassBase,
  render,
);
