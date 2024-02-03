<script lang="ts">
	import { UserStore } from '$store/UserStore';
	import type { PageData } from './$types';
	import { clickOutside } from '$directive/ClickOutside';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { FriendStatus } from '@prisma/client';

	export let data: PageData;
	export let form: ActionData;

	$: requestMenu = false;

	$: requestsFromYou = data.profile?.friends!;
	$: requestsToYou = data.profile?.requests!;
</script>

<main class="Profile">
	<h1>
		Hello,
		<span>
			{$UserStore?.username}!
		</span>
	</h1>
	<div class="Profile__inviteCodes Row--end gap-10 w-100">
		<label class="CrispLabel w-auto" data-direction="row" data-align="center" for="copy">
			<p>Share you code!</p>
			<input
				type="text"
				name="copy"
				class="CrispButton"
				style="--crp-button-width: 100px;"
				on:click={() => {
					navigator.clipboard.writeText($UserStore?.inviteCode || '');
				}}
				value={$UserStore?.inviteCode}
				readOnly
			/>
		</label>
		<details
			class="CrispMenu ProfileMenu"
			use:clickOutside
			bind:open={requestMenu}
			on:outclick={() => (requestMenu = false)}
		>
			<summary>
				<span> Send request </span>
			</summary>
			<div class="CrispMenu__content ProfileMenu__content">
				<h3>Send request</h3>
				<form method="post" use:enhance action="/profile/friends?/sendRequest">
					<label class="CrispLabel" for="inviteCode">
						<p data-required>User Invite code</p>
						<input
							required
							type="text"
							name="inviteCode"
							class="CrispInput"
							placeholder="Invite code"
						/>
					</label>
					<button class="CrispButton">Send request</button>
					{#if form && form?.error}
						<p class="ProfileMenu__content--error">Invalid user!</p>
					{/if}
				</form>
			</div>
		</details>
	</div>
	<section class="Profile__section">
		<header class="Profile__section--header">
			<h5>Friends</h5>
		</header>
		<ul class="Profile__friendList">
			{#if requestsFromYou.length === 0 && requestsToYou.length === 0}
				<p>No friends yet!</p>
			{:else}
				{#each requestsToYou.filter((request) => request.status === FriendStatus.ACCEPTED) as request}
					<li>
						<div class="Profile__friendList--left gap-15">
							<img src={request.sender.picture} alt={request.sender.username} />
							<h4>{request.sender.username}</h4>
						</div>
						<div class="Profile__friendList--right gap-15">
							<span>
								<i>
									{request.status}
								</i>
							</span>
						</div>
					</li>
				{/each}
			{/if}
		</ul>
	</section>
</main>

<style lang="scss">
	.Profile {
		gap: 14px;
		padding: 16px;
		margin: 64px auto;
		max-width: $maxProfileWidth;
		@include box($height: auto);
		@include make-flex($just: flex-start, $align: flex-start);

		&__inviteCodes {
			@include respondAt(510px) {
				flex-direction: column;
				align-items: flex-end;
			}
		}

		& > h1 {
			font-size: 40px;
			font-weight: 900;

			& > span {
				color: var(--green);
			}
		}

		&__section {
			// gap: 32px;
			width: 100%;
			border: 1px solid #e6e8eb;
			border-radius: 6px;
			box-shadow:
				#00000000 0px 0px 0px 0px,
				#00000000 0px 0px 0px 0px,
				#0000000d 0px 1px 2px 0px;
			@include make-flex($dir: column, $just: flex-start, $align: flex-start);
			// &--footer,
			&--header {
				@include box($height: auto);
				padding: 16px 24px;
			}

			&--header {
				border-bottom: 1px solid #e6e8eb;
				& > h5 {
					font-size: 18px;
					font-weight: 500;
				}
			}

			// &--content {
			// 	gap: 15px;
			// 	@include make-flex();
			// }

			// &--footer {
			// 	border-top: 1px solid #e6e8eb;
			// 	@include make-flex($dir: row, $just: flex-end);
			// }

			// & > *:not(&--header):not(&--footer) {
			// 	@include box($height: auto);
			// 	padding: 16px 24px;
			// 	width: 100%;
			// }
		}

		&__friendList {
			@include make-flex($dir: column, $just: flex-start, $align: flex-start);
			gap: 16px;
			width: 100%;
			padding: 16px;
			list-style: none;

			&--right {
				@include make-flex($dir: row, $just: flex-end);
				width: 100%;

				span {
					height: 16px;
				}
			}

			&--left {
				@include make-flex($dir: row, $just: flex-start);
				@include respondAt(600px) {
					margin-right: auto;
				}
			}

			li {
				@include make-flex($dir: row);
				@include box($height: auto);
				gap: 16px;

				@include respondAt(600px) {
					flex-direction: column;
				}

				img {
					border-radius: 50%;
					@include box(38px, 38px);
					@include make-flex();
					font-weight: bolder;
				}

				h4 {
					height: 14px;
					font-size: 16px;
					font-weight: 600;
					white-space: nowrap;
				}
			}
		}
	}

	.ProfileMenu {
		& > summary {
			& > span {
				height: 16px;
			}
		}
		&__content {
			@include make-flex($just: flex-start, $align: flex-start);
			@include box(250px, auto);
			gap: 16px;
			padding: 16px;

			&--error {
				color: var(--lightRed);
				@include box($height: 30px);
				@include make-flex($just: flex-end);
				text-align: center;
				font-size: 14px;
				font-weight: 500;
			}

			h3 {
				@include box($height: auto);
				border-bottom: 1px solid #e6e8eb;
				padding-bottom: 10px;
			}

			form {
				width: 100%;

				label {
					width: 100%;
					padding: 0 0 16px 0;
				}

				button {
					width: 100%;
				}
			}
		}
	}
</style>
