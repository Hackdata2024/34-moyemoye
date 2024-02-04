<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { Route } from '$lib/routes';
	import { UserStore } from '$store/UserStore';
	import { onMount } from 'svelte';

	export let routes: Route[];

	$: userName = $UserStore?.username;

	$: navState = true;
	$: collapsibleState = {
		...Object.fromEntries(
			routes.filter((item) => item.children.length > 0).map((item) => [item.route, false])
		)
	} as Record<string, boolean>;

	onMount(() => {
		// add event listener on window to close it when window width is less that 845px
		if (window.innerWidth < 845) {
			navState = false;
		}
		window.addEventListener('resize', () => {
			if (window.innerWidth < 845) {
				navState = false;
			}
		});
	});
</script>

<div class="Sidebar" class:open={navState}>
	<div class="Sidebar__logo Row--between gap-15">
		<!-- <img src="/assets/images/logo.svg" alt="logo" /> -->
		<h2 class="Sidebar__logo--title">
			<a href="/">
				{#if navState}
					Revive
				{:else}
					R
				{/if}
			</a>
		</h2>
	</div>
	<ul class="Sidebar__menuList">
		{#each routes as route}
			<a
				class="Sidebar__menuList--item"
				href={route.route}
				data-active={route.route === $page.url.pathname}
				title={route.name}
			>
				{@html route.icon}
				<span>{route.name}</span>
			</a>
		{/each}
	</ul>
	<div class="Sidebar__bottom">
		<div class="Sidebar__user">
			<span
				style="background-image: url('{$UserStore?.picture}'); background-size: cover; background-position: center;"
			/>
			<div class="Sidebar__bottom--col">
				<p title={userName}>{userName}</p>
				<p title={`${$UserStore?.email}`}>{$UserStore?.email}</p>
			</div>
			<form method="post" use:enhance action="/">
				<button class="CrispButton" data-type="danger">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-log-out"
					>
						<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
						<polyline points="16 17 21 12 16 7" />
						<line x1="21" x2="9" y1="12" y2="12" />
					</svg>
				</button>
			</form>
		</div>
		<button
			class={`dark  Sidebar__toggle${navState ? '--active' : '--item'}`}
			on:click={() => {
				navState = !navState;
				collapsibleState = {
					...collapsibleState,
					...Object.fromEntries(
						routes.filter((item) => item.children.length > 0).map((item) => [item.route, false])
					)
				};
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-chevron-right"
			>
				<path d="m9 18 6-6-6-6" />
			</svg>
		</button>
	</div>
</div>

<style lang="scss">
	.Sidebar {
		gap: 15px;
		max-height: 100vh;
		@include box(56px);
		overflow-x: hidden;
		@include make-flex();
		background-color: #f8f9fa;
		border-right: 1px solid var(--border);
		// padding: 20px 8px 10px 10px;
		padding: 8px;
		transition: all 0.3s ease-in-out;

		@include respondAt(845px) {
			position: fixed;
			top: 0;
			left: 0;
		}

		&.open {
			gap: 30px;
			@include box(250px);
			padding: 40px 20px 15px 20px;

			.Sidebar__menuList {
				@include box(calc(100% + 15px), fit-content);

				scrollbar-gutter: stable;
				padding-left: 6px;
				margin-left: -13px;
			}
		}

		&__logo {
			@include box(100%, 40px);
			// img {
			// 	@include box(100%, 80%);
			// 	object-fit: contain;
			// }
			&--title {
				width: 100%;

				a {
					font-size: 55px;
					width: 100%;
					height: 30px;
					margin-top: 10px;
					@include make-flex();
					font-weight: 600;
					// color: #11181c;
					font-family: 'Courgette', cursive;
					color: var(--green);
					text-decoration: none;
				}
			}
		}

		&__menuList {
			gap: 10px;
			flex-grow: 1;
			direction: rtl;
			overflow-y: auto;
			overflow-x: hidden;
			@include box(100%, fit-content);
			@include make-flex($just: flex-start, $dir: column);

			& > * {
				direction: ltr;
			}

			&--item {
				gap: 8px;
				flex-shrink: 0;
				color: #7e868c;
				cursor: pointer;
				padding: 0px 8px;
				border-radius: 7px;
				position: relative;
				line-height: normal;
				white-space: nowrap;
				text-decoration: none;
				@include box(calc(100% - 2px), 35px);
				background-color: transparent;
				border: 1px solid transparent;
				@include make-flex($dir: row, $just: flex-start);
				overflow: hidden;
				border: 1px solid transparent;

				& > span {
					height: 15px;
				}
				:global(svg) {
					@include box(20px, 20px);
					flex-shrink: 0;
				}

				&[data-active='true'] {
					background-color: #e6e8eb;
					color: #11181c;
					&::before {
						color: #11181c;
					}
				}

				&:not(&[data-active='true']) {
					&:hover,
					&:focus {
						outline: none;
						background-color: #ebedf1;
					}
				}
			}
		}

		&__toggle {
			svg {
				transition: transform 0.3s;
			}

			&--active,
			&--item {
				border: 1px solid #eaecf0;
				outline: none;
				cursor: pointer;
				border-radius: 5px;
				background-color: rgb(241, 241, 241);
				@include box(100%, 37px);
				@include make-flex();

				&:hover,
				&:focus {
					outline: none;
					background-color: #f4f5f6;
				}
			}

			&--active {
				align-items: flex-end !important;
				padding-right: 10px;
				svg {
					transform: rotate(180deg);
				}
			}
		}

		&__user {
			display: grid;
			grid-template-columns: 40px 1fr 25px;
			@include box($height: auto);
			gap: 10px;
			border-top: 1px solid #eaecf0;
			border-bottom: 1px solid #eaecf0;

			align-items: end;
			padding: 10px 0 10px 0;

			// img {
			// 	border-radius: 50%;
			// 	border: 1px solid black;
			// 	@include box(38px, 38px);
			// }

			// &--col {
			// 	overflow: hidden;

			// 	p {
			// 		text-overflow: ellipsis;
			// 		overflow: hidden;

			// 		&:first-child {
			// 			font-size: 16px;
			// 			font-weight: 600;
			// 		}

			// 		&:last-child {
			// 			font-size: 14px;
			// 			font-weight: 500;
			// 			color: #84878d;
			// 		}
			// 	}
			// }

			& > span {
				border-radius: 50%;
				@include box(38px, 38px);
				@include make-flex();
				font-weight: bolder;
			}

			button {
				@include box(auto);
				@include make-flex();
				font-size: 22px;
				outline: none;
				border: none;
				background-color: transparent;
				cursor: pointer;

				&:hover,
				&:focus {
					outline: none;
					background-color: #ebedf1;
				}
			}
		}

		&__bottom {
			@include make-flex();
			gap: 15px;
			@include box(100%, auto);

			&--col {
				overflow: hidden;

				p {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
	}
</style>
