var nodeSelector = '#PanteneColor';

$(nodeSelector).click(
  function() {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      var currentCssColor = $('.maincolor').css('background-color');

      $(this).delegate('.PanteneColor', 'click',
        function() {
          var selectedColor = $(this).find('.color').css('background-color');
          $(this).find('.color').css('background-color', currentCssColor);
          $('.maincolor').css('background-color', selectedColor);

          /* BG with alpha*/
          var selectedColorBG = selectedColor.replace(')', ', .3)').replace('rgb', 'rgba');
          //$('body').css('background-color', selectedColorBG);

          $('.selectedColor .selectedColorText').html(selectedColor);
          $(nodeSelector).undelegate();
        }
      );
    }
  }
);

var mousePressed = false;
var lastX, lastY;
var ctx;
var tooltype = 'draw';
var mousedown = false;
var colorPick = "blue";

function InitThis() {
    // $('#myCanvas').css("width","800px");

    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        // Draw(e.pageX, e.pageY, false);
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            //Draw(e.pageX , e.pageY , true);
             Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
	    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });

    $("#myCanvas").css("pointer-events", "none");
    $("#widget").css("zIndex", "100");

}

function Draw(x, y, isDown) {
    if (isDown && tooltype ==='draw') {
        ctx.beginPath();
        ctx.strokeStyle =$('.maincolor').css('background-color');;
        // ctx.strokeStyle = $('#selColor').val();
        // ctx.lineWidth = $('#selWidth').val();
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
       ctx.stroke();
    }
    // else{
    //   ctx.globalCompositeOperation = 'destination-out';
    //   ctx.lineWidth = 20;
    //
    // }

    lastX = x; lastY = y;
}

function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

//   $("#draw-button").click(function functionName() {
//     //ctx = document.getElementById('myCanvas').getContext("2d");
//     $("#widget").css("zIndex", "-100");
//     use_tool('draw');
//     $("#myCanvas").css("visibility", "visible");
//     $("#colourPicker").toggle();
//   });
//
// $("#interact-button").click(function functionName() {
//   $("#widget").css("zIndex", "100");
//   $("#myCanvas").css("visibility", "hidden");
// });

$("#er-button").click(function functionName() {
  //ctx = document.getElementById('myCanvas').getContext("2d");
  $("#draw-button").css("background-color", "#00bcd4");
  $("#er-button").css("background-color", "red");
  $("#interact-button").css("background-color", "#00bcd4");
  $("#widget").css("zIndex", "-100");
  $("#myCanvas").css("pointer-events", "initial");
  $("#myCanvas").css("cursor", "crosshair");

  use_tool('erase');

  //$("#myCanvas").css("visibility", "visible");

});
$("#draw-button").click(function functionName() {
  //ctx = document.getElementById('myCanvas').getContext("2d");

  $("#widget").css("zIndex", "-100");
  $("#myCanvas").css("pointer-events", "initial");
  $("#myCanvas").css("cursor", "crosshair");


  use_tool('draw');

  //$("#colourPicker").toggle();
  $("#draw-button").css("background-color", "red");
  $("#er-button").css("background-color", "#00bcd4");
  $("#interact-button").css("background-color", "#00bcd4");

});

$("#interact-button").click(function functionName() {
  $("#myCanvas").css("pointer-events", "none");
  $("iframe").css("cursor", "grab");
  $("#widget").css("zIndex", "100");
  $(".iframe-container").css("cursor", "grab");
  $("#draw-button").css("background-color", "#00bcd4");
  $("#er-button").css("background-color", "#00bcd4");
  $("#interact-button").css("background-color", "red");
//$("#myCanvas").css("visibility", "hidden");
});





var canvas = document.getElementById("myCanvas");

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);





var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw';

//Mousedown
$(canvas).on('mousedown', function(e) {
    last_mousex = mousex = parseInt(e.clientX-canvasx);
	last_mousey = mousey = parseInt(e.clientY-canvasy);
    mousedown = true;
});

//Mouseup
$(canvas).on('mouseup', function(e) {
    mousedown = false;
});

//Mousemove
$(canvas).on('mousemove', function(e) {
    mousex = parseInt(e.clientX-canvasx);
    mousey = parseInt(e.clientY-canvasy);
    if(mousedown) {
        ctx.beginPath();
        if(tooltype=='draw') {
            ctx.globalCompositeOperation = 'source-over';
            //ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
        } else {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        }
        ctx.moveTo(last_mousex,last_mousey);
        ctx.lineTo(mousex,mousey);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
    }
    last_mousex = mousex;
    last_mousey = mousey;
    //Output
    $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);
});

