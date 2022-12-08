Status="";
object=[];

function preload() {
    video=createVideo("video.mp4");
}

function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: detectando objetos";
}

function start() {
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: detectando objetos";
}

function modelLoaded() {
    console.log("Modelo cargado");
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error,result) {
    if(error) {
        console.log(error);
    }
    console.log(result);
    object=result;
}

function draw() {
    image(video,0,0,380,380);
    if(Status != "") {
        objectDetector.detect(video,gotResults);
        for(var i=0; i<object.lenght;i++) {
            document.getElementById("status").innerHTML="Status: objeto detectado";
            document.getElementById("number").innerHTML="El número de objetos detectados es: "+object.lenght;
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[1].x,object[i].y,object[i].width,object[i].height);
        }
    }
}