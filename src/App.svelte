<script lang="ts">
  import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";
  import { derived } from "svelte/store";
  import { NETWORKTABLES_PATHS, NETWORKTABLES_PORT, NETWORKTABLES_URI } from "./constants";
  import GridDiagram from "./lib/GridDiagram.svelte";
  import Node, { NodeState } from "./lib/Node";
  import { NTReadableStore } from "./lib/NTStore";
  
  const nt = NetworkTables.getInstanceByURI(NETWORKTABLES_URI, NETWORKTABLES_PORT);

  const selectedNodeXTopic = nt.createTopic<number>(NETWORKTABLES_PATHS.SELECTED_NODE_X, NetworkTablesTypeInfos.kInteger);
  const selectedNodeYTopic = nt.createTopic<number>(NETWORKTABLES_PATHS.SELECTED_NODE_Y, NetworkTablesTypeInfos.kInteger);

  const selectedNodeX = NTReadableStore(selectedNodeXTopic);
  const selectedNodeY = NTReadableStore(selectedNodeYTopic);

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
  <GridDiagram nodes={$nodes} />
</main>

<style>

  main {
    display: grid;
    place-items: center;
    height: 100%;
    overflow: auto;
    padding: 0 3em;
  }
</style>