function preload(){
  
}

prev_result = " ";


function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(600,320);

  video = createCapture(VIDEO);
  video.hide();

  classifier = ml5.imageClassifier("MobileNet", model_loaded);
}

function draw(){

  image(video, 0, 0, 300, 300);
  classifier.classify(canvas,got_results);

}


function model_loaded(){
  console.log("Model is Loaded");

}

function got_results(error, results){

  if (error){
    console.error(error);
  }
  
  else{
    if(results[0].confidence > 0.5 && prev_result != results[0].label)
    {
      console.log(results);
      prev_result = results[0].label;

      document.getElementById("result_object").innerHTML = results[0].label;
      document.getElementById("accuracy_object").innerHTML =  (results[0].confidence * 100).toFixed(2) + "%";

      var synth = window.speechSynthesis;
      speak_data = results[0].label;
      utter_data = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utter_data);


    }
    
  }
  
}