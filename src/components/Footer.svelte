<footer class="FooterWrapper">
	<!-- {#if isHome}
    <h1>rslookup</h1>
  {/if} -->
	<div class="FooterWrapper__container">
		<div class="FooterWrapper__left"></div>
		<div class="FooterWrapper__right">
			<p class="FooterWrapper__right--title">
				Made with ❤️ by
				<a
					class="FancyLink"
					data-type="Bracket"
					href="https://santhosh.is-a.dev"
					target="_blank"
					rel="noopener noreferrer"
				>
					Santhosh
				</a>
			</p>
		</div>
	</div>
</footer>

<style lang="scss">
	$extraPadding: 20px;

	.FooterWrapper {
		margin-top: 50px;
		font-weight: 500;
		@include make-flex();
		color: var(--foreground);
		@include box(100vw, 60px);
		border-top: 0.5px solid var(--border);
		background-color: var(--subBG);

		@include respondAt(650px) {
			height: auto;
		}

		&__right {
			color: var(--foreground);
			&--title {
				@include make-flex($dir: row);
				gap: 3px;
			}
		}

		&__container {
			gap: 20px;
			@include box($height: auto);
			max-width: $maxWidth;
			padding: $extraPadding;
			@include make-flex($dir: row);
			@include respondAt(650px) {
				flex-direction: column;
			}
		}
	}
</style>
