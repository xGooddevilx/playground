<template>
	<button class="dummy-btn" @click="increment">
		Clicked {{ count }} time{{ count === 1 ? '' : 's' }}
	</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
function increment() {
	count.value += 1
}
</script>

<style scoped>
.dummy-btn {
	background: #0ea5e9;
	border: none;
	color: white;
	padding: 10px 16px;
	border-radius: 8px;
	cursor: pointer;
	font-size: 14px;
	transition: background 0.2s ease-in-out;
}
.dummy-btn:hover {
	background: #0284c7;
}
</style>


