
var DTConvolve = function(p){
		var plotXn,plotHn,plotXnmkHk = undefined;
		var pointsXn,pointsHn,pointsXnmkHk = undefined;
		var selected = false;
		var point = undefined;
		var tempPoint = undefined;
		var x = undefined;
		var ctx = document.getElementById("myCanvas");
	//initial set up
 	p.setup =function() {
		var i;
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
	//	plotXn.setLineColor(p.color(200,200,255));

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
		plotXnmkHk.setXLim(-22,22);
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
		plotXn.drawPoints();
		//draw lines to points
		for(i = 0; i<pointsXn.length;i++){
			tempPoint = plotXn.getPoints()[i];
			plotXn.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,"red",2);
		}
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
		plotHn.drawPoints();
		//draw lines to points
		for(i = 0; i<pointsHn.length;i++){
			tempPoint = plotHn.getPoints()[i];
			plotHn.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,"blue",2);
		}
		plotHn.endDraw();

		//get points for x[n-k] and h[k]
		
		for(i  = 0; i<pointsXn.length+pointsHn.length;i++){
			if(i < pointsXn.length){
				tempPoint = plotXn.getPoints()[i];
				pointsXnmkHk[i] = new GPoint(-tempPoint.getX(),tempPoint.getY());
			}
			else {
				tempPoint = plotHn.getPoints()[i-pointsXn.length];
				pointsXnmkHk[i] = new GPoint(tempPoint.getX(),tempPoint.getY());
			}
		}
		plotXnmkHk.setPoints(pointsXnmkHk);
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
			plotXnmkHk.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,"red",2);
		}
		plotXnmkHk.endDraw();

	};
	p.mouseDownEvent = function(event){
	//	console.log("mouse downed");
		e = event || window.event;
		if(plotXn.isOverBox()){
			point = plotXn.getPointAt(p.mouseX,p.mouseY);
			
		}
		else if(plotHn.isOverBox()){
			point = plotHn.getPointAt(p.mouseX,p.mouseY);
		}
		else {
			point = undefined;
		}

		if(point){
				x = p.mouseX;
				y = p.mouseY;
				selected = true;
			}
	}
	p.mouseMovedEvent = function(event){
		//console.log("mouse moved");
		if(selected){
			//console.log(point.getX(),point.getY());
			if(plotXn.isOverBox()){
			//	console.log("moving over xbox");
				plotXn.removePointAt(x,y);
				y = p.mouseY;
				plotXn.addPointAt(x,y);
			}
			else if(plotHn.isOverBox()){
			//	console.log("moving over hbox");
				plotHn.removePointAt(x,y);
				y = p.mouseY;
				plotHn.addPointAt(x,y);
			}
		}
	}
	p.mouseUpEvent = function(event){
	//	console.log("mouse upped");
		if(selected){
			if(plotXn.isOverBox()){
				plotXn.removePointAt(x,y);
				plotXn.addPointAt(x,p.mouseY);
			}
			else if(plotHn.isOverBox()){
				plotHn.removePointAt(x,y);
				plotHn.addPointAt(x,p.mouseY);
			}
			selected = false;
		}	
	}
};

var myp5 = new p5(DTConvolve);