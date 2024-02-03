<script lang="ts">
	$: playBackRate = 1.0;
</script>

<main class="Main">
	<section class="Hero">
		<div class="Hero__video">
			<video
				loop
				muted
				autoplay
				playsinline
				src="/assets/hero.mp4"
				disablepictureinpicture
				disableremoteplayback
				poster="/assets/hero.jpg"
				bind:playbackRate={playBackRate}
			/>
			<span> Learn More </span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="71px"
				width="100%"
				viewBox="0 0 1442 94.67"
				preserveAspectRatio="none"
			>
				<polygon
					fill="#fff"
					class="cls-1"
					points="1441.5 94.17 0.5 94.17 0.5 0.56 721 84.65 1441.5 0.56 1441.5 94.17"
				/>
			</svg>
		</div>
		<div class="Hero__content">
			<h1>Fight climate change</h1>
			<h1>Effectively</h1>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="355"
				height="121"
				viewBox="0 0 355 121"
				fill="none"
			>
				<g>
					<path
						d="M11.245 30.0549C54.3609 28.0757 97.4654 25.8767 140.558 23.4577L269.872 16.3931C294.261 15.0736 318.65 13.4793 343.039 12.4072V6.11234C305.517 13.3418 267.996 21.3685 230.611 29.0928L119.052 52.0458L55.7424 65.0479C53.15 65.5702 52.9624 71.8925 55.7424 71.7826L181.491 67.0821L217.188 65.7626L216.625 59.0554C189.337 66.7889 162.099 74.504 134.913 82.2008C132.44 82.9155 133.208 88.798 135.476 88.9905L200.491 93.8285L199.911 86.7914C189.473 91.1621 178.916 95.038 168.597 100.068C166.312 101.195 166.636 107.188 169.177 106.995C170.883 106.995 172.725 106.638 174.482 106.611C175.006 106.611 175.509 106.275 175.88 105.677C176.252 105.079 176.46 104.268 176.46 103.422C176.46 102.576 176.252 101.765 175.88 101.167C175.509 100.569 175.006 100.233 174.482 100.233C172.776 100.233 170.951 100.041 169.177 99.9584L169.774 106.886C180.297 103.12 190.667 98.1441 201.088 93.7185C201.605 93.4813 202.052 92.9513 202.347 92.2258C202.641 91.5003 202.763 90.6279 202.69 89.7689C202.618 88.9099 202.355 88.122 201.951 87.5498C201.547 86.9775 201.029 86.6595 200.491 86.6539L135.476 82.0908L136.039 88.853C163.327 81.0646 190.565 73.322 217.751 65.6252C220.105 64.9654 219.456 58.8355 217.188 58.9179L91.4221 63.7009L55.7424 65.0479V71.7826L168.069 48.5547L280.48 25.3818C301.51 21.0387 322.556 16.8054 343.585 12.1873C345.768 11.72 345.291 5.86494 343.073 6.00238C299.975 8.99864 256.859 11.0328 213.76 13.5068C170.661 15.9808 127.545 18.4547 84.4465 21.0661C60.0574 22.5872 35.6683 24.1357 11.2791 25.7117C9.57362 25.7117 9.57362 30.0274 11.2791 29.945L11.245 30.0549Z"
						fill="#37FF9B"
					/>
				</g>
				<defs>
					<filter
						x="0"
						y="0"
						width="355"
						height="121"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_27_28" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_27_28"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>
		</div>
	</section>

	<section class="How">
		<h2>How does <span>Revive</span> work?</h2>
		<article>
			<div class="How__card">
				<div class="How__card--img">
					<img src="/assets/calculate.png" alt="Calculate" />
				</div>
				<div class="How__card--right">
					<h2>
						<span>CALCULATE </span>
						YOUR EMISSIONS
					</h2>
					<p>
						Using our calculators, find out how much your emissions are. You cannot fix what you
						cannot measure!
					</p>
				</div>
			</div>
			<div class="How__card">
				<div class="How__card--img">
					<img src="/assets/groups.png" alt="groups" />
				</div>

				<div class="How__card--right">
					<h2>
						<span>JOIN AND SUPPORT</span>
						CLIMATE ACTION GROUPS
					</h2>
					<p>
						You can't solve climate change alone. By working with different climate activism
						networks, you can find supportive communities eager to offer clear direction and
						education
					</p>
				</div>
			</div>
			<!-- SHOP WITH LOW-EMISSIONS BUSINESSES -->
			<!-- Swap your everyday products with sustainable brands that are measurably lowering global emissions. -->
			<div class="How__card">
				<div class="How__card--img">
					<img src="/assets/shop.png" alt="shop" />
				</div>

				<div class="How__card--right">
					<h2>
						SHOP WITH
						<span>LOW-EMISSIONS</span>
						BUSINESSES
					</h2>
					<p>
						Swap your everyday products with sustainable brands that are measurably lowering global
						emissions.
					</p>
				</div>
			</div>
			<!-- Revive IS BETTER WITH FRIENDS -->
			<!-- Get friends involved and encourage them to go carbon neutral.  -->
			<div class="How__card">
				<div class="How__card--img">
					<img src="/assets/friends.png" alt="friends" />
				</div>
				<div class="How__card--right">
					<h2>
						<i>Revive</i> IS BETTER WITH
						<span>FRIENDS</span>
					</h2>
					<p>
						Get friends involved and encourage them to go carbon neutral. The more people we have
						involved, the bigger the impact we can make.
					</p>
				</div>
			</div>
			<!-- ACHIEVE CLIMATE ACTIONS -->
			<!-- Discover and complete actions to improve your life and reduce climate pollution. Compete with your friends on the leader-board to make the process fun! -->
			<div class="How__card">
				<div class="How__card--img">
					<img src="/assets/actions.png" alt="actions" />
				</div>

				<div class="How__card--right">
					<h2>
						ACHIEVE
						<span>CLIMATE ACTIONS</span>
					</h2>
					<p>
						Discover and complete actions to improve your life and reduce climate pollution. Compete
						with your friends on the leader-board to make the process fun!
					</p>
				</div>
			</div>
		</article>
	</section>
