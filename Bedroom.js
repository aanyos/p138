
img = "";
mystatus = "";

objects = [];

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("bstatus").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    mystatus = true;
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}



function preload()
{
    img = loadImage("bedroom.jpg");
}

function draw()
{
    image(img, 0, 0, 640, 420);
    
    if(mystatus != "")
    {
        for(var i = 0; i <objects.length; i++) {
            document.getElementById("bstatus").innerHTML = "Status : Object Detected";

            fill(255, 0, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}