console.log("Welcome to our Pandemic Dashboard")

// create the function to get the necessary data
function getRightCountry(id) {
    // read the json file to get data
    // The data from the JSON file is arbitrarily named importedData as the argument

    d3.json("data/samples3.json").then((data)=> {
        
        // get the metadata info for the demographic panel
   		// each of these is an array
       var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by country
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var pandemicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        pandemicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                pandemicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getRightCountry(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    // the id for the dropdown is: selDataset

    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples3.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.pandemic.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getDeaths(data.pandemic[0]);
        getRightID(data.pandemic[0]);
    });
}
function getDeaths(id) {
    // Use the D3 library to read in samples.json
    
        d3.json("data/samples3.json").then((data)=> {
            console.log(data)
      
            var deaths = data.metadata.map(d => d.deaths)
            console.log(`Total Deaths: ${deaths}`)
            
            // filter deaths by country 
            var deaths = data.metadata.filter(s => s.id.toString() === id)[0];
            
            console.log(deaths);
      
            // Getting the top 10 
            var topdeaths = metadata.deaths.slice(0, 10).reverse();
      
           console.log(topdeaths)
 

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// make a function for data plotting (bar and bubble) for top 10

       var Deaths_top = (samples.Country.slice(0, 10)).reverse();        
        // get the countries   
        var Country_id = Country_top.map(d => "Country " + d)
  
       console.log(Country_id)
  
  
        // get the country names for the top 10 countries that lost people to pandemics.
        var labels = metadata.country.slice(0, 10);
  
      //   console.log(`Sample Values: ${samplevalues}`)
      //   console.log(`Id Values: ${OTU_top}`)
        // create trace variable for the plot
        var trace = {
            x: topdeaths,
            y: Country_id,
            textposition: "inside",
            hovertext : labels,
            type:"bar",
            orientation: "h",
        };
  
        // create data variable
        var data = [trace];
  
        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 Cases per Country",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // create the bar plot
        Plotly.newPlot("bar", data, layout);
  
        //console.log(`ID: ${samples.otu_ids}`)
      
        // Making a bubble chart
        var trace1 = {
            x: metadata.country,
            y: metadata.cases,
            mode: "markers",
            marker: {
                size: metadata.cases,
                color: metadata.country,
                colorscale: 'Portland',
            },
            text: metadata.country
  
        };
  
        // set the layout for the bubble plot
        var bubbleChart = {
            xaxis:{title: "Country"},
            height: 600,
            width: 1000
        };
  
        // creating data variable 
        var data = [trace1];
  
        
        // make a bubble plot
        Plotly.newPlot("bubble", data, bubbleChart); 

    
}  


init();