/* Copyright 2017 The TensorFlow Authors. All Rights Reserved.

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
namespace tf_settings {
  const LIMIT_LOCAL_STORAGE_KEY = 'TF.TensorBoard.PaginatedView.limit';
  const PALETTE_LOCAL_STORAGE_KEY = 'TF.TensorBoard.ColorScale.palette';

  const DEFAULT_LIMIT = 12;
  const DEFAULT_PALETTE = 'tensorboardColorBlindAssist';
  const USE_LOCAL = { useLocalStorage: true };

  let _limit: number = null;
  let _palette: string = null;

  export type Listener = () => void;
  const listeners = new Map<String, Set<Listener>>();

  function getListeners(key: string): Set<Listener> {
    let set = listeners[key];

    if (set == null) {
      set = new Set<Listener>();
      listeners[key] = set;
    }

    return set;
  }

  function createAddListener(key: string) {
    return (listener: Listener) => {
      getListeners(key).add(listener);
    };
  }

  function createRemoveListener(key: string) {
    return (listener: Listener) => {
      getListeners(key).delete(listener);
    }
  }

  export const addLimitListener = createAddListener(LIMIT_LOCAL_STORAGE_KEY);
  export const addPaletteListener = createAddListener(PALETTE_LOCAL_STORAGE_KEY);
  export const removeLimitListener = createRemoveListener(LIMIT_LOCAL_STORAGE_KEY);
  export const removePaletteListener = createRemoveListener(PALETTE_LOCAL_STORAGE_KEY);

  export function getLimit(): number {
    if (_limit == null) {
      _limit = tf_storage.getNumber(LIMIT_LOCAL_STORAGE_KEY, USE_LOCAL);
      if (_limit == null || !isFinite(_limit) || _limit <= 0) {
        _limit = DEFAULT_LIMIT;
      }
    }
    return _limit;
  }

  export function getPalette(): string {
    if (_palette == null) {
      _palette = tf_storage.getString(PALETTE_LOCAL_STORAGE_KEY, USE_LOCAL);
      if (_palette == null) {
        _palette = DEFAULT_PALETTE;
      }
    }
    return _palette;
  }
  
  export function setLimit(limit: number) {
    if (limit !== Math.floor(limit)) {
      throw new Error(`limit must be an integer, but got: ${limit}`);
    }
    if (limit <= 0) {
      throw new Error(`limit must be positive, but got: ${limit}`);
    }
    if (limit === _limit) {
      return;
    }
    _limit = limit;
    tf_storage.setNumber(LIMIT_LOCAL_STORAGE_KEY, _limit, USE_LOCAL);
    getListeners(LIMIT_LOCAL_STORAGE_KEY).forEach((listener) => {
      listener();
    });
  }

  export function setPalette(palette: string) {
    if (palette == null) {
      throw new Error('limit must not be null');
    }

    if (palette == _palette) {
      return;
    }
    _palette = palette;
    tf_storage.setString(PALETTE_LOCAL_STORAGE_KEY, _palette, USE_LOCAL);
    getListeners(PALETTE_LOCAL_STORAGE_KEY).forEach((listener) => {
      listener();
    });
  }

} // namespace tf_settings
