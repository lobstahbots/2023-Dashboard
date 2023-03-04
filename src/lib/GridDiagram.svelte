<script lang="ts">
  import type Node from "./Node";
  import NodeIcon from "./NodeIcon.svelte";
  
  export let nodes: Node[];
</script>

<div class="grid">
  {#each nodes as node}
  <div>
    <NodeIcon type={node.type} state={node.state} />
  </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
</style>
