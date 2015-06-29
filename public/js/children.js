// window.onload = function () {
//   document.getElementById("parentButton").onclick = function() {
//     document.getElementById("userType").value = "Parent"
//   };
//   document.getElementById("santaButton").onclick = function() {
//     document.getElementById("userType").value = "Santa"
//   };
// };






$(document).ready(function(){
	//For Signup Page buttons to change input value
	$("#parentButton").on("click", function(){
		$("#userType").val("Parent")
	});
	$("#santaButton").on("click", function(){
		$("#userType").val("Santa")
	});



})


