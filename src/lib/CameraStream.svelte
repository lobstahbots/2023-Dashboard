<script lang="ts">
  export let src: string;
</script>

<img src={src} alt="Camera Stream" />

<style>
  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: contain;
    overflow: hidden;
    border-radius: 1em;
  }

  img::before {
    content: "";
    display: block;
    width: 30em;
    height: 100%;
    background-color: var(--color-background-lighter);
  }
</style>
