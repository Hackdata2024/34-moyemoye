<script lang="ts">
	import brandList from '$data/brands.json';

	$: activeFilter = 'All';
	$: filterList = [
		{
			title: 'All',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M19.1278 2.46L14.7478 1C14.7478 2.06087 14.3264 3.07828 13.5763 3.82843C12.8261 4.57857 11.8087 5 10.7478 5C9.68698 5 8.66956 4.57857 7.91942 3.82843C7.16927 3.07828 6.74784 2.06087 6.74784 1L2.36784 2.46C1.91523 2.61079 1.53142 2.91842 1.2857 3.32734C1.03997 3.73627 0.948521 4.21956 1.02784 4.69L1.60784 8.16C1.64592 8.39491 1.76652 8.60855 1.94798 8.76251C2.12944 8.91648 2.35987 9.00069 2.59784 9H4.74784V19C4.74784 20.1 5.64784 21 6.74784 21H14.7478C15.2783 21 15.787 20.7893 16.1621 20.4142C16.5371 20.0391 16.7478 19.5304 16.7478 19V9H18.8978C19.1358 9.00069 19.3662 8.91648 19.5477 8.76251C19.7292 8.60855 19.8498 8.39491 19.8878 8.16L20.4678 4.69C20.5472 4.21956 20.4557 3.73627 20.21 3.32734C19.9643 2.91842 19.5805 2.61079 19.1278 2.46Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
			bg: 'var(--blue)'
		},
		{
			title: 'Clothing',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M19.1278 2.46L14.7478 1C14.7478 2.06087 14.3264 3.07828 13.5763 3.82843C12.8261 4.57857 11.8087 5 10.7478 5C9.68698 5 8.66956 4.57857 7.91942 3.82843C7.16927 3.07828 6.74784 2.06087 6.74784 1L2.36784 2.46C1.91523 2.61079 1.53142 2.91842 1.2857 3.32734C1.03997 3.73627 0.948521 4.21956 1.02784 4.69L1.60784 8.16C1.64592 8.39491 1.76652 8.60855 1.94798 8.76251C2.12944 8.91648 2.35987 9.00069 2.59784 9H4.74784V19C4.74784 20.1 5.64784 21 6.74784 21H14.7478C15.2783 21 15.787 20.7893 16.1621 20.4142C16.5371 20.0391 16.7478 19.5304 16.7478 19V9H18.8978C19.1358 9.00069 19.3662 8.91648 19.5477 8.76251C19.7292 8.60855 19.8498 8.39491 19.8878 8.16L20.4678 4.69C20.5472 4.21956 20.4557 3.73627 20.21 3.32734C19.9643 2.91842 19.5805 2.61079 19.1278 2.46Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
			bg: 'var(--purple)'
		},
		{
			title: 'Shoes & Accessories',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none"><path d="M14.001 16H18.001M2.00098 12H6.00098M2.00064 15V12.62C2.00064 10.5 0.970643 9.5 1.00064 7C1.03064 4.28 2.49064 1 5.50064 1C7.37064 1 8.00064 2.8 8.00064 4.5C8.00064 7.61 6.00064 10.16 6.00064 13.18V15C6.00064 15.5304 5.78993 16.0391 5.41486 16.4142C5.03978 16.7893 4.53108 17 4.00064 17C3.47021 17 2.9615 16.7893 2.58643 16.4142C2.21136 16.0391 2.00064 15.5304 2.00064 15ZM18.001 19V16.62C18.001 14.5 19.031 13.5 19.001 11C18.971 8.28 17.511 5 14.501 5C12.631 5 12.001 6.8 12.001 8.5C12.001 11.61 14.001 14.16 14.001 17.18V19C14.001 19.5304 14.2117 20.0391 14.5868 20.4142C14.9618 20.7893 15.4705 21 16.001 21C16.5314 21 17.0401 20.7893 17.4152 20.4142C17.7903 20.0391 18.001 19.5304 18.001 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
			bg: 'var(--violet)'
		},
		{
			title: 'Food & Drink',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none"><path d="M5 18.6831H15M9.38 9.68307C8.77436 9.68872 8.18899 9.46517 7.74128 9.05727C7.29357 8.64937 7.01664 8.08728 6.96603 7.48373C6.91541 6.88019 7.09487 6.27983 7.46839 5.80306C7.84191 5.32629 8.38188 5.00837 8.98 4.91307C8.88424 4.4893 8.9053 4.04748 9.04095 3.63474C9.1766 3.22201 9.42174 2.85383 9.75022 2.56948C10.0787 2.28514 10.4782 2.09529 10.9061 2.0202C11.334 1.9451 11.7743 1.98757 12.18 2.14307C12.3576 1.86344 12.5912 1.6236 12.8661 1.43867C13.141 1.25374 13.4511 1.12772 13.7771 1.06854C14.1031 1.00936 14.4377 1.01831 14.7601 1.09481C15.0824 1.17132 15.3854 1.31373 15.65 1.51307C16.1116 1.1503 16.6901 0.96928 17.2761 1.00427C17.8621 1.03926 18.415 1.28783 18.8301 1.70295C19.2452 2.11807 19.4938 2.67094 19.5288 3.25696C19.5638 3.84299 19.3828 4.42151 19.02 4.88307C19.2458 5.183 19.3981 5.53172 19.4646 5.90121C19.5312 6.27069 19.5101 6.65063 19.4031 7.01048C19.2961 7.37034 19.1062 7.70008 18.8486 7.97321C18.591 8.24633 18.273 8.45521 17.92 8.58307C18.0112 8.94301 18.0215 9.3187 17.95 9.68307M11 9.68307L15 5.68307M8.9 4.93307C8.35149 4.34834 7.63955 3.94241 6.85698 3.7682C6.0744 3.59398 5.25749 3.65956 4.51273 3.95638C3.76797 4.25321 3.1299 4.76751 2.6817 5.43226C2.23349 6.097 1.99594 6.88135 2 7.68307C2 8.41307 2.2 9.09307 2.54 9.68307M10 18.6831C12.3869 18.6831 14.6761 17.7349 16.364 16.047C18.0518 14.3592 19 12.07 19 9.68307H1C1 12.07 1.94821 14.3592 3.63604 16.047C5.32387 17.7349 7.61305 18.6831 10 18.6831Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
			bg: 'var(--orange)'
		},
		{
			title: 'Household',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none"><path d="M7 21V11H13V21M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
			bg: 'var(--yellow)'
		},
		{
			title: 'Tech & Media',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 1V3M14 19V21M1 14H3M1 8H3M19 14H21M19 8H21M8 1V3M8 19V21M5 3H17C18.1046 3 19 3.89543 19 5V17C19 18.1046 18.1046 19 17 19H5C3.89543 19 3 18.1046 3 17V5C3 3.89543 3.89543 3 5 3ZM8 8H14V14H8V8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
			bg: 'var(--olive)'
		}
	];
