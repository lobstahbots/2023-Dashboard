<script lang="ts">
  import { onDestroy } from "svelte";
  import { CAMERA_RECONNECT_INTERVAL } from "../constants";

  export let src: string;

  let img;
  let reconnectTimeout = null;

  const onError = () => {
    if (!CAMERA_RECONNECT_INTERVAL) return;

    clearTimeout(reconnectTimeout);
    reconnectTimeout = setTimeout(() => {
      img.src = src;
    }, CAMERA_RECONNECT_INTERVAL);
  }

  onDestroy(() => clearTimeout(reconnectTimeout));
</script>

<img
  src={src}
  alt="Camera Stream"
  on:error={onError} bind:this={img}
/>

<style>
  img {
    display: block;
    height: 100%;
    width: 100%;
    aspect-ratio: auto 4 / 3;
    object-fit: contain;
    object-position: top;
    overflow: hidden;
    border-radius: 1em;
    background-color: var(--color-background-lighter);
  }

  img::before {
    content: "";
    display: block;
    width: 30em;
    height: 100%;
    background-color: inherit;
  }
</style>
