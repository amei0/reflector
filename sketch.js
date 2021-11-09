let video;
let poseNet;
let poses = [];
let user = [];

$.getJSON('https://ipapi.co/json/', function(data) {
  user.push(data.ip)
})

function setup() {
  createCanvas(2240, 1260);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
  window.scroll({top:600,left:900})
  
  // 
}

function userCount(){
    var users = int(random(1,60));  
    select("#count").html(users)
}

function modelReady() {
  select('#status').html('Move your body');
  select('#forget').style('opacity', '100');
  select('#remember').style('opacity', '100');
  setInterval(userCount, 1000);
  select('#user_count').style('opacity', '100');
  
  
}

function draw(){
  fill(255, 0, 0);
  // var users = int(random(1,60));
  
  


  // background(255);
  // image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    let rightWristY = pose.rightWrist.y
    let rightWristX = pose.rightWrist.x
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      console.log(keypoint)
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        noStroke();
        text(user[0], keypoint.position.x, keypoint.position.y)
        
        if (rightWristY < 600){
          window.scroll({top:0,left:900,behavior:'smooth'})
        }else if (rightWristY > 600){
          window.scroll({top:600,left:900,behavior:'smooth'})
        }
        if (rightWristX < 600){
          window.scroll({top:0,left:0,behavior:'smooth'})
        }
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      text(user[0], partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
