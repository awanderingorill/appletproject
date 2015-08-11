
var DTConvolve = function(p){
		var plotXn = undefined;
	//initial set up
 	p.setup =function() {
		
		// Create the canvas
		p.createCanvas(850, 650);

		// Define panel properties
		firstPlotPos = [ 0, 0 ];
		margins = [ 60, 70, 40, 30 ];
		panelDim = [ 0.5 * (p.width - margins[1] - margins[3]), 0.5 * (p.width - margins[0] - margins[2]) ];

		// Create four plots

		//get points for x[n]
		pointsXn = [];
		//x[n] plot set up
		plotXn = new GPlot(p);
		plotXn.setPos(firstPlotPos);
		plotXn.setOuterDim(0.6 * p.width, 0.4 * p.width);
		plotXn.setXLim(-5,5);
		plotXn.setYLim(-5,5);
		plotXn.getXAxis().getAxisLabel().setText("Time");
		plotXn.getYAxis().getAxisLabel().setText("x[n]");
		plotXn.getTitle().setText("x[n]");
		plotXn.setPoints(pointsXn);
		plotXn.setLineColor(p.color(200,200,255));

	};

	//execute sketch
	p.draw = function() {
		//clean canvas
		p.background(255);

		//draw x[n] plot
		plotXn.beginDraw();
		plotXn.drawBox();
		plotXn.drawXAxis();
		plotXn.drawYAxis();
		plotXn.drawTopAxis();
		plotXn.drawRightAxis();
		plotXn.drawTitle();
		plotXn.drawLabels();
		plotXn.endDraw();
	};
};

var myp5 = new p5(DTConvolve);