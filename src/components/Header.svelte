<script lang="ts">
	import { onMount } from 'svelte';

	export let path: string;

	$: if (path.includes('activism')) activeTab = 'activism';
	else if (path.includes('brands')) activeTab = 'brands';
	else if (path.includes('groups')) activeTab = 'groups';
	else activeTab = 'home';

	$: activeTab = 'groups';
	$: pastHero = false;

	onMount(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 45) pastHero = true;
			else pastHero = false;
		});
	});
</script>

<header class="HeaderWrapper" class:hero={activeTab === 'home' || pastHero}>
	<div class="Header">
		<div class="Header__left">
			<a href="/" class="Header__logo"> Revive </a>
		</div>
		<ul class="Header__center">
			<li><a href="/groups" class:active={activeTab === 'groups'}> Groups </a></li>
			<li><a href="/activism" class:active={activeTab === 'activism'}> Activism </a></li>
			<li><a href="/brands" class:active={activeTab === 'brands'}> Brands </a></li>
		</ul>
		<div class="Header__right">
			<!-- <Google /> -->
		</div>
	</div>
</header>

<style lang="scss">
	.HeaderWrapper {
		top: 0;
		left: 0;
		right: 0;
		gap: 10px;
		z-index: 5;
		position: fixed;
		// background: #ffffff99;
		// box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.06);
		// backdrop-filter: blur(5px);
		@include make-flex();

		&.hero {
			@include box(100%, 100px);
			background: rgba(255, 255, 255, 0.01);
			box-shadow: 0px 60px 55px -15px rgba(0, 0, 0, 0.15) inset;
		}

		&:not(.hero) {
			@include box(100%, 64px);
			background: #ffffff99;
			box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.06);
			backdrop-filter: blur(5px);
		}
	}

	.Header {
		align-items: center;
		@include box();
		max-width: $maxWidth;
		@include make-flex($dir: row, $just: space-between);
		gap: 15px;
		padding: 16px 20px;

		&__logo {
			@include box(auto);
			text-decoration: none;
			font-size: 35px;
			font-family: 'Courgette', cursive;
		}

		&__center {
			@include make-flex($dir: row, $just: space-between);
			gap: 40px;
			list-style: none;
			padding: 0;
			margin: 0;

			li {
				a {
					text-decoration: none;
					font-size: 20px;
					font-weight: 500;
					transition: 0.3s;
					position: relative;

					&.active {
						&::after {
							content: '';
							position: absolute;
							bottom: -5px;
							left: 0;
							width: 100%;
							height: 3px;
							border-radius: 5px;
							background: var(--foreground);
						}
					}
				}
			}
		}
	}
</style>
