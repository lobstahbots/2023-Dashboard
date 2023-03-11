<script lang="ts">
  import type { StringChooser } from "./StringChooser";

  export let chooser: StringChooser;
  $: options = chooser.options;
  $: selectedOption = chooser.selectedOption;
</script>

<select bind:value={$selectedOption} name="Auton">
  {#each $options ?? [] as option}
    <option value={option}>{option}</option>
  {/each}
</select>