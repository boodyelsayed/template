//localstorage for changing color
let mainColors = localStorage.getItem("color_option");
if(mainColors != null){
    document.documentElement.style.setProperty('--main-color', mainColors);
    
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        if(element.dataset.color === mainColors){
            element.classList.add("active");
        }
    });
}

//  Random Background Option
let backgroundOption = true;
let backgroundInterval;

// // //Check If Random Background LocalStorange isnot empty
//  let backgroundLocalItem = localStorage.getItem("background_option");

//  if(backgroundLocalItem != null){
//      if(backgroundLocalItem === 'true'){
//          backgroundOption = true;
//      }else{
//          backgroundOption = false;
//      }

//      //Remove Active class from All Span
//      allSpan = document.querySelector(".random-background span");
 
//       allSpan.forEach(element => {
//           element.classList.remove("active");
//       });
//      if(backgroundLocalItem === 'true'){
//           document.querySelector(".random-background .yes").classList.add("active");
//      }else{
//          document.querySelector(".random-background .no").classList.add("active");
//      }
 

//  }
//Setting Box
document.querySelector(".toggle-setting .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}
//Change(Switch) Colors Option
const ColorsLi = document.querySelectorAll(".colors-list li");
ColorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});

//Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");
randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {
        
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");

        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});


//Landing Page(Change Background Image )
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["image1.jpg", "image2.jpg", "image3.jpg","image4.jpeg", "image5.jpg"];

function randomizeImgs() {
    if(backgroundOption === true){
        
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
}, 9000);
    }
}
randomizeImgs();


//Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
    let skillsOffsetTop = ourSkills.OffsetTop;

    let skillsOuterHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
       
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};





//Create Popup With the Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");
        // Add class to overlay and append to body
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        //Create Popup Box and add Class 
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';

        if(img.alt !== null){
            // Create Heading and create Text for Heading
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            //Append Text to Heading and Heading to popup Box
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        //Create image and set image source
        let popoupImage = document.createElement("img");
        popoupImage.src = img.src;

        //Add image to popup Box And Append popop Box to body
        popupBox.appendChild(popoupImage);
        document.body.appendChild(popupBox);

        //Create the close span and the close Button Text
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("x");
        
        //Append Text to close Button
        closeButton.appendChild(closeButtonText);

        //Add class to close Button and Add it to popup Box
        closeButton.className ='close-button';
        popupBox.appendChild(closeButton);
    });
});
//close popup
document.addEventListener('click', function(e) {
    if(e.target.className == 'close-button'){
        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();
    }
});






//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView
            ({behavior: "smooth"});
            

            
        });
    });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);



//Handle Active State
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");

    });
    ev.target.classList.add("active");
}


//Show Bullets Local storage
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        }else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
});




//Reset Button
document.querySelector(".reset-option").onclick = function() {
    localStorage.clear();
    window.location.reload();
}




//Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}; 
//Click Any Where outside the toggle-menu 
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        if(tLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});

tLinks.onclick = function(e) {
    e.stopPropagation();
}