$.getJSON('https://ipapi.co/json/', function(data) {
  user.push(data.ip);
})

let capture;
let poseNet;
let poses = [];
let user = [];
let ready = false;
let open = false;
let xDifference;
let yDifference;

function setup() {
  createCanvas((window.innerWidth * 1.5), (window.innerHeight * 1.5));
  capture = createCapture(VIDEO);
  capture.size(width, height);
  poseNet = ml5.poseNet(capture, "single", modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  capture.hide();
  xDifference = width - window.innerWidth;
  yDifference = height - window.innerHeight;
  window.scroll({top:yDifference/2,left:xDifference/2, behavior:'instant'});
  setInterval(userCount, 1600);
}

function userCount(){
    var users = int(random(1,60));  
    select("#count").html(users);
}

function modelReady() {
  ready = true;
  select('#status').html('Use your right hand to navigate-- try to reach yourself');
  select('#user_count').style('opacity', '100');
}

function draw(){
  fill(255, 0, 0);
  textSize(18);
  image(capture, width - (width/5), height/4, 400, 225);
  if(ready == true){
		watch();
	}
}

function watch() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;    
    let rightWristX = pose.rightWrist.x;
    let rightWristY = pose.rightWrist.y;

    if (pose.rightWrist.confidence > 0.3){
      text(user[0], rightWristX, rightWristY);
      console.log(rightWristX, rightWristY)

      if (rightWristY < (height/2) && rightWristX < (width/2)){
        window.scroll({top:0,left:0,behavior:'smooth'});
      }
      if (rightWristY < (height/2) && rightWristX > (width/2)){
        window.scroll({top:0,left:xDifference,behavior:'smooth'});
      }
      if (rightWristY > (height/2) && rightWristX < (width/2)){
        window.scroll({top:yDifference,left:0,behavior:'smooth'});
      }
      if (rightWristY > (height/2) && rightWristX > (width/2)){
        window.scroll({top:yDifference/2,left:xDifference/2,behavior:'smooth'});
      }

      if(rightWristX > (width - (width/4)) && rightWristY < (height/3)){
        if(open !== true){
          openWindow();
        }
      }
    }
  }
}

function openWindow(){
  open = true;
  window.open("forget/index.html");
}
