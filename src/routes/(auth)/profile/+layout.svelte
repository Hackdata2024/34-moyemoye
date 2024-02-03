<script lang="ts">
	import { UserStore } from '$store/UserStore';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="Profile">
	<h1>
		<d>
			Hello,
			<span>
				{$UserStore?.username}!
			</span>
		</d>

		<span>
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
						class="lucide lucide-wallet"
					>
						<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" stroke="#DBA515" />
						<path d="M3 5v14a2 2 0 0 0 2 2h16v-5" stroke="#DBA515" />
						<path d="M18 12a2 2 0 0 0 0 4h4v-4Z" stroke="#DBA515" />
					</svg>
			<i>
				{#if data.points.length === 0}
					0
				{:else}
					{data.points.reduce((acc, curr) => acc + curr.points, 0)}
				{/if}
			</i>
		</span>
	</h1>
	<slot />
</main>

<style lang="scss">
	.Profile {
		gap: 14px;
		padding: 16px;
		margin: 64px auto;
		max-width: $maxProfileWidth;
		@include box($height: auto);
		@include make-flex($just: flex-start, $align: flex-start);

		& > h1 {
			@include box($height: auto);
			@include make-flex($dir: row, $just: space-between);
			& > d {
				font-size: 40px;
				font-weight: 900;
				& > span {
					color: var(--green);
				}
			}

			& > span {
				@include make-flex($dir: row);
				align-items: center;
				font-size: 18px;
				gap: 10px;
				font-weight: 700;
				color: var(--green-border);
				background-color: #fce334;
				padding: 8px 15px;
				border-radius: 50px;

				i {
					font-family: 'Oxanium', sans-serif;
					color: #dda714;
					height: 18px;
				}
			}
		}
	}
</style>
