/*-- script.js --*/

var topics_dictionary = {"close_all": -1 ,"mathe": 0, "physik": 1};
if(document.cookie == null) {
    document.cookie = "theme=lightmode; SameSite=Strict";
}
var cookies_arr = document.cookie.split(/; |=/); // regex for "; " or "="
//console.log(document.cookie);
checkDarkMode();
getTopicContent('mathe', 'topic_list_m'); 
getTopicContent('physik', 'topic_list_p');


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
    if(cookies_arr[1] == "darkmode"){
        document.body.classList.remove("body_darkmode");

        document.querySelectorAll("#content p").forEach(element => {
            element.classList.remove("content_p_darkmode");
        });
        document.cookie = "theme=lightmode; SameSite=Strict";

    }else{
        document.body.classList.add("body_darkmode");

        document.querySelectorAll("#content p").forEach(element => {
            element.classList.add("content_p_darkmode");
        });
        document.cookie = "theme=darkmode; SameSite=Strict";
    }
    // update cookies_arr
    cookies_arr = document.cookie.split(/; |=/); // regex for "; " or "="
}


// Set theme of last page visit / after refresh
function checkDarkMode() {
    if(cookies_arr[1] == "darkmode"){
        document.body.classList.add("body_darkmode");

        document.querySelectorAll("#content p").forEach(element => {
            element.classList.add("content_p_darkmode");
        });

    }else{
        document.body.classList.remove("body_darkmode");

        document.querySelectorAll("#content p").forEach(element => {
            element.classList.remove("content_p_darkmode");
        });
    }
}
