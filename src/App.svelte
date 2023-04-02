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
    import CameraStream from "./lib/CameraStream.svelte";
  
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

  const canPickUp = NTReadableStore(nt.createTopic<boolean>(NETWORKTABLES_PATHS.CAN_PICK_UP, NetworkTablesTypeInfos.kBoolean));
  const hasPiece = NTReadableStore(nt.createTopic<boolean>(NETWORKTABLES_PATHS.HAS_PIECE, NetworkTablesTypeInfos.kBoolean));
  const gyroIntialized = NTReadableStore(nt.createTopic<boolean>(NETWORKTABLES_PATHS.GYRO_INITIALIZED, NetworkTablesTypeInfos.kBoolean));

  const selectedNodeX = NTReadableStore(nt.createTopic<number>(NETWORKTABLES_PATHS.SELECTED_NODE_X, NetworkTablesTypeInfos.kInteger));
  const selectedNodeY = NTReadableStore(nt.createTopic<number>(NETWORKTABLES_PATHS.SELECTED_NODE_Y, NetworkTablesTypeInfos.kInteger));

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
  <div class="status-area status-area-left">
    {#if $canPickUp}<div style="background-color: #34a8eb; max-width: 3em;" />{/if}
    {#if $hasPiece}<div style="background-color: #3bdb25;" />{/if}
  </div>
  <div class="status-area status-area-right">
    {#if $canPickUp}<div style="background-color: #34a8eb; max-width: 3em;" />{/if}
    {#if $hasPiece}<div style="background-color: #3bdb25;" />{/if}
  </div>
  <div class="grid-diagram">
    <GridDiagram nodes={$nodes} />
  </div>
  <div class="camera-stream">
    <CameraStream src={CAMERA_URI} />
  </div>
  <div class="auton-options">
    {#if !$connected}
      <WarningStrip>Robot Disconnected</WarningStrip>
    {:else if !$gyroIntialized}
      <WarningStrip>Gyro Not Initialized</WarningStrip>
    {/if}
    <div class="two-col-options">
      <BooleanColor value={$canPickUp} label="Can pick up" />
      <BooleanColor value={$hasPiece} label="Has game piece" />
    </div>
    {#each [autonRoutine, startingColumn, crossingSide, scoringRow, numElements] as chooser}
      <DropdownChooser chooser={chooser} />
    {/each}
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 10% auto 1fr 10%;
    grid-template-rows: auto 1fr;
    grid-template-areas: 
    "status-area-left grid-diagram grid-diagram status-area-right"
    "status-area-left camera-stream auton-options status-area-right";
    height: 100%;
    margin: auto;
    overflow: auto;
    padding: 1em;
    gap: 1em;
  }

  .status-area {
    display: flex;
    border-radius: 1em;
    overflow: hidden;
    gap: 2px;
    max-width: 100%;
  }

  .status-area > * {
    overflow: hidden;
    width: 100vw;
    flex: 1;
  }

  .status-area-left {
    grid-area: status-area-left;
    justify-self: left;
  }

  .status-area-right {
    grid-area: status-area-right;
    flex-direction: row-reverse;
    justify-self: right;
  }

  .grid-diagram {
    grid-area: grid-diagram;
  }

  .camera-stream {
    grid-area: camera-stream;
    min-height: 0;
  }

  .auton-options {
    grid-area: auton-options;
    justify-self: right;
    min-width: 10em;
    max-width: 30em;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    overflow: auto;
  }

  .two-col-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }
</style>