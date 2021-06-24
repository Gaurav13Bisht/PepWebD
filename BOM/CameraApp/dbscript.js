let dbAccess;
let request = indexedDB.open("Camera", 1);
let container = document.querySelector(".container")


request.addEventListener("success", function () {
    dbAccess = request.result;
});

// Whenever a database is created, firstly this upgradeneeded event will be triggered and then the success one.
// Therefore we have to take request.result in upgradeneeded since dbAccess wont have any value at this point
// because of the above mentioned workflow. 
request.addEventListener("upgradeneeded", function () {
    let db = request.result;
    db.createObjectStore("gallery", { keyPath: "mId" });
    // We'll be creating objects & saving them into objectStore.

});

request.addEventListener("error", function () {
    alert("some error occured");
});

function addMedia(type, media) {
    let tx = dbAccess.transaction("gallery", "readwrite");
    let galleryObjectStore = tx.objectStore("gallery");
    let data = {
        mId: Date.now(),   // gives Unique no. always which will be used for deleting specific object later.
        type,
        media,
    };
    galleryObjectStore.add(data);
}


// Working : 
// We simply takes all the stored images and video from indexedDB and puts them into a card having download 
// and delete button along with the image/video itself.
function viewMedia() {
    let tx = dbAccess.transaction("gallery", "readonly");
    let galleryObjectStore = tx.objectStore("gallery");
    let req = galleryObjectStore.openCursor();
    req.addEventListener("success", function () {
        let cursor = req.result;
        // Starts with pointing DB cursor to the first object in our DB.

        if (cursor) {
            let div = document.createElement("div");
            div.classList.add("media-card");
            div.innerHTML = `<div class = "media-container">
       </div>
       <div class = "action-container">
       <button class = "media-download">Download</button>
       <button class = "media-delete" data-id = "${cursor.value.mId}">Delete</button>
       </div>`;

            // We create a div media-card for this and first task we do is to create the delete button 
            // and added a eventListener to it which simply removes the whole div (media-card) from the html and 
            // delete() is called to remove from database as well.
            let downloadbtn = div.querySelector(".media-download");
            let deletebtn = div.querySelector(".media-delete");
            deletebtn.addEventListener("click", function (e) {
                let mId = e.currentTarget.getAttribute("data-id");
                e.currentTarget.parentElement.parentElement.remove();

                deleteMediaFromDB(mId);
            })


            //Now we simply go into the downloading and showcasing the image/video section and add an 
            // image/video element into our inner div (media-container) having src fetched from the URL 
            // stored in our DB.
            // Now a eventListener is added on download button which creates and anchor tag with href of 
            // the image/video fetched from the DB and after that we ADD the div (media-card) into the 
            // container.
            if (cursor.value.type == "img") {
                let img = document.createElement("img")
                img.classList.add("media-gallery");
                img.src = cursor.value.media;
                let mediaContainer = div.querySelector(".media-container");
                mediaContainer.appendChild(img)

                downloadbtn.addEventListener("click", function (e) {
                    let a = document.createElement("a")
                    a.download = "image.jpg";
                    a.href = e.currentTarget.parentElement.parentElement.querySelector(".media-container").children[0].src;
                    a.click();
                    a.remove();

                })
            } else {
                let video = document.createElement("video")
                video.classList.add("media-gallery");
                video.src = window.URL.createObjectURL(cursor.value.media);

                // Additional eventListener to make our video element more interactive in our gallery.
                video.addEventListener("mouseenter", function () {
                    video.currentTime = 0;
                    video.play();
                })
                video.addEventListener("mouseleave", function () {
                    video.pause();
                })
                video.controls = true;
                video.loop = true;
                video.muted = true;

                let mediaContainer = div.querySelector(".media-container");
                mediaContainer.appendChild(video)

                downloadbtn.addEventListener("click", function (e) {
                    let a = document.createElement("a")
                    a.download = "video.mp4";
                    a.href = e.currentTarget.parentElement.parentElement.querySelector(".media-container").children[0].src;
                    a.click();
                    a.remove();
                });
            }

            container.appendChild(div);
            cursor.continue();
            // Moves our DB cursor to the next object in our DB.
        }
    })
}
function deleteMediaFromDB(mId) {
    let tx = dbAccess.transaction("gallery", "readwrite");
    let galleryObjectStore = tx.objectStore("gallery");
    galleryObjectStore.delete(Number(mId))

}