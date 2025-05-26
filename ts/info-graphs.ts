// Removed the import statement for D3.js as it is included via a CDN in the HTML
// import * as d3 from 'd3';

// Example: Fetch weather data and display a graph using D3
async function fetchWeatherData(): Promise<void> {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m');
    const data = await response.json();

    const labels = data.hourly.time.slice(0, 24); // First 24 hours
    const temperatures = data.hourly.temperature_2m.slice(0, 24);
    // Explicitly type the data for D3 functions
    const typedTemperatures: number[] = temperatures.map(Number);

    const svg = d3.select('#weatherChart')
        .append('svg')
        .attr('width', 500)
        .attr('height', 300);

    const xScale = d3.scaleBand()
        .domain(labels)
        .range([0, 480])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(typedTemperatures) || 0])
        .range([280, 0]);

    // Explicitly type parameters in D3 callback functions
    svg.append('g')
        .attr('transform', 'translate(10, 280)')
        .call(d3.axisBottom(xScale).tickFormat((d: string, i: number) => i % 3 === 0 ? d : ''));

    svg.append('g')
        .attr('transform', 'translate(10, 0)')
        .call(d3.axisLeft(yScale));

    // Update the weather chart
    svg.selectAll('.bar')
        .data(typedTemperatures)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => xScale(labels[i]) || 0)
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => 280 - yScale(d))
        .attr('fill', 'steelblue');
}

// Example: Fetch COVID-19 data and display a graph using D3
async function fetchCovidData(): Promise<void> {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30');
    const data = await response.json();

    const labels = Object.keys(data.cases);

    // Explicitly type the cases array as (string | number)[]
    const cases = Object.values(data.cases) as (string | number)[];

    // Convert the cases array to a numeric array
    const numericCases: number[] = cases.map(value => typeof value === 'string' ? parseFloat(value) : value);

    const svg = d3.select('#covidChart')
        .append('svg')
        .attr('width', 500)
        .attr('height', 300);

    const xScale = d3.scaleBand()
        .domain(labels)
        .range([0, 480])
        .padding(0.1);

    // Update the domain for yScale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(numericCases) || 0])
        .range([280, 0]);

    // Explicitly type parameters in D3 callback functions for COVID data
    svg.append('g')
        .attr('transform', 'translate(10, 280)')
        .call(d3.axisBottom(xScale).tickFormat((d: string, i: number) => i % 5 === 0 ? d : ''));

    svg.append('g')
        .attr('transform', 'translate(10, 0)')
        .call(d3.axisLeft(yScale));

    // Update the COVID chart
    svg.selectAll('.bar')
        .data(numericCases)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => xScale(labels[i]) || 0)
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => 280 - yScale(d))
        .attr('fill', 'orange');
}

// Call the functions to fetch data and render graphs
fetchWeatherData();
fetchCovidData();
