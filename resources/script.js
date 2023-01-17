/*-- script.js --*/

if(localStorage.darkMode == null) {
    localStorage.darkMode = "lightmode";
}
//console.log(document.cookie);
checkDarkMode();

function clickDropDownButton(source=""){
    var topics_dictionary = {"close_all": -1 ,"mathe": 0, "physik": 1};
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

function darkMode(){
    var root = document.querySelector(":root");
    if(localStorage.darkMode == "darkmode"){
        root.style.setProperty("--current_background", "var(--lightmode_background)");
        root.style.setProperty("--current_color", "var(--lightmode_color)");
        root.style.setProperty("--current_boxshadow", "var(--lightmode_boxshadow)");
        root.style.setProperty("--current_p_background", "var(--lightmode_p_background)");
        localStorage.darkMode = "lightmode";

    }else{
        root.style.setProperty("--current_background", "var(--darkmode_background)");
        root.style.setProperty("--current_color", "var(--darkmode_color)");
        root.style.setProperty("--current_boxshadow", "var(--darkmode_boxshadow)");
        root.style.setProperty("--current_p_background", "var(--darkmode_p_background)");
        localStorage.darkMode = "darkmode";
    }
}


// Set theme of last page visit / after refresh
function checkDarkMode() {
    var root = document.querySelector(":root");
    if(localStorage.darkMode == "darkmode"){
        root.style.setProperty("--current_background", "var(--darkmode_background)");
        root.style.setProperty("--current_color", "var(--darkmode_color)");
        root.style.setProperty("--current_boxshadow", "var(--darkmode_boxshadow)");
        root.style.setProperty("--current_p_background", "var(--darkmode_p_background)");

    }else{
        root.style.setProperty("--current_background", "var(--lightmode_background)");
        root.style.setProperty("--current_color", "var(--lightmode_color)");
        root.style.setProperty("--current_boxshadow", "var(--lightmode_boxshadow)");
        root.style.setProperty("--current_p_background", "var(--lightmode_p_background)");
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

/* Exercises */
function element_exam_showResult(examIndex = 0){
    var doReturn = [];
    var doNotReturn = [];
    for(var i = 0; i < document.querySelectorAll(".element_exam")[examIndex].children.length; i++){
        if(!document.querySelectorAll(".element_exam")[examIndex].children[i].checked && document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("type") == "radio"){
            doReturn.push(document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("name"));
            document.getElementsByName(document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("name"))[0].style.border = "orange 2px solid";
        }
        if(document.querySelectorAll(".element_exam")[examIndex].children[i].checked && document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("type") == "radio"){
            doNotReturn.push(document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("name"));
        }
    }
    for(var i = 0; i<doNotReturn.length; i++){
        console.log(doNotReturn)
        document.getElementsByName(doNotReturn[i])[0].style.border = "inherit";
    }
    for(var i = 0; i < doReturn.length; i++){
        if(!doNotReturn.includes(doReturn[i])){
            return;
        }
    }
    for(var i = 0; i < document.querySelectorAll(".element_exam")[examIndex].children.length; i++){ // Remove prevoius color
        
        if(document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("type") == "radio"){
            document.querySelectorAll(".element_exam")[examIndex].children[i+1].style.color = "inherit"
        }
    }

    for(var i = 0; i < document.querySelectorAll(".element_exam")[examIndex].children.length; i++){ // Add color
        console.warn(document.querySelectorAll(".element_exam")[examIndex].children[i].dataset.isAwnser)
        if(document.querySelectorAll(".element_exam")[examIndex].children[i].checked && document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("type") == "radio" && document.querySelectorAll(".element_exam")[examIndex].children[i].dataset.isawnser == 1){
            document.querySelectorAll(".element_exam")[examIndex].children[i+1].innerHTML += "<span>✔️<span>";
            console.log("x")

        }else if(document.querySelectorAll(".element_exam")[examIndex].children[i].checked && document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("type") == "radio" && document.querySelectorAll(".element_exam")[examIndex].children[i].dataset.isawnser == 0){
            document.querySelectorAll(".element_exam")[examIndex].children[i+1].innerHTML += "<a href='#"+ document.querySelectorAll(".element_exam")[examIndex].children[i].getAttribute("name") +"' style='text-decoration:none'>❌ ⓘ<a>";
        }
    }
    document.querySelectorAll(".element_exam_submit")[examIndex].style.backgroundColor = "grey";
    document.querySelectorAll(".element_exam_submit")[examIndex].style.border = "grey";
    document.querySelectorAll(".element_exam_submit")[examIndex].setAttribute("onclick", "");
}