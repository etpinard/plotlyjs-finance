# plotlyjs-finance

A plotly.js finance chart wrapper

### Available chart types

- Open-high-low-close (OHLC) charts

<img src="https://plot.ly/~etpinard/5365/increasing-vs-decreasing.png">

- Candlestick charts

<img src="https://plot.ly/~etpinard/5371/increasing-vs-decreasing.png">


### Installation

```
npm install plotlyjs-finance
```


### Examples

HTML page (more info on the [plotlyjs homepage](https://plot.ly/javascript-graphing-library/)):

```html
<!DOCTYPE html>
<head>
    <!-- D3.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <!-- Plotly.js -->
    <script src="https://d14fo0winaifog.cloudfront.net/plotly-basic.js"></script>
    <!-- PlotlyFinance -->
    <script src="https://cdn.rawgit.com/etpinard/plotlyjs-finance/master/plotlyjs-finance.js"></script>
</head>
<body>

<div id="myDiv" style="width: 700px; height: 500px"></div>

<script>
var fig = PlotlyFinance.createOHLC(  // or PlotlyFinance.createCandlestick
    {
        open: [33.01, 33.31, 33.50, 32.06, 34.12, 33.05, 33.31, 33.50],
        high: [34.20, 34.37, 33.62, 34.25, 35.18, 33.25, 35.37, 34.62],
        low: [31.70, 30.75, 32.87, 31.62, 30.81, 32.75, 32.75, 32.87],
        close: [34.10, 31.93, 33.37, 33.18, 31.18, 33.10, 32.93, 33.70],
        dates: [
            [2013,3,4], [2013,6,5], [2013,9,6], [2013,12,4],
            [2014,3,5], [2014,6,6], [2014,9,4], [2014,12,5]
        ].map(function(d) { return new Date(d[0], d[1]-1, d[2]); })
    }
);

Plotly.plot('myDiv', fig.data, fig.layout);
</script>
</body>
</html>
```

Node.js script (more info on [plotly-nodejs api homepage](https://github.com/plotly/plotly-nodejs)):

```js
var PlotlyFinance = require('plotlyjs-finance');
var plotly = require('plotly')('username', 'apikey');

var fig = PlotlyFinance.createOHLC(  // or PlotlyFinance.createCandlestick
    {
        open: [33.01, 33.31, 33.50, 32.06, 34.12, 33.05, 33.31, 33.50],
        high: [34.20, 34.37, 33.62, 34.25, 35.18, 33.25, 35.37, 34.62],
        low: [31.70, 30.75, 32.87, 31.62, 30.81, 32.75, 32.75, 32.87],
        close: [34.10, 31.93, 33.37, 33.18, 31.18, 33.10, 32.93, 33.70],
        dates: [
            [2013,3,4], [2013,6,5], [2013,9,6], [2013,12,4],
            [2014,3,5], [2014,6,6], [2014,9,4], [2014,12,5]
        ].map(function(d) { return new Date(d[0], d[1]-1, d[2]); })
    }
);

var graphOptions = {
    filename: 'ohlc-first',
    fileopt: 'overwrite',
    layout: fig.layout
};

plotly.plot(fig.data, graphOptions, function(err, msg) {
    console.log(msg);
});

```

more in `examples/`


### API

`PlotlyFinance.createOHLC` and `PlotlyFinance.createCandlestick` take the same
arguments: a `data` object and an `opts` object.

- `data` is an object with required keys `open`, `high`, `low` and `close`
linked to numerical arrays. Optionally `dates` can be linked to an array of dates

- `opts` is an object of plotlyjs trace options and/or a `direction` key set to
`'both'` (the default), `'increasing'` or `'decreasing'`
