<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;

	const heroData: Record<string, { image: string; title: string; desc: string }> = {
		groups: {
			image: '/assets/groups.png',
			title: '<span style="color:var(--green);">Organizations</span> that amplifies your efforts',
			desc: 'Find and join climate action groups that are working to make a difference in your community. By supporting these organizations, you can help amplify your efforts and make a bigger impact.'
		},
		actions: {
			image: '/assets/actions.png',
			title: 'Discover <span style="color:var(--green);">simple actions</span> to make an impact on climate change',
			desc: 'Find simple, fun and impactful actions that you can take to earn points and compete with your friends!'
		},
		brands: {
			image: '/assets/shop.png',
			title: '<span style="color:var(--green);">Support brands</span> that are making a difference',
			desc: 'Find and support brands that are making a difference in the world. By supporting these brands, you can help amplify your efforts and make a bigger impact.'
		}
	};
</script>

<main class="HeroLayout">
	<div class="Hero">
		<div class="Hero--img">
			<img src={heroData[data.pathname].image} alt={heroData[data.pathname].title} />
		</div>
		<div class="Hero__right">
			<h1>{@html heroData[data.pathname].title}</h1>
			<p>{heroData[data.pathname].desc}</p>
		</div>
	</div>
	<slot />
</main>

<style lang="scss">
	.HeroLayout {
		@include box(100%, auto);
		max-width: $maxWidth;
		padding-top: 64px;
	}

	.Hero {
		margin-top: 120px;
		@include box(100%, auto);
		@include make-flex($dir: row, $align: flex-start);

		&--img {
			@include make-flex();
			@include box(50%, auto);
			padding: 0 32px;
			img {
				@include box(auto, 450px);
				object-fit: cover;
			}
		}

		&__right {
			@include box(50%, auto);
			padding: 0 32px;
			@include make-flex();
			gap: 32px;

			h1 {
				font-size: 60px;
				font-weight: 900;
				@include respondAt(1090px) {
					text-align: center;
				}
				@include respondAt(650px) {
					font-size: 30px;
				}
				span {
					color: var(--green);
				}

				i {
					font-family: 'Courgette', cursive;
				}
			}

			p {
				font-size: 23px;
				color: var(--subText);
				@include respondAt(1090px) {
					text-align: center;
				}

				@include respondAt(650px) {
					font-size: 20px;
				}
			}
		}
	}
</style>