//Use draw|erase
use_tool = function(tool) {
  if(tool == "erase")
  {
    $("#myCanvas").css("cursor", "crosshair");

    console.log("clicked erase");
  }
    tooltype = tool; //update
}


jQuery(document).ready(function($) {

	/* Some simple jQuery to switch the classes */
	$('.colourOption').on('click', function() {
		/* This line removes the selectedColour class from every element in the colouPicker, meaning that only one is selected at a time!

		 It basically saves me having to make them a check box, I should proabbly be told of for that...*/
		$('#colourPicker *').removeClass('selectedColour');
		/* This switches on the selectedColour class for that div. */
		$(this).toggleClass('selectedColour');

    /*Changing the body colours, its really ugly repeative code, I could probably improve it! */
		if ($(this).attr('id') == 'colourOne') {
			colorPick = "blue";
      use_tool("draw");
		} else if ($(this).attr('id') == 'colourTwo') {
			colorPick = "purple";
      use_tool("draw");
		} else if ($(this).attr('id') == 'colourThree') {
			colorPick = "green";
		} else if ($(this).attr('id') == 'colourFour') {
			colorPick = "red";
		} else if ($(this).attr('id') == 'colourFive') {
			colorPick = "orange";
		} else if ($(this).attr('id') == 'colourSix') {
			colorPick = "yellow";
		}

	});

});



/////////////////new code separatorrr

var element_pos = 0; // POSITION OF THE NEWLY CREATED ELEMENTS.
var iCnt = 0;


$(function() {
  $('#divContainer').draggable();
});
$(function() {
  $("#divResize").draggable().resizable();
});

// CREATE MORE DIV, WITH 'ABSOLUTE' POSITIONING.
$('#textbox-button').click(function() {


  var dynamic_div = $(document.createElement('div')).css({
    border: '1px dashed',
    position: 'absolute',
    left: '200px',
    top: '200px',
    width: '120',
    height: '120',
    padding: '3',
    margin: '0'
  });

  var handle = $(document.createElement('h1')).css({
    //border: '1px dashed',
    position: 'absolute',
    left: '-22px',
    top: '-45px',
    width: '30',
    height: '30',
  });

  var del = $(document.createElement('button')).css({
    //border: '1px dashed',
    position: 'relative',
    left: '30px',
    top: '-28px',
    width: '33',
    height: '33',
    background: "url('trash-light.svg') no-repeat 3px center red",
  });


  var text = $(document.createElement('h3')).css({

  });

  var icon = $(document.createElement('a'));
  var icon1 = $(document.createElement('a'));


  element_pos = element_pos + $('#divContainer').width() + 20;

  $(dynamic_div).appendTo('body').resizable().draggable();
  $(handle).appendTo(dynamic_div);
  $(del).appendTo(dynamic_div);
  $(del).click(function functionName() {
    $(this).parent('div').remove();
    console.log(iCnt);
  });

  //$(handle).appendTo(dynamic_div);
  $(text).appendTo(dynamic_div);

  $(icon).appendTo(handle);
  $(icon1).appendTo(del);

  $(dynamic_div).addClass('textbox');
  $(dynamic_div).attr('id', ("val" + iCnt));
  $("#val" + iCnt + "> h3").html("Click to Type");
  $("#val" + iCnt + "> h3").attr('contenteditable', 'true');

  $(".textbox > h1 > a").addClass("fas fa-arrows-alt");
  //$(".textbox > h1 > a").addClass("fas fa-arrows-alt");

  $(".textbox > h3").click(function functionName() {
      console.log("click");
      if ($("#val" + (iCnt - 1) + "> h3").html() == "Click to Type") {
        console.log("condition met");
        $("#val" + (iCnt - 1) + "> h3").html(" ");

      } else {
        console.log("the vaile of iCnt is: " + iCnt);
        console.log($("#val0 > h3").html());
      }
    }
  );
  handle = $(".textbox").draggable("option", "handle");

  // Setter


  // Setter
  $(".textbox").draggable("option", "handle", "h1");



  iCnt = iCnt + 1;

});
