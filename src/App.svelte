<script lang="ts">
  import GridDiagram from "./lib/GridDiagram.svelte";
  import Node, { NodeState } from "./lib/Node";
  
  const placeholderState: Node[] = [];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 9; col++) {
      placeholderState.push(new Node(
        row,
        col,
        NodeState.Unscored
      ));
    }
  }

  placeholderState[0].state = NodeState.Selected;
</script>

<main>
  <GridDiagram nodes={placeholderState} />
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