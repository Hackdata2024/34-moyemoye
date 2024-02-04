<script lang="ts">
	import water from '$data/water.json';
	import Chart from 'chart.js/auto';

	const preset = {
		shower_time: '4',
		showerhead_flow: '2.5',
		number_of_people: '1',
		number_of_baths: '1',
		time_period_multiplier: '0.033',
		sink_time: '8',
		sink_flow: '1.5',
		let_it_mellow: '1.7',
		flushes_per_day: '1.7',
		kitchen_sink_time: '13',
		kitchen_sink_flow: '1.5',
		time_multiplier: '1.0',
		dishwashing_method: '4.3',
		loads: '1',
		clothes_washing_method: '20',
		greywater_system_installed: '1',
		potential_greywater: '0',
		watering_lawn_or_garden: '1',
		area_interval_multiplier: '17',
		watering_times: '1',
		rain_barrel: '4',
		self_service_car_wash: '15',
		garden_hose: '0',
		full_service_car_wash: '0',
		shopping_category: '10',
		recycling_paper_category: '4',
		recycling_plastic_category: '0',
		recycling_bottles_cans_category: '0',
		recycle_fabrics_category: '5.7'
	} as { [key: string]: string };
	$: isDemo = false as boolean;
	$: answers = isDemo ? preset : ({} as { [key: string]: string });
	$: questionNumber = 0;
	$: globalChart = null as Chart | null;

	$: currentQuestion = water[questionNumber] as unknown as {
		type: string;
		place: string;
		name: string;
		avg: string;
		calculation: string;
		resultType: string;
		questions: Array<{
			id: string;
			question: string;
			description: string;
			options: { [key: string]: string };
		}>;
	};

	const calculator = () => {
		return water.map((entry) => {
			let calculation = entry.calculation;
			const regex = /{([^}]+)}/g;
			const matches = calculation.match(regex);
			const stringsInsideCurlyBraces = matches ? matches.map((match) => match.slice(1, -1)) : [];
			for (const string of stringsInsideCurlyBraces) {
				if (answers[string]) {
					calculation = calculation.replace(`{${string}}`, answers[string]);
				} else {
					return 0;
				}
			}
			return eval(calculation);
		});
	};
	$: gallons = 0;
	$: if (globalChart) {
		globalChart.update();
		gallons = calculator().reduce((a, b) => a + b, 0);
	}

	const handleChart = (element: HTMLCanvasElement) => {
		const chart = new Chart(element, {
			type: 'bar',
			options: {
				plugins: {
					legend: {
						display: false
					}
				}
			},
			data: {
				labels: water.map((question) => question.name),
				datasets: [
					{
						label: currentQuestion.name,
						data: calculator(),
						backgroundColor: [
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)'
						],
						borderColor: [
							'rgba(54, 162, 235, 1)',
							'rgba(255, 99, 132, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 99, 132, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 99, 132, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)'
						],
						borderWidth: 1
					}
				]
			}
		});

		globalChart = chart;
	};
</script>

<main class="WaterCalculate">
	<section>
		<div class="w-100 Row--between gap-15">
			<p>
				You have used {gallons} gallons of water
			</p>
			<button
				class="CrispButton"
				on:click={() => {
					isDemo = !isDemo;
					if (globalChart) {
						answers = isDemo ? preset : {};
						gallons = calculator().reduce((a, b) => a + b, 0);
						globalChart.data.datasets[0].data = calculator();
						globalChart.update();
					}
				}}
			>
				Toggle Demo
			</button>
		</div>
		<canvas use:handleChart />
		{#each currentQuestion.questions as question}
			<div class="WaterCalculate__question">
				<h3>
					{question.question}
				</h3>
				<p>
					{question.description}
				</p>
				<select class="CrispSelect" bind:value={answers[question.id]}>
					{#each Object.keys(question.options) as option}
						<option value={question.options[option]}>{option}</option>
					{/each}
				</select>
			</div>
		{/each}
		<div class="Row--end w-100 gap-15">
			<button class="CrispButton" on:click={() => questionNumber--} disabled={questionNumber === 0}>
				Back
			</button>
			{#if questionNumber === water.length - 1}
				<form action="/water/calculate?/result" method="post">
					<input type="hidden" name="answers" value={JSON.stringify(answers)} />
					<input type="hidden" name="volume" value={calculator().reduce((a, b) => a + b, 0)} />
					<button class="CrispButton" type="submit"> Submit </button>
				</form>
			{:else}
				<button
					class="CrispButton"
					on:click={() => {
						questionNumber++;
						if (globalChart) {
							globalChart.data.datasets[0].data = calculator();
							console.log(answers, calculator());
						}
					}}
				>
					Next
				</button>
			{/if}
		</div>
	</section>
</main>

<style lang="scss">
	.WaterCalculate {
		@include box(100%, auto);
		@include make-flex($just: flex-start);
		gap: 90px;
		max-width: 800px;
		padding-top: 64px;
		margin-bottom: auto;

		& > section {
			@include make-flex();
			@include box(100%, auto);
			padding: 100px 30px 30px 30px;
		}

		&__question {
			@include box(100%, auto);
			padding: 20px 0;
			@include make-flex();
			gap: 20px;
			h3 {
				font-size: 34px;
				font-weight: 700;
				text-align: start;
				color: var(--blue);
				@include box(100%, auto);
			}

			& > p {
				font-size: 20px;
				font-weight: 400;
				text-align: start;
				color: var(--subText);
				@include box(100%, auto);
			}

			& > select {
				width: 60%;
			}
		}
	}
</style>