</script>

<section class="Brands">
	<div class="Brands__filter">
		{#each filterList as filter}
			<button
				on:click={() => (activeFilter = filter.title)}
				class:active={activeFilter === filter.title}
			>
				<span style="background-color: {filter.bg}">
					{@html filter.icon}
				</span>
				<i>
					{filter.title}
				</i>
			</button>
		{/each}
	</div>
	<div class="Brands__list">
		{#each brandList.filter((brand) => activeFilter === 'All' || brand.category === activeFilter) as brand}
			<div class="BrandCard">
				<picture>
					<img srcset={brand.image} alt={brand.name} />
				</picture>
				<h2>{brand.name}</h2>
				<p>{brand.description}</p>
				<div class="Row--end w-100" style="margin-top: auto;">
					<a href={brand.link} class="CrispButton"> Learn More </a>
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.Brands {
		@include box(100%, auto);
		@include make-flex($just: flex-start);
		padding: 0 30px;
		gap: 20px;

		&__filter {
			gap: 20px;
			flex-wrap: wrap;
			@include box(100%, auto);
			@include make-flex($dir: row);

			& > button {
				outline: none;
				border: 2px solid transparent;
				padding: 10px 20px 10px 10px;
				font-size: 20px;
				gap: 10px;
				border-radius: 50px;
				@include box(auto, 64px);
				@include make-flex($dir: row);
				background-color: var(--subBG);
				cursor: pointer;

				&.active {
					border: 2px solid var(--blue);
				}

				transition: 0.3s ease;
				i {
					height: 20px;
				}

				&:hover {
					background-color: #ebebeb;
					// mild box   shadow
					box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
				}

				& > span {
					@include box(40px);
					border-radius: 50%;
					@include make-flex($just: center, $align: center);
				}
			}
		}

		&__list {
			display: grid;
			// 3 columns
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			gap: 20px;
		}
	}

	.BrandCard {
		@include box(100%, auto);
		padding: 20px;
		// @include make-flex($dir: row, $align: flex-start, $just: space-between);
		gap: 20px;
		transition: height 0.3s ease-in-out;
		border-radius: 10px;
		border: 1.5px solid var(--border);

		// &__right {
		& > picture {
			@include box(auto, auto);
			flex-shrink: 0;
			overflow: hidden;
			border-radius: 50%;
			border: 1px solid var(--border);
			@include make-flex($just: flex-start);
			margin-bottom: 40px;
			img {
				@include box(80px, 80px);
				@include make-flex();
			}
		}
		gap: 15px;
		@include box(100%, auto);
		@include make-flex($align: flex-start);

		h2 {
			font-size: 28px;
			font-weight: 700;
			color: var(--green-border);
		}

		p {
			-webkit-box-orient: vertical;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: normal;

			font-size: 20px;
			color: var(--subText);
		}

		a {
			color: white;
			text-decoration: none;
			background-color: var(--green);
			font-family: 'Jockey One', sans-serif;
			border: none;
			box-shadow: none;
      font-weight: 300;
			font-size: 18px;
		}
		// }
	}
</style>
