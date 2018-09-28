//Chord Progression Javascript File
var notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
Object.freeze(notes);
var tonality = ["Major", "Minor"];
var noteSelect = document.getElementById("noteSelect");
var keySelect = document.getElementById("keySelect");

for(var i = 0; i < notes.length; i++) {
    var opt = notes[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = i;
    noteSelect.appendChild(el);
}

for(var i = 0; i < tonality.length; i++) {
    var opt = tonality[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = i;
    keySelect.appendChild(el);
}

var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function createProgression() {
	var e1 = document.getElementById("noteSelect");
	var note = e1.options[e1.selectedIndex].value;
	console.log(note);
	
	var e2 = document.getElementById("keySelect");
	var key = e2.options[e2.selectedIndex].value;
	console.log(key);
	
	var resultArea = document.getElementById("result");
	resultArea.innerHTML = generateProgression(note, key);
}

function generateProgression(nI, tI) {
	switch(tI) {
		case '0': //Major
			var third = parseInt(nI, 10) + 5;
			var fifth = parseInt(nI, 10) + 7;
			if(third > 12) {
				third = third - 12;
			}
			if(fifth > 12) {
				fifth = fifth - 12;
			}
			console.log(third);
			var chords = notes[nI] + "maj7, " + notes[third] + "maj7, " + notes[fifth] + "dom7";
			return chords;
		case '1': //Minor
			return notes[nI] + " Minor ";
		default:
			return "No";
	}
} 