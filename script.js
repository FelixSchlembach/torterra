/*-- script.js --*/

var topics_dictionary = {"close_all": -1 ,"mathe": 0, "physik": 1};


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
        
    }else{
        document.getElementsByClassName("dropdown")[topics_dictionary[source]+2].style.display = "block";
    }
}


function getTopicContent(source="", destination=""){
    document.getElementById(destination).innerHTML = document.getElementsByClassName("dropdown_content")[topics_dictionary[source.toLowerCase()]].innerHTML;
}
