
var CTConvolve = function(p){
		var plotXn,plotHn,plotFlipShift,plotMultiply,plotConvolve;
		var pointsXn,pointsHn,pointsFlipShift,pointsMultiply,pointsConvolve;
		var selected = false;
		var point;
		var tempPoint;
		var plotXY;
		var xplot;
		var ctx = document.getElementById("myCanvas");
		var index;
		var length = 42;
		var xShift = 0;
	//initial set up
 	p.setup = function() {
		p.frameRate(200);

	//	var i;
		// Create the canvas
		p.createCanvas(850, 1100);

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
		plotXn.getXAxis().getAxisLabel().setText("Time[n]");
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
		plotHn.getXAxis().getAxisLabel().setText("Time[n]");
		plotHn.getYAxis().getAxisLabel().setText("h[n]");
		plotHn.getTitle().setText("h[n]");
		plotHn.setPoints(pointsHn);
		plotHn.setPointColor(p.color(100,100,255));


		//get points for x[n-k] and h[k]
		//leave points empty for now, will be filled in draw()
		pointsFlipShift = [];

		//set up plot x[n-k] and h[k]
		plotFlipShift = new GPlot(p);
		plotFlipShift.setPos(0,0.3*p.width);
		plotFlipShift.setOuterDim(0.8 * p.width, 0.3 * p.width);
		plotFlipShift.setXLim(-21,21);
		plotFlipShift.setYLim(-5,5);
		plotFlipShift.getXAxis().getAxisLabel().setText("Time[k]");
		plotFlipShift.getYAxis().getAxisLabel().setText("x[n-k] and h[k]");
		plotFlipShift.getTitle().setText("x[n-k] and h[k]");
		plotFlipShift.setPoints(pointsFlipShift);

		//get points for x[n-k]h[k]
		//leave points empty for now, will be filled in draw()
		pointsMultiply = [];
		//set up plot x[n-k]h[k]
		plotMultiply = new GPlot(p);
		plotMultiply.setPos(0,0.6*p.width);
		plotMultiply.setOuterDim(0.8 * p.width, 0.3 * p.width);
		plotMultiply.setXLim(-21,21);
		plotMultiply.setYLim(-25,25);
		plotMultiply.getXAxis().getAxisLabel().setText("Time[k]");
		plotMultiply.getYAxis().getAxisLabel().setText("x[n-k]h[k]");
		plotMultiply.getTitle().setText("x[n-k]h[k]");
		plotMultiply.setPoints(pointsFlipShift);

		//getPoints for y[n]
		//leave points empty for now, will be filled in draw()
		pointsConvolve = [];
		plotConvolve = new GPlot(p);
		plotConvolve.setPos(0,0.9*p.width);
		plotConvolve.setOuterDim(0.8 * p.width, 0.3 * p.width);
		plotConvolve.setXLim(-21,21);
	//	plotConvolve.setYLim(-100,100);
		plotConvolve.getXAxis().getAxisLabel().setText("Time(n)");
		plotConvolve.getYAxis().getAxisLabel().setText("y[n]");
		plotConvolve.getTitle().setText("y[n]");
		plotConvolve.setPoints(pointsConvolve);

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
/*		for(i = 0; i<pointsXn.length;i++){
			tempPoint = plotXn.getPoints()[i];
			plotXn.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(251,101,101),2);
		}*/
		plotXn.getLayer("main layer").updatePlotPoints();
		plotXn.setLineColor("cyan");
		plotXn.drawLines();
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
/*		for(i = 0; i<pointsHn.length;i++){
			tempPoint = plotHn.getPoints()[i];
			plotHn.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(100,100,255),2);
		}*/

		plotHn.getLayer("main layer").updatePlotPoints();
		plotHn.setLineColor("orange");
		plotHn.drawLines();
		plotHn.endDraw();

		//get points for x[n-k] and h[k]
		//have to insert every other due to library coloring algorithm
		var j = 0;
		for(i = 0; i < pointsXn.length; i++){
			pointsFlipShift[j] = new GPoint(-plotXn.getPoints()[i].getX()+xShift,plotXn.getPoints()[i].getY());
			j+=2;
		}
		j = 1;
		for(i = 0; i < pointsHn.length; i++){
			pointsFlipShift[j] = plotHn.getPoints()[i];
			j+=2;
		}
		plotFlipShift.setPoints(pointsFlipShift);

		var XnmkhKColors = [p.color(251,101,101),p.color(100,100,255)];
		plotFlipShift.setPointColors(XnmkhKColors);

		//draw X[n-k] and h[k]
		plotFlipShift.beginDraw();
		plotFlipShift.drawBox();
		plotFlipShift.drawXAxis();
		plotFlipShift.drawYAxis();
		plotFlipShift.drawTopAxis();
		plotFlipShift.drawRightAxis();
		plotFlipShift.drawTitle();
		plotFlipShift.drawLabels();
		plotFlipShift.drawGridLines(GPlot.BOTH);

		//drawing lines (due to point dispersement must use custom line drawing algorithm)
		for(i = 0; i<plotFlipShift.getPoints().length-2; i++){
			if(i%2 == 0){
				plotFlipShift.drawLine(plotFlipShift.getPoints()[i],plotFlipShift.getPoints()[i+2],"cyan",1);
			}
			else{
				plotFlipShift.drawLine(plotFlipShift.getPoints()[i],plotFlipShift.getPoints()[i+2],"orange",1);
			}
		}



		//draw lines to points
/*		for(i = 0; i<pointsFlipShift.length;i++){
			tempPoint = plotFlipShift.getPoints()[i];
			if(i % 2 == 0){
				plotFlipShift.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(251,101,101),2);
			}
			else {
				plotFlipShift.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(100,100,255),2);
			}
		}*/

		//draw filler points
		for(i = 0; i<10; i++){
			plotFlipShift.drawPoint(new GPoint(i-21,0),p.color(100,100,255),plotFlipShift.getLayer("main layer").getPointSizes()[0]);
		}
		for(i = 33; i<43; i++){
			plotFlipShift.drawPoint(new GPoint(i-21,0),p.color(100,100,255),plotFlipShift.getLayer("main layer").getPointSizes()[0]);
		}

		var startX,endX,rightBound,
		leftBound = plotFlipShift.getPoints()[pointsFlipShift.length-2].getX();
		if(leftBound > -11){
			startX = -11;
			endX = leftBound-1;
		}
		else{
		 	rightBound = plotFlipShift.getPoints()[0].getX();
		 	if(rightBound < 11){
			startX = rightBound+1;
			endX = 11;
			}
		}

		for(i = startX; i <= endX; i++){
			plotFlipShift.drawPoint(new GPoint(i,0),p.color(251,101,101),plotFlipShift.getLayer("main layer").getPointSizes()[0]);
		}
		plotFlipShift.endDraw();

		//get points for x[n-k]h[k]
		j = 1, k = pointsFlipShift.length-2;
		if(leftBound >= -11){
			for(i = 0; i < 23; i++){
				if(i-11 < leftBound){
					pointsMultiply[i] = new GPoint(i-11,0);
					j+=2;
				}
				else {
					pointsMultiply[i] = new GPoint(i-11,plotFlipShift.getPoints()[j].getY()*plotFlipShift.getPoints()[k].getY());
					j+=2,k-=2;
				}
			}
		}
		else {
			k = pointsFlipShift.length-((-11) - leftBound)*2;
			for(i = 0; i < 23; i++){
	//			console.log(k,j);
				if(k >= 0){
					pointsMultiply[i] = new GPoint(i-11,plotFlipShift.getPoints()[j].getY()*plotFlipShift.getPoints()[k].getY());
					j+=2,k-=2;
				}
				else{
					pointsMultiply[i] = new GPoint(i-11,0);
				}
			}
		}
		plotMultiply.setPoints(pointsMultiply);
		plotMultiply.setPointColor(p.color(255,215,0));

		//draw x[n-k]h[k] plot
		plotMultiply.beginDraw();
		plotMultiply.drawBox();
		plotMultiply.drawXAxis();
		plotMultiply.drawYAxis();
		plotMultiply.drawTopAxis();
		plotMultiply.drawRightAxis();
		plotMultiply.drawTitle();
		plotMultiply.drawLabels();
		plotMultiply.drawGridLines(GPlot.BOTH);
		plotMultiply.drawLines();
		//these points are always 0 so we can just draw them
		for(i = 0; i<10; i++){
			plotMultiply.drawPoint(new GPoint(i-21,0),p.color(255,215,0),plotMultiply.getLayer("main layer").getPointSizes()[0]);
		}
		for(i = 33; i<=42; i++){
			plotMultiply.drawPoint(new GPoint(i-21,0),p.color(255,215,0),plotMultiply.getLayer("main layer").getPointSizes()[0]);
		}

		//draw lines to points
/*		for(i = 0; i < pointsMultiply.length;i++){
			tempPoint = plotMultiply.getPoints()[i];
			plotMultiply.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(255,215,0),2);
		}*/
		plotMultiply.endDraw();

		//get points for y[n] plot
		// y[n] = Sum( h[k] * x[n-k], k, -Infinity, Infinity )
		if(selected && plotFlipShift.isOverBox()){
			tempPoint = new GPoint(xShift,0);
			for(i = 0; i < pointsMultiply.length; i++){
				tempPoint.setY(tempPoint.getY() + plotMultiply.getPoints()[i].getY());
			}

			var screenPos =	plotConvolve.getScreenPosAtValue(tempPoint.getX(),tempPoint.getY())
			if(plotConvolve.getPointAt(screenPos[0],screenPos[1]) == undefined){
				plotConvolve.addPoint(tempPoint);
				plotConvolve.updateLimits();
			}
		}
		//draw y[n] plot
		plotConvolve.beginDraw();
		plotConvolve.drawBox();
		plotConvolve.drawXAxis();
		plotConvolve.drawYAxis();
		plotConvolve.drawTopAxis();
		plotConvolve.drawRightAxis();
		plotConvolve.drawTitle();
		plotConvolve.drawLabels();
		plotConvolve.drawGridLines(GPlot.BOTH);
		plotConvolve.setPointColor(p.color(0,128,0));
		plotConvolve.drawLines();

  	//draw lines to points
/*		for(i = 0; i < plotConvolve.getPoints().length;i++){
			tempPoint = plotConvolve.getPoints()[i];
			plotConvolve.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,p.color(0,128,0),2);
		}*/
		plotConvolve.endDraw();
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
			//clear points on convolution graph
			i = 0;
			while(i < plotConvolve.getPoints().length){
				plotConvolve.removePoint(i);
			}
		}
		else if(plotHn.isOverBox()){
			plotXY = plotHn.getValueAt(p.mouseX,p.mouseY);
			xPlot = Math.round(plotXY[0]);
			index = xPlot + 11;
			plotHn.getPointsRef()[index].setY(plotXY[1]);
			selected = true;
	//	console.log(selected);
		//clear points on convolution graph
			i = 0;
			while(i < plotConvolve.getPoints().length){
				plotConvolve.removePoint(i);
			}
		}
		else if (plotFlipShift.isOverBox()){
			plotXY = plotFlipShift.getValueAt(p.mouseX,p.mouseY);
			xShift = Math.round(plotXY[0]);
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
				else if(plotFlipShift.isOverBox()){
					plotXY = plotFlipShift.getValueAt(p.mouseX,p.mouseY);
					xShift = Math.round(plotXY[0]);
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
var myp5 = new p5(CTConvolve);
