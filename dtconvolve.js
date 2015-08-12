
var DTConvolve = function(p){
		var plotXn = undefined;
		var pointsXn = undefined;
		var selected = false;
		var point = undefined;
		var lastPoint = undefined;
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
		plotXn.setOuterDim(0.6 * p.width, 0.4 * p.width);
		plotXn.setXLim(-11,11);
		plotXn.setYLim(-5,5);
		plotXn.getXAxis().getAxisLabel().setText("Time(n)");
		plotXn.getYAxis().getAxisLabel().setText("x[n]");
		plotXn.getTitle().setText("x[n]");
		plotXn.setPoints(pointsXn);
	//	plotXn.setLineColor(p.color(200,200,255));

		//setup the mouse actions
		window.addEventListener("mousedown",this.mouseDownEvent.bind(this));
		window.addEventListener("mousemove",this.mouseMovedEvent.bind(this));
		window.addEventListener("mouseup",this.mouseUpEvent.bind(this));
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
		plotXn.drawGridLines(GPlot.BOTH);
		plotXn.drawPoints();
		//draw lines to points
		for(i = 0; i<pointsXn.length;i++){
			var tempPoint = plotXn.getPoints()[i];
			plotXn.drawLine(new GPoint(tempPoint.getX(),0),tempPoint,0,2);
		}
		plotXn.endDraw();

		//actions for x[n] plot
		//plotXn.activatePointLabels();
	};
	p.mouseDownEvent = function(event){
	//	console.log("mouse downed");
		e = event || window.event;
		point = plotXn.getPointAt(p.mouseX,p.mouseY);
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
			plotXn.removePointAt(x,y);
			y = p.mouseY;
			plotXn.addPointAt(x,y);
			//plotXn.beginDraw();
			//plotXn.endDraw();
		}
	}
	p.mouseUpEvent = function(event){
	//	console.log("mouse upped");
		if(selected){
			plotXn.removePointAt(x,y);
			plotXn.addPointAt(x,p.mouseY);
			selected = false;
		}	
	}
};

var myp5 = new p5(DTConvolve);