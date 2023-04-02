<script lang="ts">
  import type { StringChooser } from "./StringChooser";

  export let chooser: StringChooser;
  $: options = chooser.options;
  $: selectedOption = chooser.selectedOption;
  $: confirmedOption = chooser.confirmedOption;
</script>

<div class="wrapper">
  <select bind:value={$selectedOption} name="Auton" class:confirmed={$confirmedOption && $selectedOption == $confirmedOption}>
    {#each $options ?? [] as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<style>
  select {
    appearance: none;
    background-color: var(--color-background-lighter);
    border: 1px solid var(--color-warning);
    border-radius: 0.5em;
    font-size: 1rem;
    padding: 0.5em 1em;
    width: 100%;
    grid-area: area;
  }

  .wrapper {
    display: grid;
    align-items: center;
    grid-template-areas: "area";
  }

  .wrapper::before {
    grid-area: area;
    justify-self: end;
    margin-right: 1em;
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: var(--color-border);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  .confirmed {
    border: 1px solid var(--color-border);
  }
</style>