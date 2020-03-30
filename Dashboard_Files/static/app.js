console.log("Welcome to our Pandemic Dashboard")

// create the function to get the necessary data
function getRightID(id) {
    // read the json file to get data
    // The data from the JSON file is arbitrarily named importedData as the argument

    d3.json("data/pandemics.json", (data)=> {
        
        // get the metadata info for the demographic panel
   		// each of these is an array
       var pandemics = data.pandemics;
console.log("this is Pandemics:")
        console.log(pandemics)

        // filter meta data info by id
        var result = pandemics.filter(meta => meta.Pandemic === id);

        var totalcases = d3.sum(result, d => d.Cases);
        var totaldeaths = d3.sum(result, d => d.Deaths);

        var pandemicmetadata = {

          "pandemic": id,
          "totalcases": totalcases,
          "totaldeaths": totaldeaths

        }

        // select demographic panel to put data
        var pandemicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        pandemicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(pandemicmetadata).forEach((key) => {   
                pandemicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
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
    d3.json("data/pandemics.json",(data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlot(data.names[1]);
        //getRightID(data.names[0]);
    });
}

function getNewPlanet(pandemics){
    var globe = planetaryjs.planet();
    console.log(globe)
    // Load our custom `autorotate` plugin; see below.
    globe.loadPlugin(autorotate(10));/*samsaysaddthis*/
    // The `earth` plugin draws the oceans and the land; it's actually
    // a combination of several separate built-in plugins.
    //
    // Note that we're loading a special TopoJSON file
    // (world-110m-withlakes.json) so we can render lakes.
    globe.loadPlugin(planetaryjs.plugins.earth({
      topojson: { file:   'world-110m-withlakes.json' },
      oceans:   { fill:   '#000080' },
      land:     { fill:   '#339966' },
      borders:  { stroke: '#008000' }
    }));/*samsaysaddthis*/
    // Load our custom `lakes` plugin to draw lakes; see below.
    globe.loadPlugin(lakes({
      fill: '#000080'
    }));/*samsaysaddthis*/
    // The `pings` plugin draws animated pings on the globe.
    globe.loadPlugin(planetaryjs.plugins.pings());/*samsaysaddthis*/
    // The `zoom` and `drag` plugins enable
    // manipulating the globe with the mouse.
    globe.loadPlugin(planetaryjs.plugins.zoom({
      scaleExtent: [100, 300]
    }));/*samsaysaddthis*/
    globe.loadPlugin(planetaryjs.plugins.drag({
      // Dragging the globe should pause the
      // automatic rotation until we release the mouse.
      onDragStart: function() {
        this.plugins.autorotate.pause();
      },
      onDragEnd: function() {
        this.plugins.autorotate.resume();
      }
    }));/*samsaysaddthis*/
    // Set up the globe's initial scale, offset, and rotation.
    globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);/*samsaysaddthis*/
  
    // Every few hundred milliseconds, we'll draw another random ping.
    var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
  
    //start loop here 
    for (let index = 0; index < pandemics.length; index++) {
        const element = pandemics[index];
    setInterval(function() {
      var lat = element["lat"];
      var lng = element["lon"];
    // var lat = Math.random() * 170 - 85;
    // var lng = Math.random() * 360 - 180;
      var color = colors[Math.floor(Math.random() * colors.length)];
     globe.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: Math.random() * 10 });
    }, 250);

    }
    //end foreach
  
    var canvas = document.getElementById('rotatingGlobe');/*samsaysaddthis*/
    console.log(canvas)
    // Special code to handle high-density displays (e.g. retina, some phones)
    // In the future, Planetary.js will handle this by itself (or via a plugin).
    if (window.devicePixelRatio == 2) {
      canvas.width = 800;
      canvas.height = 800;
      context = canvas.getContext('2d');
      context.scale(2, 2);
    }/*samsaysaddthis*/
    // Draw that globe!
    globe.draw(canvas);/*samsaysaddthis*/
}

  // This plugin will automatically rotate the globe around its vertical
  // axis a configured number of degrees every second.
  function autorotate(degPerSec) {
    // Planetary.js plugins are functions that take a `planet` instance
    // as an argument...
    return function(planet) {
      var lastTick = null;
      var paused = false;
      planet.plugins.autorotate = {
        pause:  function() { paused = true;  },
        resume: function() { paused = false; }
      };
      // ...and configure hooks into certain pieces of its lifecycle.
      planet.onDraw(function() {
        if (paused || !lastTick) {
          lastTick = new Date();
        } else {
          var now = new Date();
          var delta = now - lastTick;
          // This plugin uses the built-in projection (provided by D3)
          // to rotate the globe each time we draw it.
          var rotation = planet.projection.rotate();
          rotation[0] += degPerSec * delta / 1000;
          if (rotation[0] >= 180) rotation[0] -= 360;
          planet.projection.rotate(rotation);
          lastTick = now;
        }
      });
    };
  };

  // This plugin takes lake data from the special
  // TopoJSON we're loading and draws them on the map.
  function lakes(options) {
    options = options || {};
    var lakes = null;

    return function(planet) {
      planet.onInit(function() {
        // We can access the data loaded from the TopoJSON plugin
        // on its namespace on `planet.plugins`. We're loading a custom
        // TopoJSON file with an object called "ne_110m_lakes".
        var world = planet.plugins.topojson.world;
        lakes = topojson.feature(world, world.objects.ne_110m_lakes);
      });

      planet.onDraw(function() {
        planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)(lakes);
          context.fillStyle = options.fill || 'black';
          context.fill();
        });
      });
    };
  };
