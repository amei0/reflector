// Interpreted from "Pixelator" by Andrew Sink (2020) & "Brightness Mirror" by Dan Shiffman

let video;
let videoScale;
let ready = false;

function setup() {
	pixelDensity(1);
	frameRate(2);
	createCanvas(window.innerWidth, window.innerHeight);
	video = createCapture(VIDEO, videoReady);
	video.size(width, height);
	video.hide();
	noStroke();
}

function videoReady(){
	ready = true;
	select('#status').html('Memory, with its constant degeneration, does not equal storage.')
}

function draw() {
	background(255);
	if(ready == true){
		forget();
	}
}

function forget(){
	video.loadPixels();
	loadPixels();
	videoScale = frameCount;

	for(var y = 0; y < video.height; y++){
	  	for(var x = 0; x < video.width; x++){
	  		var index = (video.width - x - 1 + (y * video.width)) * 4;
	  		var r = video.pixels[index + 0];
	      	var g = video.pixels[index + 1];
	      	var b = video.pixels[index + 2];
	  		fill(r, g, b);
	  		rect(x, y, videoScale, videoScale);
	  		x = x + videoScale - 1;
	  	}
	  	y = y + videoScale - 1;
  	}

}

