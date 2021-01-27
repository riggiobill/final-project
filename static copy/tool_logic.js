d3.json('/attrition_by_factor', function(data) {
    // Parse the json data to arrays:

    category = []
    count = []
    active = []
    turnover = []
    factors = []

    for (var i = 0; i < data.length; i++) {
        var cat = data[i]['Category']
        category.push(cat)
        var cnt = data[i]['Count']
        count.push(cnt)
        var act = data[i]['Active']
        active.push(act)
        var trn = data[i]['Terminated']
        turnover.push(trn)
        var fct = data[i]['factor']
        factors.push(fct)
    }

    // Populate the drop down menu
    d3.select("#selectFactor").selectAll()
        .data(factors)
        .enter()
        .append("option")
        .html(function(data) {
            return `<option>${data}</option>`
        })

    // Create event handler to trigger the table population function when selection is made
    input = d3.select("#selectFactor")
    filterButton = d3.select("#filter-btn")

    input.on("change", function() {;

        // reset form 
        d3.selectAll("tbody td").remove()

        // Filter data by user's selection and append it to table 
        var inputValue = d3.select("#selectFactor").node().value

        var i = factors.indexOf(inputValue)

        var table = d3.select("#table");
        var tbody = table.select("tbody");
        var trow;

        trow = tbody.append("tr");
        trow.append("td").text(factors[i]);
        trow.append("td").text(category[i][0]);
        trow.append("td").text(count[i][0]);
        trow.append("td").text(active[i][0])
        trow.append("td").text(turnover[i][0]);
        trow = tbody.append("tr")
        trow.append("td").text();
        trow.append("td").text(category[i][1]);
        trow.append("td").text(count[i][1]);
        trow.append("td").text(active[i][1]);
        trow.append("td").text(turnover[i][1]);
        trow = tbody.append("tr")
        trow.append("td").text();
        trow.append("td").text(category[i][2]);
        trow.append("td").text(count[i][2]);
        trow.append("td").text(active[i][2]);
        trow.append("td").text(turnover[i][2]);
        trow = tbody.append("tr")
        trow.append("td").text();
        trow.append("td").text(category[i][3]);
        trow.append("td").text(count[i][3]);
        trow.append("td").text(active[i][3]);
        trow.append("td").text(turnover[i][3]);
        trow = tbody.append("tr")
        trow.append("td").text();
        trow.append("td").text(category[i][4]);
        trow.append("td").text(count[i][4]);
        trow.append("td").text(active[i][4]);
        trow.append("td").text(turnover[i][4]);

        // // Insert chart for selected employment factor
        // d3.selectAll("#factorChart").html("")

        d3.json('/attrition_by_factor', function(trace_data) {
            d3.selectAll("#factorChart").html("")
                // var img = document.createElement("img");
                // img.src = `static/${inputValue}.png`;
                // document.getElementById("chart").appendChild(img)

            trace_data = [category[i], active[i], turnover[i]]


            var trace1 = {
                x: trace_data[0],
                y: trace_data[1],
                name: 'Retention',
                type: 'bar',
            };

            var trace2 = {
                x: trace_data[0],
                y: trace_data[2],
                name: 'Turnover',
                type: 'bar',
            }

            var chart_data = [trace1, trace2];
            var layout = {
                barmode: 'group',
                title: `${inputValue}`,
                yaxis: { title: "Percent" },
                legend: {
                    x: .4,
                    xanchor: 'left',
                    y: -.3
                }
            };

            Plotly.newPlot("factorChart", chart_data, layout);
        })

    })
})
d3.json("/bls_data", function(table) {
    var table = document.querySelector("#tableArea > div.col-md-6.bls > table.dataframe > tbody")
    var row = table.rows

    for (var j = 0; j < row.length; j++) {

        row[j].deleteCell(0)
        row[j].deleteCell(0)
    }

    var headRow = document.querySelector("#tableArea > div.col-md-6.bls> table.dataframe > thead > tr")

    headRow.deleteCell(0)
    headRow.deleteCell(0)

})