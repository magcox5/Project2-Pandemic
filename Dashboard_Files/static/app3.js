console.log ("Pandemic Dashboard")

function getPandemic(id) {
//read the json to get data

d3.json("/planetary/pandemics.json").then(function(data) {
console.log(data[0]);
})
};