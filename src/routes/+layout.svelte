<script lang="ts">
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Header bind:path={data.pathname} />
<slot />
<Footer />

<style lang="scss" global>
	@import '../styles/root/global.scss';
</style>
