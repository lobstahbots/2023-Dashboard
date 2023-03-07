import type { NetworkTables, NetworkTablesTopic, NetworkTablesTypes } from "ntcore-ts-client";
import { readable, writable, type Readable } from "svelte/store"

export const NTConnectionStore = (instance: NetworkTables): Readable<boolean> => {
  return { subscribe: (setStore) => instance.addRobotConnectionListener(setStore, true) }
};

export const NTReadableStore = <Type extends NetworkTablesTypes>(topic: NetworkTablesTopic<Type>) =>
  readable<Type>(undefined, (setStore) => {
    const id = topic.subscribe(setStore, true);
    return () => topic.unsubscribe(id);
  });

export const NTWritableStore = <Type extends NetworkTablesTypes>(topic: NetworkTablesTopic<Type>) => {
  const store = writable<Type>(undefined, (setStore) => {
    const id = topic.subscribe(setStore, true);
    return () => topic.unsubscribe(id);
  });

  store.set = (value) => topic.setValue(value);

  return store;
};
