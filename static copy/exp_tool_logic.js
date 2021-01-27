var factorArray = [
    'Age',
    'Business Travel',
    'Department',
    'Commute (Miles)',
    'Environment Satisfaction',
    'Gender',
    'Job Involvement',
    'Job Level',
    'Job Satisfaction',
    'Monthly Income',
    'Performance Rating',
    'Stock Option Level',
    'Training Last Year'
]

d3.select("#selectFactor").selectAll()
    .data(factorArray)
    .enter()
    .append("option")
    .html(function(data) {
        return `<option>${data}</option>`
    })

d3.json('/attrition_by_factor', function(data) {

    category = []
    count = []
    active = []
    turnover = []
    factors = []
        // Traversing the JSON data 
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

    var input = d3.select("#selectFactor")
    var filterButton = d3.select("#filter-btn")

    filterButton.on("click", runFilter());
    input.on("submit", runFilter());


    function runFilter() {
        // d3.event.preventDefault();

        // reset form 
        d3.selectAll("tbody td").remove()

        // Filter data by date input by user and append it to table 
        var inputValue = d3.select("#selectFactor").property("value")
        var index = factors.indexOf(inputValue)

        console.log(inputValue, index)

        //     var row = tbody.append("tr");
        //     var cell = row.append("td");

        //     var cellValCat = category[index]
        //     var cellValCount = count[index]
        //     var cellValActive = active[index]
        //     var cellValTurnover = turnover[index]


    }

})