<script lang="ts">
	import { PROFILE_ROUTES } from '$lib/routes';
	import SideBar from '$components/SideBar.svelte';
</script>

<main class="UserLayout">
	<SideBar routes={PROFILE_ROUTES} />

	<div class="UserLayout__content">
		<slot />
	</div>
</main>

<style lang="scss">
	.UserLayout {
		@include box();
		display: grid;
		grid-template-columns: min-content 1fr;
		grid-template-areas: 'sidebar content';

		@include respondAt(845px) {
			grid-template-columns: 1fr;
			padding-left: 56px;
		}

		&__content {
			overflow: auto;
		}
	}
</style>
