<script lang="ts">
  import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";
  import { derived } from "svelte/store";
  import { CAMERA_URI, NETWORKTABLES_PATHS, NETWORKTABLES_PORT, NETWORKTABLES_URI } from "./constants";
  import { StringChooser } from "./lib/StringChooser";
  import DropdownChooser from "./lib/DropdownChooser.svelte";
  import GridDiagram from "./lib/GridDiagram.svelte";
  import Node, { NodeState } from "./lib/Node";
  import { NTConnectionStore, NTReadableStore } from "./lib/NTStore";
  import WarningStrip from "./lib/WarningStrip.svelte";
    import BooleanColor from "./lib/BooleanColor.svelte";
  
  const nt = NetworkTables.getInstanceByURI(NETWORKTABLES_URI, NETWORKTABLES_PORT);

  const connected = NTConnectionStore(nt);

  const autonRoutine = new StringChooser(
    nt.createTopic(NETWORKTABLES_PATHS.AUTON_ROUTINE.SELECTED, NetworkTablesTypeInfos.kString),
    nt.createTopic(NETWORKTABLES_PATHS.AUTON_ROUTINE.OPTIONS, NetworkTablesTypeInfos.kStringArray),
    nt.createTopic(NETWORKTABLES_PATHS.AUTON_ROUTINE.CONFIRMATION, NetworkTablesTypeInfos.kStringArray),
  );

  const startingColumn = new StringChooser(
    nt.createTopic(NETWORKTABLES_PATHS.STARTING_COLUMN.SELECTED, NetworkTablesTypeInfos.kString),
    nt.createTopic(NETWORKTABLES_PATHS.STARTING_COLUMN.OPTIONS, NetworkTablesTypeInfos.kStringArray),
    nt.createTopic(NETWORKTABLES_PATHS.STARTING_COLUMN.CONFIRMATION, NetworkTablesTypeInfos.kStringArray),
  );

  const crossingSide = new StringChooser(
    nt.createTopic(NETWORKTABLES_PATHS.CROSSING_SIDE.SELECTED, NetworkTablesTypeInfos.kString),
    nt.createTopic(NETWORKTABLES_PATHS.CROSSING_SIDE.OPTIONS, NetworkTablesTypeInfos.kStringArray),
    nt.createTopic(NETWORKTABLES_PATHS.CROSSING_SIDE.CONFIRMATION, NetworkTablesTypeInfos.kStringArray),
  );

  const scoringRow = new StringChooser(
    nt.createTopic(NETWORKTABLES_PATHS.SCORING_ROW.SELECTED, NetworkTablesTypeInfos.kString),
    nt.createTopic(NETWORKTABLES_PATHS.SCORING_ROW.OPTIONS, NetworkTablesTypeInfos.kStringArray),
    nt.createTopic(NETWORKTABLES_PATHS.SCORING_ROW.CONFIRMATION, NetworkTablesTypeInfos.kStringArray),
  );

  const numElements = new StringChooser(
    nt.createTopic(NETWORKTABLES_PATHS.NUMBER_ELEMENTS.SELECTED, NetworkTablesTypeInfos.kString),
    nt.createTopic(NETWORKTABLES_PATHS.NUMBER_ELEMENTS.OPTIONS, NetworkTablesTypeInfos.kStringArray),
    nt.createTopic(NETWORKTABLES_PATHS.NUMBER_ELEMENTS.CONFIRMATION, NetworkTablesTypeInfos.kStringArray),
  );

  const selectedNodeX = NTReadableStore(nt.createTopic<number>(NETWORKTABLES_PATHS.SELECTED_NODE_X, NetworkTablesTypeInfos.kInteger));
  const selectedNodeY = NTReadableStore(nt.createTopic<number>(NETWORKTABLES_PATHS.SELECTED_NODE_Y, NetworkTablesTypeInfos.kInteger));

  const canPickup = NTReadableStore(nt.createTopic<boolean>(NETWORKTABLES_PATHS.CAN_PICKUP, NetworkTablesTypeInfos.kBoolean));

  const nodes = derived([selectedNodeX, selectedNodeY], ([$selectedNodeX, $selectedNodeY]) => {
  const nodes: Node[] = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 9; col++) {
        const selected = (col === $selectedNodeX && row === $selectedNodeY);
        nodes.push(new Node(
          row,
          col,
          selected ? NodeState.Selected : NodeState.Unscored
        ));
      }
    }

    return nodes;
  });

</script>

<main>
  <div class="grid-diagram">
    <GridDiagram nodes={$nodes} />
  </div>
  <img src={CAMERA_URI} class="camera-stream" alt="Camera Stream">
  <div class="auton-options">
    {#if !$connected}
    <WarningStrip>Robot Disconnected</WarningStrip>
    <BooleanColor value={$canPickup} label="Can pick up" />
    {/if}
    {#each [autonRoutine, startingColumn, crossingSide, scoringRow, numElements] as chooser}
      <DropdownChooser chooser={chooser} />
    {/each}
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 
    "grid-diagram grid-diagram"
    "camera-stream auton-options";
    height: 100%;
    width: 80%;
    margin: auto;
    overflow: auto;
    padding: 1em;
    gap: 1em;
  }

  .grid-diagram {
    grid-area: grid-diagram;
  }

  .camera-stream {
    grid-area: camera-stream;
    height: 100%;
    width: 100%;
    object-fit: contain;
    overflow: hidden;
    border-radius: 1em;
  }
  
  .camera-stream::before {
    content: "";
    display: block;
    width: 30em;
    height: 100%;
    background-color: var(--color-background-lighter);
  }

  .auton-options {
    grid-area: auton-options;
    justify-self: right;
    max-width: 30em;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    overflow: auto;
  }
</style>