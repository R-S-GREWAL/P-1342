objects = [];
stature = "";
song = "";
function preload()
{ 
    song = loadSound("song.mp3");
}
function setup() 
{ 
    canvas = createCanvas(400,325);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,325);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
    document.getElementById("stature").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() 
{ 
     console.log("Model Loaded!"); 
     stature = true;
    
}
function gotResult(error, results) 
{ 
    if (error) 
    { 
        console.log(error); 
    } 
    console.log(results); 
    objects = results; 
}
function draw() {
    image(video, 0, 0, 400, 325);
    if (stature != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("stature").innerHTML = "Status : Object Detected";
            

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i] = "person" ) {
                document.getElementById("number").innerHTML = "Baby Found";
                console.log("Stop");
                song.stop();
            }
            else
            {
              document.getElementById("number").innerHTML = "Baby Not Found";
              console.log("Play");
              song.play();
            }
        }
        if(objects.length == 0)
        {
          document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
          console.log("play"); 
          song.play();
    }
    else {
        document.getElementById("stature").innerHTML = "Status : Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Person Not Found" + objects.length;
        song.play();
    }

}
}