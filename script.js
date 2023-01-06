/*-- script.js --*/

var topics_dictionary = {"close_all": -1 ,"mathe": 0, "physik": 1};

if(localStorage.darkMode == null) {
    localStorage.darkMode = "lightmode";
}
//console.log(document.cookie);
checkDarkMode();

function clickDropDownButton(source=""){
    for(var i=0; i<2; i++){
        if(topics_dictionary[source] != i || topics_dictionary[source] == -1 || document.getElementsByClassName("dropdown")[topics_dictionary[source]].style.display == "block"){
            document.getElementsByClassName("dropdown")[i].style.display = "none";
            document.getElementsByClassName("topic_button")[i].style.backgroundColor = "transparent";
            
        }else{
            document.getElementsByClassName("dropdown")[i].style.display = "block";
            document.getElementsByClassName("topic_button")[i].style.backgroundColor = "#25252B";
        }
    }
}
function clickContentDropDownButton(source=""){
    if(document.getElementsByClassName("dropdown")[topics_dictionary[source]+2].style.display == "block"){
        document.getElementsByClassName("dropdown")[topics_dictionary[source]+2].style.display = "none";
        document.getElementsByClassName("topic_list_button")[topics_dictionary[source]].style.borderBottomLeftRadius = "1rem";
        document.getElementsByClassName("topic_list_button")[topics_dictionary[source]].style.borderBottomRightRadius = "1rem";
        
    }else{
        document.getElementsByClassName("dropdown")[topics_dictionary[source]+2].style.display = "block";
        document.getElementsByClassName("topic_list_button")[topics_dictionary[source]].style.borderBottomLeftRadius = "0rem";
        document.getElementsByClassName("topic_list_button")[topics_dictionary[source]].style.borderBottomRightRadius = "0rem";
    }
}


function getTopicContent(source="", destination=""){
    document.getElementById(destination).innerHTML = document.getElementsByClassName("dropdown_content")[topics_dictionary[source.toLowerCase()]].innerHTML;
}

function darkMode(){
    if(localStorage.darkMode == "darkmode"){
        document.body.classList.remove("body_darkmode");

        document.querySelectorAll("p").forEach(element => {
            element.classList.remove("background_darkmode");
            element.classList.remove("shadow_darkmode");
        });
        document.querySelectorAll(".element_slideviewer").forEach(element => {
            element.classList.remove("shadow_darkmode");
        });
        localStorage.darkMode = "lightmode";

    }else{
        document.body.classList.add("body_darkmode");

        document.querySelectorAll("p").forEach(element => {
            element.classList.add("background_darkmode");
            element.classList.add("shadow_darkmode");
        });
        document.querySelectorAll(".element_slideviewer").forEach(element => {
            element.classList.add("shadow_darkmode");
        });
        localStorage.darkMode = "darkmode";
    }
}


// Set theme of last page visit / after refresh
function checkDarkMode() {
    if(localStorage.darkMode == "darkmode"){
        document.body.classList.add("body_darkmode");

        document.querySelectorAll("p").forEach(element => {
            element.classList.add("background_darkmode");
            element.classList.add("shadow_darkmode");
        });
        document.querySelectorAll(".element_slideviewer").forEach(element => {
            element.classList.add("shadow_darkmode");
        });

    }else{
        document.body.classList.remove("body_darkmode");

        document.querySelectorAll("p").forEach(element => {
            element.classList.remove("background_darkmode");
            element.classList.remove("shadow_darkmode");
        });
        document.querySelectorAll(".element_slideviewer").forEach(element => {
            element.classList.remove("shadow_darkmode");
        });
    }
}


