function draw(file, client){
  var width = 550, height = 600;

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .size([width, height]);
  if (client) {
  	var svg = d3.select("#svg-holder-client").append("svg")
  }else{
  	var svg = d3.select("#svg-holder").append("svg")
  }
  svg.attr("width", width)
    .attr("height", height);
  d3.json("/data/d3/"+file, function(error, graph) {
    if (error) throw error;

    force
        .nodes(graph.nodes)
        .links(graph.links)

    force.start();

    var link = svg.selectAll(".link")
        .data(graph.links)
      .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.selectAll(".node")
        .data(graph.nodes)
      .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .style("fill", function(d) { return color(d.test); })
        .call(force.drag);

    node.append("title")
        .text(function(d) { return d.name; });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    });
  });
}

function displayNeighbours(){
	args_select = {
		type: "GET",
		url: "/select/",
		data: $('#select').serialize(),
		success: function(html){
			$("table#near-spectacles tbody").empty();
			$("table#near-spectacles").tablesorter(); 
			$("table#near-spectacles tbody").append(html);
			$("table").trigger("update");  
			$("table#near-spectacles").tablesorter({
		        widgets: ['indexFirstColumn']
		    });
			$("table#near-spectacles").show();
		},
		error: function(){
			alert("failure");
		}
	}
	$.ajax(args_select);
}
$(document).ready(function() { 
	$.tablesorter.addWidget({
	    // give the widget a id
	    id: "indexFirstColumn",
	    // format is called when the on init and when a sorting has finished
	    format: function(table) {               
	        // loop all tr elements and set the value for the first column  
	        for(var i=0; i < table.tBodies[0].rows.length; i++) {
	            $("tbody tr:eq(" + i + ") td:first",table).html(i+1);
	        }                                   
	    }
	});

	if ($('#navbar-holder').length) {

		$("table#ranking").tablesorter({
	        widgets: ['indexFirstColumn']
	    });
	    $("tr.first").each(function(index){
	    	$(this).html() = parseInt($(this).html()) + 1
	    })

	    args_kpi = {
			type: "GET",
			url: "/kpi",
			data: JSON.parse($('#best-ponderation').val()),
			success: function(html){
				$("table#kpi tbody").empty();
				$("#tableloadkpi").hide();
				$("#tableloadselect").hide();
				$("table#kpi").show();
				$("table#kpi").tablesorter(); 
				$("table#kpi tbody").append(html);
				$("table").trigger("update");  
			},
			error: function(){
				alert("failure");
			}
		}

	    args = {
			type: "GET",
			url: "/graph/",
			data: JSON.parse($('#best-ponderation').val()),
			success: function(msg){
				$("#graphload").hide()
	  			$("#svg-holder-client").show()
	  			$("#svg-holder").show()
				msg = JSON.parse(msg)
				draw(msg.name, false)
				draw(msg.name.split(".")[0]+"-client.json", true)
				$("#file").val(msg.name)
				$.ajax(args_kpi);
			},
			error: function(){
				alert("failure");
			}
		}
		$.ajax(args);
	};
});       