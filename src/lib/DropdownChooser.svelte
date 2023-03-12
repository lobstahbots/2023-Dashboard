<script lang="ts">
  import type { StringChooser } from "./StringChooser";

  export let chooser: StringChooser;
  $: options = chooser.options;
  $: selectedOption = chooser.selectedOption;
  $: confirmedOption = chooser.confirmedOption;
</script>

<select bind:value={$selectedOption} name="Auton" class:confirmed={$confirmedOption && $selectedOption == $confirmedOption}>
  {#each $options ?? [] as option}
    <option value={option}>{option}</option>
    {/each}
  </select>

<style>
  select {
    outline: 2px solid orange;
  }
  .confirmed {
    outline: none;
  }
</style>