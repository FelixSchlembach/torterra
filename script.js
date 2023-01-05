/*-- script.js --*/

var topics_dictionary = {"close_all": -1 ,"mathe": 0, "physik": 1};

if(localStorage.darkMode == null) {
    localStorage.darkMode = "lightmode";
}
//console.log(document.cookie);
checkDarkMode();
element_slideviewer_innit()

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

function element_slideviewer_innit() {
    var slideviewer_arr = document.querySelectorAll(".element_slideviewer");

    for(var i = 0; i < slideviewer_arr.length; i++){
        console.log(document.querySelectorAll(".element_slideviewer_slides")[i].children.length);
        if(document.querySelectorAll(".element_slideviewer")[i].dataset.slideviewer_data_attr == null){
            document.querySelectorAll(".element_slideviewer")[i].setAttribute("data-slideviewer_data_attr", i+";"+document.querySelectorAll(".element_slideviewer_slides")[i].children.length+";"+"0");
        }

        var slideviewer_data = document.querySelectorAll(".element_slideviewer")[i].dataset.slideviewer_data_attr.split(";");
        var slideviewerID = slideviewer_data[0];
        var totalSlides = slideviewer_data[1];
        var currentSlide = slideviewer_data[2];

        document.querySelectorAll(".element_slideviewer_slides")[i].children[currentSlide].style.display = "block";
        for (var j = 0; j < totalSlides; j++){
            document.querySelectorAll(".element_slideviewer_dots")[i].innerHTML += "<a onclick='element_slideviewer_moveSlide("+slideviewerID+", "+(j)+")'>•</a>";
        }
        document.querySelectorAll(".element_slideviewer_dots")[i].children[currentSlide].classList.add("element_slideviewer_dots_active");
        document.querySelectorAll(".element_slideviewer .element_slideviewer_arrowbutton_right")[i].innerHTML = "❯";
        document.querySelectorAll(".element_slideviewer .element_slideviewer_arrowbutton_left")[i].innerHTML = "❮";

        document.querySelectorAll(".element_slideviewer_arrowbutton_right")[i].setAttribute("onclick", "element_slideviewer_moveSlide_right("+slideviewerID+")");
        document.querySelectorAll(".element_slideviewer_arrowbutton_left")[i].setAttribute("onclick", "element_slideviewer_moveSlide_left("+slideviewerID+")");
    }
}

function element_slideviewer_moveSlide_right(slideviewerID=""){
    element_slideviewer_moveSlide(slideviewerID, parseInt(document.querySelectorAll(".element_slideviewer")[slideviewerID].dataset.slideviewer_data_attr.split(";")[2])+1);
}
function element_slideviewer_moveSlide_left(slideviewerID=""){
    element_slideviewer_moveSlide(slideviewerID, parseInt(document.querySelectorAll(".element_slideviewer")[slideviewerID].dataset.slideviewer_data_attr.split(";")[2])-1);
}

function element_slideviewer_moveSlide(source="", show_slide="") {
    var slideviewer_data = document.querySelectorAll(".element_slideviewer")[source].dataset.slideviewer_data_attr.split(";");
    var totalSlides = parseInt(slideviewer_data[1]);
    var currentSlide = parseInt(slideviewer_data[2]);
    var show_slide = parseInt(show_slide);
    var slideviewer_source = document.querySelectorAll(".element_slideviewer")[source];

    if(show_slide == totalSlides){
        show_slide = 0;
    }else if(show_slide < 0){
        show_slide = totalSlides-1;
    }

    slideviewer_source.setAttribute("data-slideviewer_data_attr", slideviewer_source.dataset.slideviewer_data_attr.split(";")[0]+";"+slideviewer_source.dataset.slideviewer_data_attr.split(";")[1]+";"+show_slide);

    document.querySelectorAll(".element_slideviewer .element_slideviewer_slides")[source].children[currentSlide].style.display = "none";
    document.querySelectorAll(".element_slideviewer .element_slideviewer_slides")[source].children[show_slide].style.display = "block";

    document.querySelectorAll(".element_slideviewer_dots")[source].children[currentSlide].classList.remove("element_slideviewer_dots_active");
    document.querySelectorAll(".element_slideviewer_dots")[source].children[show_slide].classList.add("element_slideviewer_dots_active");
}