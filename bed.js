img="";
status="";
object=[];
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',ModelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function preload(){
img=loadImage("BED AND FRAME.jpg");
}
function draw(){
image(img,0,0,480,380);

if(status != ""){
    r=random(255);
    g=random(255);
    b=random(255);

    objectDetector.detect(img,gotResults);
    for(i = 0;i < object.length;i++){

        document.getElementById("status").innerHTML="Status:Detected Objects";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are="+object.length;
        fill(r,g,b);
        percent=floor(object[i].confidence*100);
        text(object[i].label + ""+percent+"%",object[i].x+15,object[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
    
}
}
function ModelLoaded(){
console.log("Model Loaded!");
status=true;
objectDetector.detect(img,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}
function back(){
    window.location="index.html";
}