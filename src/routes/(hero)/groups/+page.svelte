<script lang="ts">
	import groupList from '$data/groups.json';
	import Pane from '$components/Pane.svelte';

	$: groupPane = false;
	$: selectedGroup = null as {
		name: string;
		image: string;
		miniDesc: string;
		desc: string;
		link: string;
	} | null;
</script>

<Pane style="--paneWidth: 450px;" bind:open={groupPane} on:close={() => (selectedGroup = null)}>
	<svelte:fragment slot="header">&nbsp;</svelte:fragment>
	<svelte:fragment slot="main">
		{#if selectedGroup}
			<div class="Pane">
				<img src={selectedGroup.image} alt={selectedGroup.name} />
				<h2>{selectedGroup.name}</h2>
				<p>{@html selectedGroup.desc.replaceAll('\n', '<br>')}</p>
			</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<a class="Pane__link" href={selectedGroup?.link} target="_blank" rel="noopener noreferrer">
			Learn More
		</a>
	</svelte:fragment>
</Pane>
<section class="Groups">
	{#each groupList as group}
		<button
			class="GroupCard"
			on:click={() => {
				selectedGroup = group;
				groupPane = true;
			}}
		>
			<img src={group.image} alt={group.name} />
			<h2>{group.name}</h2>
			<p>{group.miniDesc}</p>
		</button>
	{/each}
</section>

<style lang="scss">
	.Groups {
		@include box(100%, auto);
		padding: 0 30px;
		gap: 50px;
		max-width: $maxDashWidth;
		@include make-flex($dir: row, $align: flex-start);
		flex-wrap: wrap;

		// display: grid;
		// grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

		.GroupCard {
			outline: none;
			@include box(323px, 424px);
			border: 1px solid var(--border);
			padding: 20px;
			@include make-flex($just: flex-start);
			gap: 20px;
			background-color: white;
			border-radius: 10px;
			transition: all 0.1s ease-in-out;
			cursor: pointer;

			@include respondAt(765px) {
				width: 100%;
			}

			&:hover {
				border-radius: 12px;
				border-top: 1px solid #37ff9b;
				border-right: 1px solid #37ff9b;
				border-bottom: 18px solid #37ff9b;
				border-left: 1px solid #37ff9b;
				background: #eefff6;
			}

			& > img {
				border-radius: 10px;
				@include box(100%, 100px);

				@include respondAt(765px) {
					@include box(auto, 100px);
				}
			}

			& > h2 {
				@include box(100%, auto);
				font-size: 25px;
				font-weight: 600;
				margin-top: 75px;
				text-align: start;
			}

			& > p {
				@include box(100%, auto);
				font-size: 18px;
				font-weight: 300;
				text-align: start;

				-webkit-box-orient: vertical;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: normal;
			}
		}
	}

	.Pane {
		@include box(100%, auto);
		@include make-flex();
		gap: 20px;

		& > img {
			@include box(100%, 200px);
			border-radius: 10px;
		}

		& > h2 {
			@include box(100%, auto);
			font-size: 29px;
			font-weight: 600;
			text-align: start;
		}

		& > p {
			@include box(100%, auto);
			font-size: 18px;
			font-weight: 300;
			text-align: justify;
		}

		&__link {
			@include box(100%, 40px);
			@include make-flex();
			border-radius: 8px;
			color: white;
			text-decoration: none;
			background-color: var(--green);
			font-family: 'Jockey One', sans-serif;
			border: none;
			box-shadow: none;
			font-weight: 300;
			font-size: 24px;
		}
	}
</style>
