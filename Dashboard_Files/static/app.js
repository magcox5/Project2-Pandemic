console.log("Welcome to Melissa's Belly Button Homework")

// create the function to get the necessary data
function getRightID(id) {
    // read the json file to get data
    // The data from the JSON file is arbitrarily named importedData as the argument

    d3.json("data/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
   		// each of these is an array
       var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getRightID(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    // the id for the dropdown is: selDataset

    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getRightID(data.names[0]);
    });
}

function getPlot(id) {
// Use the D3 library to read in samples.json

    d3.json("data/samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        
        // filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // Getting the top 10 
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
       console.log(samplevalues)

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// make a function for data plotting (bar and bubble) for top 10

       var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();        
        // get the otu ids   
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
       console.log(OTU_id)
  
  
        // get the otu labels for the top 10 OTUs found per individual.
        var labels = samples.otu_labels.slice(0, 10);
  
      //   console.log(`Sample Values: ${samplevalues}`)
      //   console.log(`Id Values: ${OTU_top}`)
        // create trace variable for the plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            textposition: "inside",
            hovertext : labels,
            type:"bar",
            orientation: "h",
        };
  
        // create data variable
        var data = [trace];
  
        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTUs per Individual",
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
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                colorscale: 'Portland',
            },
            text: samples.otu_labels
  
        };
  
        // set the layout for the bubble plot
        var bubbleChart = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        // creating data variable 
        var data = [trace1];
  
        
        // make a bubble plot
        Plotly.newPlot("bubble", data, bubbleChart); 


      });
  }  


init();