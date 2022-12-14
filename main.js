Webcam.set({
    height: 350,
    width: 300,
    image_format: 'png',
    png_quality: 900
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot(){
    
    Webcam.snap(
        function(data_uri){
            document.getElementById('result').innerHTML = '<img id = "captured_image" src="'+ data_uri +'">';
        }
    );
}

console.log("ml5 version: ", ml5.version);

//ml5.js is an external javascript library
//It helps work with different models to compare with our input
//It compares img, audio, etc. with the model to give the result
//One of the features of ml5.js is that it provides a pre-trained model which detects the images from a video or live webcam view

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/GYf2ugRZO/model.json', modelLoaded);

//ml5 is the library name and we are going into the library(using the dot) to retrieve the image classification function.
//We added model.jason at the end of the link because we just want to access the model created in the teachable machine and nothing else.
//If we don't pass this u=function, then the image classification won't start.

function modelLoaded(){
    console.log('Model Loaded!!!!!!!!!!!!');
}

function predictImage(){
img = document.getElementById('captured_image');
classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('object-result').innerHTML = results[0].label;
        document.getElementById('accuracy-result').innerHTML = results[0].confidence.toFixed(2);
    }
}