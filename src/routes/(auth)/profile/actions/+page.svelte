<script lang="ts">
	import type { PageData } from './$types';
	import actionList from '$data/actions.json';
	import type { Points } from '@prisma/client';

	export let data: PageData;
	$: completedList = ((data.completedTasks as Points[]) || []).map((task) => task.task);
	$: fullIndex = null as number | null;
</script>

<section class="Actions">
	<h3 class="w-100">You have completed these tasks!</h3>
	{#each actionList.filter( (action) => completedList.includes(action.title) ) as action, index (action.title)}
		<div class="ActionCard" data-difficulty={action.difficulty}>
			<div class="ActionCard__top">
				<h2 data-difficulty={action.difficulty}>{action.title}</h2>
				<div class="Row--end w-auto gap-15">
					<i>
						Difficulty: {action.difficulty}
					</i>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
						>
							<path
								d="M13.8758 7.69868C14.6323 7.98074 15.3055 8.449 15.833 9.06018C16.3606 9.67136 16.7256 10.4057 16.8941 11.1953C17.0627 11.985 17.0295 12.8043 16.7976 13.5777C16.5656 14.3511 16.1424 15.0535 15.5671 15.6199C14.9918 16.1864 14.2829 16.5986 13.5061 16.8185C12.7293 17.0384 11.9096 17.0588 11.1228 16.8779C10.336 16.697 9.60747 16.3206 9.00466 15.7835C8.40185 15.2464 7.94418 14.566 7.674 13.8051M5.0012 4.20128H5.80144V7.40256M12.7715 10.5078L13.3317 11.076L11.075 13.3329M10.6029 5.80192C10.6029 8.45395 8.4532 10.6038 5.80144 10.6038C3.14968 10.6038 1 8.45395 1 5.80192C1 3.14989 3.14968 1 5.80144 1C8.4532 1 10.6029 3.14989 10.6029 5.80192Z"
								stroke="#DBA515"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<i>
							{action.points}
						</i>
					</span>
				</div>
			</div>
			<p
				class="ActionCard__bottom"
				data-difficulty={action.difficulty}
				class:full={fullIndex === index}
			>
				{@html action.desc.replaceAll('\n', '<br>')}
			</p>

			<div class="Row--end w-100 gap-15">
				<button class="CrispButton" on:click={() => (fullIndex = index)}>Read More</button>
			</div>
		</div>
	{/each}
</section>

<style lang="scss">
	.Actions {
		@include box(100%, auto);
		@include make-flex($just: flex-start);
		padding: 30px 0;
		gap: 20px;

		--green-border: #6ca94d;
		--green-bg: #e1fcda;

		--orange-border: #f5a623;
		--orange-bg: #fff3e0;

		--red-border: #e74c3c;
		--red-bg: #f9e8e6;

		.ActionCard {
			@include box(100%, auto);
			padding: 20px;
			@include make-flex();
			gap: 10px;
			transition: height 0.3s ease-in-out;

			border-radius: 10px;

			&[data-difficulty='Easy'] {
				background-color: var(--green-bg);
				border: 1.5px solid var(--green-border);
			}

			&[data-difficulty='Ambitious'] {
				background-color: var(--red-bg);
				border: 1.5px solid var(--red-border);
			}

			&[data-difficulty='Medium'] {
				background-color: var(--orange-bg);
				border: 1.5px solid var(--orange-border);
			}

			&__top h2,
			&__bottom {
				&[data-difficulty='Easy'] {
					color: var(--green-border);
				}

				&[data-difficulty='Ambitious'] {
					color: var(--red-border);
				}

				&[data-difficulty='Medium'] {
					color: var(--orange-border);
				}
			}

			&__top {
				@include make-flex($dir: row, $just: space-between);
				@include box(100%, auto);

				@include respondAt(740px) {
					flex-direction: column;
				}
				& > div {
					@include respondAt(740px) {
						width: 100%;
					}
				}
				h2 {
					font-size: 24px;
					font-weight: 700;
					color: var(--green-border);
					@include respondAt(740px) {
						width: 100%;
					}
				}

				span {
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

			&__bottom {
				font-size: 18px;
				color: var(--green-border);
				margin-top: 20px;
				@include box(100%, 100%);

				&:not(.full) {
					-webkit-box-orient: vertical;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: normal;
				}
			}
		}
	}
</style>