</main>

<style lang="scss">
	.Main {
		@include box(100vw, auto);
		padding-bottom: 100px;
	}
	.Hero {
		@include box(100vw, 95vh);

		&__content {
			@include box(100%, 100%);
			position: absolute;
			top: 0;
			left: 0;
			@include make-flex();
			h1 {
				font-size: 80px;
				color: white;
				text-align: center;
				text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
				&:nth-child(2) {
					color: var(--lightGreen);
				}

				@include respondAt(564px) {
					font-size: 60px;
				}

				// 400px
				@include respondAt(400px) {
					font-size: 50px;
				}
			}

			& > svg {
				@include respondAt(564px) {
					width: 230px;
				}
			}
		}

		&__video {
			@include box(100%, 100%);
			position: relative;
			video {
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				object-fit: cover;
				position: absolute;
				filter: saturate(1.5) brightness(1.1);
			}

			svg {
				position: absolute;
				bottom: -1px;
				left: 0;
				width: 100%;
				height: 71px;
				z-index: 1;
			}
			& > span {
				position: absolute;
				bottom: 20px;
				padding-bottom: 20px;
				left: 50%;
				transform: translateX(-50%);
				font-size: 30px;
				color: white;
				font-family: 'Jockey One', sans-serif;
				@include make-flex();
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					display: block;
					height: 18px;
					width: 45px;
					left: 50%;
					transform: translateX(-50%);
					background-repeat: no-repeat;
					background-size: contain;
					background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='31' height='9' viewBox='0 0 31 9' fill='none'%3E%3Cpath d='M2 2L15.5 7L29 2' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
					animation: bob 3s infinite;
				}
			}
		}

		@keyframes bob {
			0% {
				transform: translate(-50%, 0);
			}
			50% {
				transform: translate(-50%, 10px);
			}
			100% {
				transform: translate(-50%, 0);
			}
		}
	}

	.How {
		@include box(100%, auto);
		@include make-flex($just: flex-start);
		gap: 20px;

		& > h2 {
			font-size: 50px;
			text-align: center;
			font-weight: 500;
			margin-top: 100px;
			@include box(100%, auto);
			font-family: 'Lora', serif;
			span {
				color: var(--green);
				font-family: 'Courgette', cursive;
			}
		}

		& > article {
			@include box(1000px, auto);
			@include make-flex($just: flex-start);
			background-color: var(--subBG);
			padding: 120px 50px 50px 50px;
			border-radius: 30px;
			gap: 250px;

			@include respondAt(1100px) {
				width: 90%;
			}
			@include respondAt(1090px) {
				gap: 100px;
			}
		}

		&__card {
			@include box(100%, auto);
			@include make-flex($dir: row, $just: space-between, $align: flex-start);

			@include respondAt(1090px) {
				flex-direction: column;
				align-items: center;
				gap: 20px;
			}

			&--img {
				@include make-flex();
				@include box(40%, auto);
				img {
					@include box(auto, 350px);
					object-fit: cover;
				}
			}

			&--right {
				@include box(50%, auto);
				@include make-flex($dir: column, $just: flex-start, $align: flex-start);
				gap: 20px;
				@include respondAt(1090px) {
					width: 80%;
				}
				@include respondAt(650px) {
					width: 100%;
				}

				h2 {
					font-size: 38px;
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
	}
</style>
