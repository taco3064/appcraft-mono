import type { GlobalStateHook, ReadyHandler } from './GlobalState.types';

export * from './GlobalState';
export { default as GlobalStateProvider } from './GlobalState';
export type { ReadyHandler };

export type GetGlobalStateFn = ReturnType<GlobalStateHook>['getGlobalState'];
export type StateChangeHandler = ReturnType<GlobalStateHook>['onStateChange'];
