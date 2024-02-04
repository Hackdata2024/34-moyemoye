<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);
</script>

<h2>Global Leaderboard</h2>
<table class="CrispTable">
	<thead>
		<tr>
			<th> Avatar </th>
			<th> Name </th>
			<th> Rank </th>
			<th> Tasks Completed </th>
			<th> Coins </th>
		</tr>
	</thead>
	<tbody>
		{#each data.points.sort((a, b) => b.points - a.points) as user, index}
			<tr>
				<td> <img src={user.profile.picture} alt={user.profile.username} /> </td>
				<td> {user.profile.username} </td>
				<td> {index + 1} </td>
				<td> {user.profile.points.length}</td>
				<td> {user.points} </td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td colspan="5">
				Showing {data.points?.length ?? 0} result(s)
			</td>
		</tr>
	</tfoot>
</table>

<style lang="scss">
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	table {
		& > tbody {
			& > tr {
				&:first-child {
					background-color: #fce334;

					& > * {
						font-size: 30px;
						color: #dba515;
						font-family: 'Oxanium', sans-serif;
					}
				}

				&:nth-child(2) {
					background-color: #cecece;

					& > * {
						font-size: 20px;
						color: #858585;
						font-family: 'Oxanium', sans-serif;
					}
				}

				&:nth-child(3) {
					background-color: rgb(156, 118, 118);

					& > * {
						font-size: 20px;
						color: #ded2d2;
						font-family: 'Oxanium', sans-serif;
					}
				}
			}
		}
	}
</style>
