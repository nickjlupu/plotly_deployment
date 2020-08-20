
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

      PANEL.html("");
      Object.entries(result).forEach(([key,value]) => {
        item = (key+": "+value)
        PANEL.append("h6").text(item);
      })
  });
}


// TO DO:  BUILD CHARTS WITH THIS FUNCTION
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samplesArray = data.samples;
    var filteredSamplesArray = samplesArray.filter(sampleObj => sampleObj.id == sample);
    console.log(filteredSamplesArray)
    var sampleValues = filteredSamplesArray[0].sample_values.slice(0,10).reverse();
    var otuIds = filteredSamplesArray[0].otu_ids.slice(0,10).reverse();
    var otuLabels = filteredSamplesArray[0].otu_labels.slice(0,10).reverse();
    // var BAR = d3.select("#bar");

    var barData = {
      type: 'bar',
      x: sampleValues,
      y: otuIds.map((item) => "OTU" + item),
      text: otuLabels,
      orientation: 'h'
    };

    var layout = {
      title: 'Top 10 Bacterial Species'
    };

    Plotly.newPlot('bar', [barData], layout);
    
  });
}