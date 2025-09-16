<template>
	<div class="hof">
		<p>Higher-order function demo:</p>
		<ul>
			<li v-for="(n, idx) in numbers" :key="idx">{{ n }}</li>
		</ul>
	</div>
</template>

<script setup>
import { computed } from 'vue'

// higher-order function: takes a function and returns a new function
function withTransform(transformer) {
	return function applyToArray(values) {
		return values.map(transformer)
	}
}

const base = [1, 2, 3, 4]
const double = (x) => x * 2
const doubleAll = withTransform(double)

const numbers = computed(() => doubleAll(base))
</script>

<style scoped>
.hof {
	margin-top: 16px;
	background: #f8fafc;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	padding: 12px 14px;
}
ul {
	margin: 8px 0 0;
	padding-left: 18px;
}
</style>


