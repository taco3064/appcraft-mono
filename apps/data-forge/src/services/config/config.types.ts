import type * as Appcraft from '@appcraft/types';

export type ConfigData<C, U = undefined> = Appcraft.ConfigData<C, U>;

export type RemoveService = (id: string) => Promise<void>;
