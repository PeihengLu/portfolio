"use strict";
// Removed the import statement for D3.js as it is included via a CDN in the HTML
// import * as d3 from 'd3';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Example: Fetch weather data and display a graph using D3
function fetchWeatherData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, labels, temperatures, typedTemperatures, svg, xScale, yScale;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    labels = data.hourly.time.slice(0, 24);
                    temperatures = data.hourly.temperature_2m.slice(0, 24);
                    typedTemperatures = temperatures.map(Number);
                    svg = d3.select('#weatherChart')
                        .append('svg')
                        .attr('width', 500)
                        .attr('height', 300);
                    xScale = d3.scaleBand()
                        .domain(labels)
                        .range([0, 480])
                        .padding(0.1);
                    yScale = d3.scaleLinear()
                        .domain([0, d3.max(typedTemperatures) || 0])
                        .range([280, 0]);
                    // Explicitly type parameters in D3 callback functions
                    svg.append('g')
                        .attr('transform', 'translate(10, 280)')
                        .call(d3.axisBottom(xScale).tickFormat(function (d, i) { return i % 3 === 0 ? d : ''; }));
                    svg.append('g')
                        .attr('transform', 'translate(10, 0)')
                        .call(d3.axisLeft(yScale));
                    // Update the weather chart
                    svg.selectAll('.bar')
                        .data(typedTemperatures)
                        .enter()
                        .append('rect')
                        .attr('class', 'bar')
                        .attr('x', function (d, i) { return xScale(labels[i]) || 0; })
                        .attr('y', function (d) { return yScale(d); })
                        .attr('width', xScale.bandwidth())
                        .attr('height', function (d) { return 280 - yScale(d); })
                        .attr('fill', 'steelblue');
                    return [2 /*return*/];
            }
        });
    });
}
// Example: Fetch COVID-19 data and display a graph using D3
function fetchCovidData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, labels, cases, numericCases, svg, xScale, yScale;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    labels = Object.keys(data.cases);
                    cases = Object.values(data.cases);
                    numericCases = cases.map(function (value) { return typeof value === 'string' ? parseFloat(value) : value; });
                    svg = d3.select('#covidChart')
                        .append('svg')
                        .attr('width', 500)
                        .attr('height', 300);
                    xScale = d3.scaleBand()
                        .domain(labels)
                        .range([0, 480])
                        .padding(0.1);
                    yScale = d3.scaleLinear()
                        .domain([0, d3.max(numericCases) || 0])
                        .range([280, 0]);
                    // Explicitly type parameters in D3 callback functions for COVID data
                    svg.append('g')
                        .attr('transform', 'translate(10, 280)')
                        .call(d3.axisBottom(xScale).tickFormat(function (d, i) { return i % 5 === 0 ? d : ''; }));
                    svg.append('g')
                        .attr('transform', 'translate(10, 0)')
                        .call(d3.axisLeft(yScale));
                    // Update the COVID chart
                    svg.selectAll('.bar')
                        .data(numericCases)
                        .enter()
                        .append('rect')
                        .attr('class', 'bar')
                        .attr('x', function (d, i) { return xScale(labels[i]) || 0; })
                        .attr('y', function (d) { return yScale(d); })
                        .attr('width', xScale.bandwidth())
                        .attr('height', function (d) { return 280 - yScale(d); })
                        .attr('fill', 'orange');
                    return [2 /*return*/];
            }
        });
    });
}
// Call the functions to fetch data and render graphs
fetchWeatherData();
fetchCovidData();
