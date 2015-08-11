
var DTConvolve = function(p){
	//initial set up
 	p.setup()=function() {
		var maxCanvasWidth, canvasWidth, canvasHeight;
		var firstPlotPos, margins, panelDim, plotXn, plotHn, plot3, plot4;
		var pointsXn, pointshn, points3, points4;

		// Resize the canvas if necessary
		maxCanvasWidth = document.getElementById("widthRef").clientWidth - 20;
		canvasWidth = 500;
		canvasHeight = canvasWidth;

		if (canvasWidth > maxCanvasWidth) {
			canvasHeight = canvasHeight * maxCanvasWidth / canvasWidth;
			canvasWidth = maxCanvasWidth;
		}

		// Create the canvas
		p.createCanvas(canvasWidth, canvasHeight);

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
		plotXn.steLineColor(p.color(200,200,255));
		//get points for h[n]
		points Hn = [];
	/*	plot2 = new GPlot(p);
		plot2.setPos(firstPlotPos[0] + margins[1] + panelDim[0], firstPlotPos[1]);
		plot2.setMar(0, 0, margins[2], margins[3]);
		plot2.setDim(panelDim);
		plot2.setAxesOffset(0);
		plot2.setTicksLength(-4);
		plot2.getXAxis().setDrawTickLabels(true);
		plot2.getYAxis().setDrawTickLabels(true);*/
	}

	function draw(){
	ellipse(50, 50, 80, 80);
	};
};