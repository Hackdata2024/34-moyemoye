<main class="WaterLayout">
	<section class="Hero">
		<h1>
			WHAT'S YOUR
			<span> WATER FOOTPRINT? </span>
		</h1>
		<p>
			Water footprint is measured in terms of the volume of water consumed, evaporated and polluted.
		</p>
		<a href="/water/calculate"> Calculate your water footprint </a>
		<ul class="Hero__types">
			<li>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="58"
					height="80"
					viewBox="0 0 58 80"
					fill="none"
				>
					<path
						d="M29 80C36.6913 80 44.0675 76.8947 49.5061 71.3674C54.9447 65.84 58 58.3432 58 50.5263C58 42.1053 53.8571 34.1053 45.5714 27.3684C37.2857 20.6316 31.0714 10.5263 29 0C26.9286 10.5263 20.7143 20.6316 12.4286 27.3684C4.14286 34.1053 0 42.1053 0 50.5263C0 58.3432 3.05535 65.84 8.4939 71.3674C13.9325 76.8947 21.3087 80 29 80Z"
						fill="#7AB54A"
					/>
				</svg>
				<h1>Green Water Footprint</h1>
				<p>The amount of rainwater required (evaporated or used directly) to make an item.</p>
			</li>
			<li>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="58"
					height="80"
					viewBox="0 0 58 80"
					fill="none"
				>
					<path
						d="M29 80C36.6913 80 44.0675 76.8947 49.5061 71.3674C54.9447 65.84 58 58.3432 58 50.5263C58 42.1053 53.8571 34.1053 45.5714 27.3684C37.2857 20.6316 31.0714 10.5263 29 0C26.9286 10.5263 20.7143 20.6316 12.4286 27.3684C4.14286 34.1053 0 42.1053 0 50.5263C0 58.3432 3.05535 65.84 8.4939 71.3674C13.9325 76.8947 21.3087 80 29 80Z"
						fill="#ABADB1"
					/>
				</svg>
				<h1>Grey Water Footprint</h1>
				<p>
					The amount of freshwater required to dilute the wastewater generated in manufacturing, in
					order to maintain water quality , as determined by state and local standards.
				</p>
			</li>
			<li>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="58"
					height="80"
					viewBox="0 0 58 80"
					fill="none"
				>
					<path
						d="M29 80C36.6913 80 44.0675 76.8947 49.5061 71.3674C54.9447 65.84 58 58.3432 58 50.5263C58 42.1053 53.8571 34.1053 45.5714 27.3684C37.2857 20.6316 31.0714 10.5263 29 0C26.9286 10.5263 20.7143 20.6316 12.4286 27.3684C4.14286 34.1053 0 42.1053 0 50.5263C0 58.3432 3.05535 65.84 8.4939 71.3674C13.9325 76.8947 21.3087 80 29 80Z"
						fill="#0E89C5"
					/>
				</svg>
				<h1>Blue Water Footprint</h1>
				<p>
					The amount of surface water and groundwater required (evaporated or used directly) to
					produce an item.
				</p>
			</li>
		</ul>
	</section>
</main>

<style lang="scss">
	.WaterLayout {
		@include box(100%, auto);
		@include make-flex($just: flex-start);
		gap: 90px;
		max-width: $maxWidth;
		padding-top: 264px;

		.Hero {
			@include make-flex($just: flex-start);
			gap: 20px;

			& > h1 {
				width: 70%;
				font-size: 60px;
				font-weight: 900;
				text-align: center;

				@include respondAt(650px) {
					width: 90%;
					font-size: 30px;
				}

				span {
					color: var(--blue);
				}
			}

			& > a {
				@include box(auto, 60px);
				padding: 0 30px;
				font-size: 30px;
				font-weight: 500;
				background-color: var(--blue);
				border-radius: 30px;
				@include make-flex();
				text-decoration: none;

				font-family: 'Jockey One', sans-serif;
				color: white;
				border: 1px solid transparent;
				transition: 0.2s ease-in-out;

				@include respondAt(650px) {
					font-size: 20px;
				}

				&:hover {
					border: 1px solid var(--blue);
					color: var(--blue);
					background-color: white;
				}
			}

			& > p {
				font-size: 23px;
				width: 60%;
				color: var(--subText);
				text-align: center;

				@include respondAt(650px) {
					font-size: 20px;
				}
				@include respondAt(550px) {
					width: 90%;
				}
			}

			&__types {
				// @include make-flex($dir: row, $just: space-between);
				display: grid;
				grid-template-columns: repeat(3, 3fr);
				gap: 20px;
				list-style: none;
				@include box(1000px, auto);
				background-color: var(--subBG);
				padding: 50px;
				margin-top: 100px;
				border-radius: 30px;

				@include respondAt(1100px) {
					width: 90%;
					@include make-flex($dir: row);
					flex-wrap: wrap;
				}
        @include respondAt(550px) {
          padding: 20px
				}

				li {
					@include box(auto);
					@include make-flex($just: flex-start);
					gap: 20px;
					font-size: 20px;
					font-weight: 500;
					text-align: center;
					padding: 16px 20px;

					@include respondAt(550px) {
						width: 90%;
            padding: 16px 0;
					}
					@include respondAt(1100px) {
						height: auto;
					}

					h1 {
						font-size: 30px;
						font-weight: 900;
						margin-bottom: 20px;
					}

					p {
						font-size: 20px;
						color: var(--subText);
						font-weight: 300;
					}
				}
			}
		}
	}
</style>
