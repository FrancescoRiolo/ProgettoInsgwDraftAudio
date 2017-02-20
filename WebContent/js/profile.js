$(document).ready(function()
{
	"use strict";
    var navItems = $('.admin-menu li > a');
    var navListItems = $('.admin-menu li');
    var allWells = $('.admin-content');
    var allWellsExceptFirst = $('.admin-content:not(:first)');
    
    allWellsExceptFirst.hide();
    navItems.click(function(e)
    {
        e.preventDefault();
        navListItems.removeClass('active');
        $(this).closest('li').addClass('active');
        
        allWells.hide();
        var target = $(this).attr('data-target-id');
        $('#' + target).show();
    });
});


/*
var logo = document.getElementById("logo");

var logoClicked = false;

var dashboard = document.getElementById("dashboard-container");

dashboard.style.visibility = "hidden";

logo.onclick = function(){
	"use strict";
	
if(!logoClicked){
dashboard.style.visibility = "visible";
logoClicked = true;
return;
}

	else if(logoClicked){
dashboard.style.visibility = "hidden";
logoClicked = false;
return;
}
	
	

};*/