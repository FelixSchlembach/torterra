/*-- script.js --*/

function clickPhysikSubMenu(){
    if(document.getElementById("sub_nav_bar_physik").style.display == "none"){
        document.getElementById("sub_nav_bar_mathe").style.display = "none";
        document.getElementById("sub_nav_bar_physik").style.display = "block";
    }else{
        document.getElementById("sub_nav_bar_physik").style.display = "none";
    }
}
function clickMatheSubMenu(){
    if(document.getElementById("sub_nav_bar_mathe").style.display == "none"){
        document.getElementById("sub_nav_bar_physik").style.display = "none";
        document.getElementById("sub_nav_bar_mathe").style.display = "inline";
    }else{
        document.getElementById("sub_nav_bar_mathe").style.display = "none";
    }
}
function clickRestOfPage(){
    document.getElementById("sub_nav_bar_physik").style.display = "none";
    document.getElementById("sub_nav_bar_mathe").style.display = "none";
}
  