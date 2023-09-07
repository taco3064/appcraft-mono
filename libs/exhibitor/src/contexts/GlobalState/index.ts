import type { GlobalStateHook } from './GlobalState.types';

export * from './GlobalState';
export { default as GlobalStateProvider } from './GlobalState';

export type GetGlobalStateFn = ReturnType<GlobalStateHook>['getGlobalState'];
export type StateChangeHandler = ReturnType<GlobalStateHook>['onStateChange'];
