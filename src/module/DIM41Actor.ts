import { DIM41ActorData } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class DIM41Actor<T = any> extends Actor<DIM41ActorData> {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData (): void {
    super.prepareData();
  }
}
