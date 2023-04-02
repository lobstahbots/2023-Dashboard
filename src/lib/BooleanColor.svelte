<script lang="ts">
  export let value: boolean;
  export let label: string = "";
</script>

<div class:true={value}>
    {label}
</div>

<style>
    div {
        min-height: 3em;
        padding: 1em;
        border-radius: 1em;
        display: grid;
        place-items: center;
        line-height: 1em;

        background-color: var(--color-background-lighter);
    }

    .true {
        background-color: var(--color-positive);
    }
</style>
