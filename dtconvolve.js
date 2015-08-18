
var DTConvolve = function(p){
		var plotXn,plotHn,plotXnmkHk;
		var pointsXn,pointsHn,pointsXnmkHk ;
		var selected = false;
		var point;
		var tempPoint;
		var plotXY;
		var xplot;
		var ctx = document.getElementById("myCanvas");
		var index;
		var length = 42;
	//initial set up
 	p.setup = function() {
	//	var i;
		// Create the canvas
		p.createCanvas(850, 650);

		// Define panel properties
		firstPlotPos = [ 0, 0 ];
		margins = [ 60, 70, 40, 30 ];
		panelDim = [ 0.5 * (p.width - margins[1] - margins[3]), 0.5 * (p.width - margins[0] - margins[2]) ];

		// Create four plots

		//get points for x[n]
		pointsXn = [];
		for(i = 0; i < 23; i++){
			pointsXn[i]= new GPoint(i-11,0);
		}
		//x[n] plot set up
		plotXn = new GPlot(p);
		plotXn.setPos(firstPlotPos);
		plotXn.setOuterDim(0.4 * p.width, 0.3 * p.width);
		plotXn.setXLim(-11,11);
		plotXn.setYLim(-5,5);
		plotXn.getXAxis().getAxisLabel().setText("Time(n)");
		plotXn.getYAxis().getAxisLabel().setText("x[n]");
		plotXn.getTitle().setText("x[n]");
		plotXn.setPoints(pointsXn);

		//get points for h[n]
		pointsHn = [];
		for(i = 0; i < 23; i++){
			pointsHn[i]= new GPoint(i-11,0);
		}
		//h[n] plot set up
		plotHn = new GPlot(p);
		plotHn.setPos(0.4*p.width,0);
		plotHn.setOuterDim(0.4 * p.width, 0.3 * p.width);
		plotHn.setXLim(-11,11);
		plotHn.setYLim(-5,5);
		plotHn.getXAxis().getAxisLabel().setText("Time(n)");
		plotHn.getYAxis().getAxisLabel().setText("h[n]");
		plotHn.getTitle().setText("h[n]");
		plotHn.setPoints(pointsHn);
		plotHn.setPointColor(p.color(100,100,255));


		//get points for x[n-k] and h[k]
		//leave points empty for now, will be filled in draw()
		pointsXnmkHk = [];

		//set up plot x[n-k] and h[k]
		plotXnmkHk = new GPlot(p);
		plotXnmkHk.setPos(0,0.3*p.width);
		plotXnmkHk.setOuterDim(0.8 * p.width, 0.3 * p.width);
		plotXnmkHk.setXLim(-21,21);
		plotXnmkHk.setYLim(-5,5);
		plotXnmkHk.getXAxis().getAxisLabel().setText("Time(n)");
		plotXnmkHk.getYAxis().getAxisLabel().setText("x[n-k] and h[k]");
		plotXnmkHk.getTitle().setText("x[n-k] and h[k]");
		plotXnmkHk.setPoints(pointsXnmkHk);

		//setup the mouse actions
		window.addEventListener("mousedown",this.mouseDownEvent.bind(this));
		window.addEventListener("mousemove",this.mouseMovedEvent.bind(this));
		window.addEventListener("mouseup",this.mouseUpEvent.bind(this));
	};

	//execute sketch
	p.draw = function() {
		//var xPoints, yPoints;
		//clean canvas
		p.background(255);
		//update points for x[n]

		//draw x[n] plot
		plotXn.beginDraw();
		plotXn.drawBox();
		plotXn.drawXAxis();
		plotXn.drawYAxis();
		plotXn.drawTopAxis();
		plotXn.drawRightAxis();
		plotXn.drawTitle();
		plotXn.drawLabels();
		plotXn.drawGridLines(GPlot.BOTH);

		//draw lines to points
		for(i = 0; i<pointsXn.length;i++){
			tempPoint = plotXn.getPoints()[i];
			plotXn.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(251,101,101),2);
		}
		plotXn.getLayer("main layer").updatePlotPoints();
		plotXn.drawPoints();
		plotXn.endDraw();

		//actions for x[n] plot
		//plotXn.activatePointLabels();

		//draw h[n] plot
		plotHn.beginDraw();
		plotHn.drawBox();
		plotHn.drawXAxis();
		plotHn.drawYAxis();
		plotHn.drawTopAxis();
		plotHn.drawRightAxis();
		plotHn.drawTitle();
		plotHn.drawLabels();
		plotHn.drawGridLines(GPlot.BOTH);
		//draw lines to points
		for(i = 0; i<pointsHn.length;i++){
			tempPoint = plotHn.getPoints()[i];
			plotHn.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(100,100,255),2);
		}
		plotHn.getLayer("main layer").updatePlotPoints();
		plotHn.drawPoints();
		plotHn.endDraw();

		//get points for x[n-k] and h[k]
		//have to insert every other due to library coloring algorithm
		var j = 0;
		for(i = 0; i < pointsXn.length; i++){
			pointsXnmkHk[j] = new GPoint(-plotXn.getPoints()[i].getX(),plotXn.getPoints()[i].getY());
			j+=2;
		}
		j = 1;
		for(i = 0; i < pointsHn.length; i++){
			pointsXnmkHk[j] = plotHn.getPoints()[i];
			j+=2;
		}
		plotXnmkHk.setPoints(pointsXnmkHk);

		var XnmkhKColors = [p.color(251,101,101),p.color(100,100,255)];
		plotXnmkHk.setPointColors(XnmkhKColors);

		//draw X[n-k] and h[k]
		plotXnmkHk.beginDraw();
		plotXnmkHk.drawBox();
		plotXnmkHk.drawXAxis();
		plotXnmkHk.drawYAxis();
		plotXnmkHk.drawTopAxis();
		plotXnmkHk.drawRightAxis();
		plotXnmkHk.drawTitle();
		plotXnmkHk.drawLabels();
		plotXnmkHk.drawGridLines(GPlot.BOTH);
		plotXnmkHk.drawPoints();
		//draw lines to points
		for(i = 0; i<pointsXnmkHk.length;i++){
			tempPoint = plotXnmkHk.getPoints()[i];
			if(i % 2 == 0){
				plotXnmkHk.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(251,101,101),2);
			}
			else {
				plotXnmkHk.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(100,100,255),2);
			}
		}
		//draw filler points
		for(i = 0; i<length; i++){
			if(i < 10 || i>32){
				plotXnmkHk.drawPoint(new GPoint(i-21,0),p.color(100,100,255),plotXnmkHk.getLayer("main layer").getPointSizes()[0]);
			}
			else{
			}
		}
		plotXnmkHk.endDraw();
	};

	p.mouseDownEvent = function(event){
	//	console.log("mouse downed");
		if(plotXn.isOverBox()){
			plotXY = plotXn.getValueAt(p.mouseX,p.mouseY);
			xPlot = Math.round(plotXY[0]);
			index = xPlot + 11;
			plotXn.getPointsRef()[index].setY(plotXY[1]);
			selected = true;
	//		console.log(selected);
		}
		else if(plotHn.isOverBox()){
			plotXY = plotHn.getValueAt(p.mouseX,p.mouseY);
			xPlot = Math.round(plotXY[0]);
			index = xPlot + 11;
			plotHn.getPointsRef()[index].setY(plotXY[1]);
			selected = true;
		//	console.log(selected);
		}
		else if (plotXnmkHk.isOverBox()){
			selected = true;
		}
		else {
			selected = false;
		}
	};

	p.mouseMovedEvent = function(event){
//		console.log("mouse moved");
			if(selected){
				if(plotXn.isOverBox()){
					plotXY = plotXn.getValueAt(p.mouseX,p.mouseY);
					xPlot = Math.round(plotXY[0]);
					index = xPlot + 11;
			//		console.log(selected);
					plotXn.getPointsRef()[index].setY(plotXY[1]);
				}
				else if(plotHn.isOverBox()){
					plotXY = plotHn.getValueAt(p.mouseX,p.mouseY);
					xPlot = Math.round(plotXY[0]);
					index = xPlot + 11;
			//		console.log(selected);
					plotHn.getPointsRef()[index].setY(plotXY[1]);
				}
				else if(plotXnmkHk.isOverBox()){

				}
				else {
					selected = false;
				}
			}
	};

	p.mouseUpEvent = function(event){
	//	console.log("mouse upped");
		selected = false;
	};
}
var myp5 = new p5(DTConvolve);
