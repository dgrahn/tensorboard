/* Copyright 2015 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
namespace tf_color_scale {
  // Example usage:
  // runs = ["train", "test", "test1", "test2"]
  // ccs = new ColorScale();
  // ccs.domain(runs);
  // ccs.getColor("train");
  // ccs.getColor("test1");
  export type ColorScaleListener = () => void;

  export class ColorScale {
    private identifiers = d3.map();
    private listeners: Set<ColorScaleListener> = null;

    /**
     * Creates a color scale with optional custom palette.
     * @param {Array<string>} palette The color palette to use, as an
     *   Array of hex strings. Defaults to the standard palette.
     */
    constructor(private _palette: string[] = standard) {
      this.listeners = new Set<ColorScaleListener>();
    }

    /**
     * Adds a listener to updates to the color scale.
     * 
     * @param listener the listener
     */
    public addListener(listener: ColorScaleListener): void {
      this.listeners.add(listener);
    }

    /**
     * Removes a listener from the color scale.
     * 
     * @param listener the listener
     */
    public removeListener(listener: ColorScaleListener): void {
      this.listeners.delete(listener);
    }

    /**
     * Triggers the listeners.
     */
    private triggerListeners(): void {
      this.listeners.forEach((listener) => {
        listener()
      });
    }
    
    /**
     * Use the color scale to transform an element in the domain into a color.
     * @param {string} The input string to map to a color.
     * @return {string} The color corresponding to that input string.
     * @throws Will error if input string is not in the scale's domain.
     */
    public getColor(s: string): string {
      if (!this.identifiers.has(s)) {
        throw new Error(`String ${s} was not in the domain.`);
      }

      let i = this.identifiers.get(s)
      return this._palette[i % this._palette.length];
    }

    /**
     * Set the domain of strings.
     * @param {Array<string>} strings - An array of possible strings to use as the
     *     domain for your scale.
     */
    public setDomain(strings: string[]): this {
      this.identifiers = d3.map();
      strings.forEach((s, i) => this.identifiers.set(s, i));
      return this;
    }

    /**
     * Sets a new palette and triggers listeners.
     * 
     * @param palette the new palette
     */
    public setPalette(palette: string[]): this {
      this._palette = palette;
      this.triggerListeners();
      return this;
    }
  }

  /**
   * A color scale of a domain from a store.  Automatically updated when the store
   * emits a change.
   */
  function createAutoUpdateColorScale(
    store: tf_backend.BaseStore,
    getDomain: () => string[]
  ): ColorScale {
    const colorScale = new ColorScale();

    function updateDomain(): void {
      colorScale.setDomain(getDomain())
    }
    store.addListener(updateDomain);
    updateDomain();

    tf_settings.addPaletteListener(() => {
      console.log(`colorScale.ts: updating palette - ${tf_settings.getPalette()}`)
      let palette = palettes[tf_settings.getPalette()];
      colorScale.setPalette(palette);
      colorScale.setDomain(getDomain());
    });   

    return colorScale;
  }

  export const runsColorScale = createAutoUpdateColorScale(
    tf_backend.runsStore,
    () => tf_backend.runsStore.getRuns()
  );

  export const experimentsColorScale = createAutoUpdateColorScale(
    tf_backend.experimentsStore,
    () => {
      return tf_backend.experimentsStore.getExperiments().map(({name}) => name);
    }
  );
  
} // tf_color_scale