/*
    Sender is saved in the button onclick-function, and since the buttons are generated programmatically onclick-function-parameter is set dynamically.
    This is true for the arrow-buttons, as well as for the dot-buttons. Both carry their slideviewerID as a parameter.
    Each slide viewer element carries a data tag: "data-slideviewer_data" which saves the total slides and
    currently visible slide as a string e.g.: 4;2 => 4 Slides, 3rd Slide selected (0 = first slide, 1 = second slide, [...], totalSlides-1 = last slide)

    The showSlide function recieves the ID sent with the function-call and gets the data from the respective slideviewer element's data tag.
    The arrow-buttons calculate the slide number to be shown (currentSlide +- 1) and call the showSlide function with the caller ID and resulting value  
*/
/* Populate slideviewer-elements with controls */
element_slideviewer_innit();
function element_slideviewer_innit() {

    for(var i = 0; i < document.querySelectorAll(".element_slideviewer").length; i++){  // Run through all slideviewers on page

        document.querySelectorAll(".element_slideviewer")[i].setAttribute("data-slideviewer_data", document.querySelectorAll(".element_slideviewer")[i].children.length+";"+"0");    // totalSlides;currentSlide
        var totalSlides = document.querySelectorAll(".element_slideviewer")[i].children.length; // Number of child elements = number of slides
        
        document.querySelectorAll(".element_slideviewer")[i].children[0].style.display = "block";   // Show first slide
        
        document.querySelectorAll(".element_slideviewer")[i].innerHTML += "<div class='element_slideviewer_dots' style='display: block !important;'></div>";    // Add dots-container
        for (var j = 0; j < totalSlides; j++){
            document.querySelectorAll(".element_slideviewer_dots")[i].innerHTML += "<a onclick='element_slideviewer_showSlide("+i+", "+(j)+")'>•</a>";  // Add as many dots as slides
        }
        document.querySelectorAll(".element_slideviewer_dots")[i].children[0].classList.add("element_slideviewer_dots_active"); // Color first dot-button

        document.querySelectorAll(".element_slideviewer")[i].innerHTML += "<button onclick='element_slideviewer_moveSlide_left("+i+")' class='element_slideviewer_arrowbutton_left' style='display: block !important;'>❮</button>";  // Add button left
        document.querySelectorAll(".element_slideviewer")[i].innerHTML += "<button onclick='element_slideviewer_moveSlide_right("+i+")' class='element_slideviewer_arrowbutton_right' style='display: block !important;'>❯</button>"; // Add button right
    }
}

function element_slideviewer_moveSlide_right(slideviewerID=""){ // Arrow right onclick-function; currentSlide + 1
    element_slideviewer_showSlide(slideviewerID, parseInt(document.querySelectorAll(".element_slideviewer")[slideviewerID].dataset.slideviewer_data.split(";")[1])+1);
}
function element_slideviewer_moveSlide_left(slideviewerID=""){ // Arrow left onclick-function; currentSlide - 1
    element_slideviewer_showSlide(slideviewerID, parseInt(document.querySelectorAll(".element_slideviewer")[slideviewerID].dataset.slideviewer_data.split(";")[1])-1);
}
/* Logic for showing slides */
function element_slideviewer_showSlide(source="", show_slide="") {
    var slideviewer_data = document.querySelectorAll(".element_slideviewer")[source].dataset.slideviewer_data.split(";");  // Get total slides and current slide from the slideviewer e.g.: "4;2" -> ["4", "2"]
    var totalSlides = parseInt(slideviewer_data[0]);
    var currentSlide = parseInt(slideviewer_data[1]);
    var show_slide = parseInt(show_slide);
    var slideviewer_source = document.querySelectorAll(".element_slideviewer")[source];

    if(show_slide == totalSlides){  // Case if slide moves over last slide
        show_slide = 0;
    }else if(show_slide < 0){       // Case if slide moves under first slide
        show_slide = totalSlides-1;
    }

    slideviewer_source.setAttribute("data-slideviewer_data", slideviewer_source.dataset.slideviewer_data.split(";")[0]+";"+show_slide); // Update data tag with new current slide

    document.querySelectorAll(".element_slideviewer")[source].children[currentSlide].style.display = "none";    // Hide old current slide
    document.querySelectorAll(".element_slideviewer")[source].children[show_slide].style.display = "block";     // Show new current slide

    document.querySelectorAll(".element_slideviewer_dots")[source].children[currentSlide].classList.remove("element_slideviewer_dots_active");  // Set old dot to inactive (remove the active class)
    document.querySelectorAll(".element_slideviewer_dots")[source].children[show_slide].classList.add("element_slideviewer_dots_active");       // Set new dot to active   (add the active class)
}