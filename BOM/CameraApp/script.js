let video = document.querySelector("video");
let vidBtn = document.querySelector("button#record");
let body = document.querySelector("body")
let capBtn = document.querySelector("button#capture");
let filters = document.querySelectorAll(".filter")
let zoomin = document.querySelector(".zoom-in");
let zoomout = document.querySelector(".zoom-out")
let gallerybtn = document.querySelector("#gallery");
let constraints = { video: true, audio: false };
let mediaRecorder;
let isRecording = false;
let chunks = [];

let minzoom = 1;
let maxzoom = 3;
let currzoom = 1;

gallerybtn.addEventListener("click", function () {
  location.assign("gallery.html")
})
let filter = "";


// Filter working : 
// Whenever we click on any of the 6 filters, the below eventListener gets triggered and we update the current
// filter color to the selected one. Now the already applied filter is removed (if there is any)
// by remove() and a new filter is applied by adding a new DIV and giving it 'filter-div' class on the body 
//whose height and width are 100 vh and 100 vw which is specified in the style.css already. Now we simple add style element
// of background-color to this div and that specific color filter gets applied over the screen/camera.
for (let i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", function (e) {

    filter = e.currentTarget.style.backgroundColor;
    removefilter();
    applyfilter(filter);

  })
}



zoomin.addEventListener("click", function () {

  // video.style.transform = scale(1) => split('(') => {scale, 1)} => [1] => 1) => split(')')[0] => 1 
  let videocurrscale = video.style.transform.split("(")[1].split(")")[0];
  if (videocurrscale > maxzoom) {
    return;
  } else {
    currzoom = Number(videocurrscale) + 0.1;
    video.style.transform = `scale(${currzoom})`;
  }
});
zoomout.addEventListener("click", function () {

  if (currzoom > minzoom) {
    currzoom -= 0.1;
    video.style.transform = `scale(${currzoom})`;
  }
})


vidBtn.addEventListener("click", function () {
  let innerDiv = vidBtn.querySelector("div");

  if (isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    innerDiv.classList.remove("record-animation");
  } else {
    mediaRecorder.start();
    filter = ""
    removefilter();
    isRecording = true;
    innerDiv.classList.add("record-animation");
    // Animation is added in the inner div (circle) of the record button which scales from 1-1.2 when pressed
    // infinitely till we stop recording.

  }
});


capBtn.addEventListener("click", function () {
  let innerDiv = capBtn.querySelector("div");
  innerDiv.classList.add("capture-animation");
  setTimeout(function () {
    innerDiv.classList.remove("capture-animation");
    // Animation is added in the inner div (inner circle) of the capture button which scales from 1-1.2 when pressed.

  }, 500);
  capture();
});

navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
  video.srcObject = mediaStream;

  mediaRecorder = new MediaRecorder(mediaStream);


  // This function is called by mediaRecorder.start() and it simply takes the current frame from the mediaStream
  // or lets say video src and we store them in a variable chunks which will when recording is stopped will
  // will be combined to form a continuous frame sequence called VIDEO.
  mediaRecorder.addEventListener("dataavailable", function (e) {
    chunks.push(e.data);
  });


  // when it is called, it simply creates a blob which is the combine data gathered from chunks array which 
  // contains frames. addMedia is called to store it in the dataBase.
  mediaRecorder.addEventListener("stop", function () {
    let blob = new Blob(chunks, { type: "video/mp4" });
    addMedia("video", blob)
    // In case of video, we directy pass the blob to our function unlike in case of image where we send the
    // URL because in case of image, when we create a URL, the whole image can be fetched from that URL anywhere 
    // but in case of video URL, it simply acts as a pointer and it points to the actual video which is stored
    // in the RAM which will be gone from the RAM when we refresh/restart the app and the URL will point to NULL.
    // Therefore whole video blob is passed in case of video.

    // chunks = [];

    // let url = URL.createObjectURL(blob);

    // let a = document.createElement("a");
    // a.href = url;
    // a.download = "video.mp4";
    // a.click();
    // a.remove();
  });
});


// Working :
// First we have created a canvas and modified it according to the currScale and then current frame in video 
// is pasted upon it i.e. the actual clicked image and then filter is applied on it using canvas functions.
function capture() {
  let c = document.createElement("canvas");
  c.width = video.videoWidth;
  c.height = video.videoHeight;
  let ctx = c.getContext("2d");

  ctx.translate(c.width / 2, c.height / 2);
  ctx.scale(currzoom, currzoom);
  ctx.translate(-c.width / 2, -c.height / 2);

  ctx.drawImage(video, 0, 0);
  if (filter != "") {
    ctx.fillStyle = filter;
    ctx.fillRect(0, 0, c.width, c.height)
  }
  // let a = document.createElement("a");
  // a.download = "image.jpg";
  // a.href = c.toDataURL();

  addMedia("img", c.toDataURL())
  // In case of image, when we create a URL, the whole image can be fetched from that URL anywhere.

  // a.click();
  // a.remove();
}


function applyfilter(filterColor) {
  let filterdiv = document.createElement("div")
  filterdiv.classList.add("filter-div");
  filterdiv.style.backgroundColor = filterColor;
  body.appendChild(filterdiv)
}

function removefilter() {
  let filterdiv = document.querySelector(".filter-div")
  if (filterdiv) filterdiv.remove()
}
