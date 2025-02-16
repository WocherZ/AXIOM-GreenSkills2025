<template>
  <q-page padding>
    <h3>JSON Page</h3>

    <button id="size-guide-btn" popovertarget="size-guide">Size Guide</button>

    <div id="size-guide" popover>
      <button class="close-btn" popovertarget="size-guide" popovertargetaction="hide">
        <span aria-hidden="true">❌</span>
        <p class="sr-only">Close</p>
      </button>
      <h2>Size Guide: Dresses</h2>
    </div>
    <JsonView />
  </q-page>
</template>

<script setup lang="ts">
import JsonView from 'components/JsonView.vue'

defineOptions({
  name: 'JsonPage'
})

</script>
<style lang="css">
:root {
  --blue: #4a9fe0;
  --darkblue: #616183;
  --gray-bg: #f0f0f0;
  --peppermint: #e9f2e1;
  --lightgreen: #fdfdf9;
}

#size-guide::backdrop {
  background: rgba(190, 190, 190, 0.5);
}

#size-guide {
  padding: 3rem;
  border: none;
  width: clamp(300px, 80vw, 600px);
  max-height: 480px;
}

#size-guide h2 {
  margin: 0 0 1rem;
}

.close-btn {
  filter: grayscale();
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.25rem;
}

#size-guide-btn {
  font-family: "Roboto Mono", monospace;
  color: var(--blue);
}

#size-guide-btn {
  border: 0;
  background: none;
  text-decoration: underline;
  padding: 0;
  cursor: pointer;
}
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
</style>