function getPlot(id) {
// Use the D3 library to read in samples.json

    d3.json("data/pandemics.json",(data)=> {
        console.log(data)
  
        var cases = data.pandemics.map(d => d.Cases)
        console.log(`Total Cases: ${cases}`)
        
        // filter pandemic values by name 
        var pandemics = data.pandemics.filter(s => s.Pandemic.toString() === id);
        
        console.log(pandemics);
        d3.sum(pandemics, d => d.cases)
        // Getting the total 
        var totalcases = d3.sum(pandemics, d => d.Cases);
        //Get top 10
       var sortedcases = pandemics.sort((a, b) => d3.descending(a.Cases, b.Cases)).slice(0,10)

       console.log(sortedcases)

       getNewPlanet(pandemics);
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// make a function for data plotting (bar and bubble) for top 10

      //  var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();        
      //   // get the otu ids   
      //   var OTU_id = OTU_top.map(d => "OTU " + d)
  
      //  console.log(OTU_id)
  
  
      //   // get the otu labels for the top 10 OTUs found per individual.
      //   var labels = samples.otu_labels.slice(0, 10);
  
      // //   console.log(`Sample Values: ${samplevalues}`)
      // //   console.log(`Id Values: ${OTU_top}`)
      //   // create trace variable for the plot
      //   var trace = {
      //       x: samplevalues,
      //       y: OTU_id,
      //       textposition: "inside",
      //       hovertext : labels,
      //       type:"bar",
      //       orientation: "h",
      //   };
  
      //   // create data variable
      //   var data = [trace];
  
      //   // create layout variable to set plots layout
      //   var layout = {
      //       title: "Top 10 OTUs per Individual",
      //       yaxis:{
      //           tickmode:"linear",
      //       },
      //       margin: {
      //           l: 100,
      //           r: 100,
      //           t: 100,
      //           b: 30
      //       }
      //   };
  
      //   // create the bar plot
      //   Plotly.newPlot("bar", data, layout);
  
      //   //console.log(`ID: ${samples.otu_ids}`)
      
      //   // Making a bubble chart
      //   var trace1 = {
      //       x: samples.otu_ids,
      //       y: samples.sample_values,
      //       mode: "markers",
      //       marker: {
      //           size: samples.sample_values,
      //           color: samples.otu_ids,
      //           colorscale: 'Portland',
      //       },
      //       text: samples.otu_labels
  
      //   };
  
      //   // set the layout for the bubble plot
      //   var bubbleChart = {
      //       xaxis:{title: "OTU ID"},
      //       height: 600,
      //       width: 1000
      //   };
  
      //   // creating data variable 
      //   var data = [trace1];
  
        
      //   // make a bubble plot
      //   Plotly.newPlot("bubble", data, bubbleChart); 


      });
  }  


init();