<script lang="ts">
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
	import type { PageData } from './$types';
	import { UserStore } from '$store/UserStore';

	export let data: PageData;

	$: UserStore.set(data.user);
</script>

<svelte:head>
	<title>Revive | Fight Climate Change effectively</title>
</svelte:head>

<Header bind:path={data.pathname} />
<slot />
<Footer />

<style lang="scss" global>
	@import '../styles/root/global.scss';
</style>
