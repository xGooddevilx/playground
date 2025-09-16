<template>
	<div class="app">
		<h1>Vue 3 + Webpack</h1>
		<DummyButton />
		<HOFDisplay />
	</div>
</template>

<script setup>
import DummyButton from './components/DummyButton.vue'
import HOFDisplay from './components/HOFDisplay.vue'
</script>

<style>
.app {
	font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, Helvetica, "Apple Color Emoji", "Segoe UI Emoji";
	padding: 24px;
	line-height: 1.4;
}

h1 {
	margin: 0 0 16px;
}
</style>


