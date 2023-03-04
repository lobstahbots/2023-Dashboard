<script lang="ts">
  import { NodeState, NodeType } from "./Node";

  import coneUnscored from "../assets/cone-unscored.svg";
  import coneSelected from "../assets/cone-selected.svg";
  import coneScored from "../assets/cone-scored.svg";
  import cubeUnscored from "../assets/cube-unscored.svg";
  import cubeSelected from "../assets/cube-selected.svg";
  import cubeScored from "../assets/cube-scored.svg";
  import hybridUnscored from "../assets/hybrid-unscored.svg";
  import hybridSelected from "../assets/hybrid-selected.svg";
  import hybridScored from "../assets/hybrid-scored.svg";

  const srcMap = {
    [NodeType.Cone]: {
      [NodeState.Unscored]: coneUnscored,
      [NodeState.Selected]: coneSelected,
      [NodeState.Scored]: coneScored,
    },
    [NodeType.Cube]: {
      [NodeState.Unscored]: cubeUnscored,
      [NodeState.Selected]: cubeSelected,
      [NodeState.Scored]: cubeScored,
    },
    [NodeType.Hybrid]: {
      [NodeState.Unscored]: hybridUnscored,
      [NodeState.Selected]: hybridSelected,
      [NodeState.Scored]: hybridScored,
    },
  } as const;

  export let state: NodeState;
  export let type: NodeType;

  $: src = srcMap[type][state];
</script>

<img src={src} alt="{NodeState[state]} {NodeType[type]}" />