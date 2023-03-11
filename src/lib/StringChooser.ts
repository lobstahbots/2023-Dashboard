import type { NetworkTablesTopic, TopicProperties } from "ntcore-ts-client";
import type { Readable, Writable } from "svelte/store";
import { NTReadableStore, NTWritableStore } from "./NTStore";

export class StringChooser {
  public readonly selectedOption: Writable<string>;
  public readonly options: Readable<string[]>;

  constructor(
    public readonly selectionTopic: NetworkTablesTopic<string>,
    public readonly optionsTopic: NetworkTablesTopic<string[]>,
    publishOptions: TopicProperties = {}
  ) {
    if (publishOptions) selectionTopic.publish(publishOptions);
    this.selectedOption = NTWritableStore(selectionTopic);
    this.options = NTReadableStore(optionsTopic);
  }
}