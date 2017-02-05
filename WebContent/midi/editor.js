var melody = [];
var states = [];
var headers = [];
var abcText;
var otherAbc;
var levels = 0;
var container = [];
var headersContainer = "";
var score = document.getElementById('score');
var svgNotes;
// per la modifica

var this_id;
var this_id_num;
var ok_thisId;

function addState(state) {
	levels++;
	states.push(state);
}

function init() {

	abcText = document.getElementById('abc');
	otherAbc = document.getElementById("headers");
	headersContainer = otherAbc.value;
	addState(abcText.value);
	console.log("value", abcText);

}

function overWrite() {

	states.splice(levels, states.length);
	console.log("length dopo overwrite:", states.length);
}

function reset() {
	// for (i = 0; i < states.length; i++)
	// undo();

	abcText.value = states[0];
	levels = 1;
	overWrite();

	ensembleAll();
}

function undo() {

	console.log("undo prima", levels);
	console.log("lunghezza", states.length);

	if (levels > 1) {
		abcText.value = states[levels - 2];
		levels--;

	}

	console.log("undo dopo", levels);
	ensembleAll();
}

function redo() {
	console.log("redo prima", levels);
	if (levels < states.length) {
		abcText.value = states[levels];
		levels++;
	}

	console.log("redo dopo", levels);
	ensembleAll();

}

function autoQuantize() {
	// TO-DO aggiungere un controllo sulle note immesse per incrementare le
	// battute e le andate accapo
}

function renderThisAbc() {

	svgNotes = document.getElementsByClassName("note");

	console.log("melody array", melody);

	addState(abcText.value);

	console.log("push", abcText.value);
	// ABCJS.renderAbc("paper0", abcText.value);
	ensembleAll();

	for (var i = 0; i < svgNotes.length; i++)
		svgNotes[i].setAttribute("id", "nota" + i);
	
	$("rect").remove();

}

 function asd() {
	$( note[note.length-1] ).attr("fill", "#000000");
	console.log("sono la nota selezionata",note[note.length-1]);
}

function pushNewFigure(musicalFigure) {
	overWrite();
	melody.push(musicalFigure);
	abcText.value = abcText.value + musicalFigure;
	renderThisAbc();
}

function length() {
	var length = document.getElementById("lengthSelector");
	var noteLenght = length.options[length.selectedIndex].value;
	return noteLenght;
}

function pitch() {
	var pitch = document.getElementById("pitchSelector");
	var notePitch = pitch.options[pitch.selectedIndex].value;

	var octave;

	switch (notePitch) {

	case "0":
		octave = ",,,,";
		break;

	case "1":
		octave = ",,,";
		break;

	case "2":
		octave = ",,";
		break;

	case "3":
		octave = ",";
		break;
	case "4":
		octave = "";
		break;

	case "5":
		octave = "'";
		break;
	case "6":
		octave = "''";
		break;
	case "7":
		octave = "'''";
		break;
	default:
		octave = "";
		break;

	}

	console.log("octave", octave);
	return octave;
}

function writeA() {

	pushNewFigure("#A" + pitch() + length() + "#");
	console.log("test");
}
function writeB() {
	pushNewFigure("#B" + pitch() + length() + "#");
}
function writeC() {
	pushNewFigure("#C" + pitch() + length() + "#");
}
function writeD() {
	pushNewFigure("#D" + pitch() + length() + "#");
}

function writeE() {
	pushNewFigure("#E" + pitch() + length() + "#");
}
function writeF() {
	pushNewFigure("#F" + pitch() + length() + "#");
}

function writeG() {
	pushNewFigure("#G" + pitch() + length() + "#");
}

function writeZ() {
	pushNewFigure("#z" + length() + "#");
}
/*
 * var symbol = ""; var melody_index = ""; var melody_lenght = "";
 * 
 * 
 * function insertSymbolLeft(symbol) { melody = abcText.value.split("#");
 * melody.splice(melody.length-2,0,symbol); }
 */

function writeChord() {
	if (document.getElementById("chord").value == "ON") {

		// elimino i # che si trovano fra l'inizio e la fine dell'accordo
		melody = abcText.value.split("#");
		abcText.value = melody.join("");

		pushNewFigure("] #");

		document.getElementById("chord").value = "OFF";
		return;
	}

	if (document.getElementById("chord").value == "OFF") {
		pushNewFigure("# [");
		document.getElementById("chord").value = "ON";
		return;
	}

}

function insertSymbolLeft(symbol) {

	var testString = "";
	var testArray = [];
	testString = melody.join("");
	testArray = testString.split("#");

	console.log("testArray", testArray);

	melody = abcText.value.split("#");

	// console.log("melody", melody)

	melody.splice(melody.length - 2, 0, symbol);
	melody.push("#");
	abcText.value = melody.join("");
	renderThisAbc();

	// console.log("melody", melody)

}
function sharp() {
	if (levels > 1)
		insertSymbolLeft("#^");
}

function flat() {
	if (levels > 1)
		insertSymbolLeft("#_");
}

function natural() {
	if (levels > 1)
		insertSymbolLeft("#=");
}

function doubleSharp() {
	if (levels > 1)
		insertSymbolLeft("#^^");
}

function doubleFlat() {
	if (levels > 1)
		insertSymbolLeft("#__");
}

// chiavi
function writeAltoClef() {
	pushNewFigure("#[K:clef=alto]#");
}

function wirteTrebleClef() {
	pushNewFigure("#[K:clef=treble]#");
}

function wirteBassClef() {
	pushNewFigure("#[K:clef=bass]#");
}

// BARS
function writeClosingStartBar() {
	pushNewFigure("#[| #");
}

function writeClosingEndBar() {
	pushNewFigure("#|] #");
}

function writeSingleBar() {
	pushNewFigure("#| #");
}

function writeDoubleBar() {
	pushNewFigure("#|| #");
}

function writeRepeatStart() {
	pushNewFigure("#[|: #");
}

function writeRepeatEnd() {
	pushNewFigure("#:|] #");
}

function RepeatEndStart() {
	pushNewFigure("#:: #");
}

function writeTie() {
	pushNewFigure("#- #");
}

// Segni di espressione

function writeFFFF() {
	pushNewFigure("#!ffff! #");
}

function writeFFF() {
	pushNewFigure("#!fff! #");
}

function writeFF() {
	pushNewFigure("#!ff! #");
}

function writeFORTE() {
	pushNewFigure("#!f! #");
}

function writeMF() {
	pushNewFigure("#!mf! #");
}

function writeMP() {
	pushNewFigure("#!mp! #");
}

function writeP() {
	pushNewFigure("#!p! #");
}

function writePP() {
	pushNewFigure("#!pp! #");
}

function writePPP() {
	pushNewFigure("#!ppp! #");
}

function writePPPP() {
	pushNewFigure("#!pppp! #");
}

function writeSF() {
	pushNewFigure("#!sfz! #");
}

function endOfTheLine() {
	pushNewFigure("\n");
}

// informazioni aggiuntive compositore ecc ecc

function properties_apply() {
	headers = [ "T:" + document.getElementById('title').value + "\n",
			"C:" + document.getElementById('composer').value + "\n",
			"K:" + document.getElementById('keySignature').value + "\n",
			"M:" + document.getElementById('timeSignature').value + "\n",
			"L:" + document.getElementById('noteUnit').value + "\n",
			"Q:" + document.getElementById('tempo').value + "\n" ];

	headersContainer = headers.join("");
	// mergeHeaders(headersContainer);
	ensembleAll();

	/*
	 * var string = [ abcText.value ]; var strong = string.join("");
	 * 
	 * strong = strong.replace(headers[0], "T:"CIPPOLIPPO");
	 * console.log(strong);
	 */
}

function ensembleAll() {

	otherAbc.value = headersContainer + abcText.value;
	ABCJS.renderAbc("paper0", otherAbc.value);

}

function save() {
	var txt_file = new Blob([ headersContainer + "--" + abcText.value ], {
		type : 'text/plain'
	});
	var txt_name = $("#title").val();
	var downloadFile = document.createElement("a");
	downloadFile.download = txt_name;
	downloadFile.innerHTML = "Download File";
	downloadFile.href = window.URL.createObjectURL(txt_file);
	downloadFile.click();
}

function load() {
	var fileLoaded = document.getElementById('load').files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		var text = event.target.result.toString();
		var text1 = text.split("--");

		console.log("AAAAAAAA", text1[0]);
		console.log("BBBBBBBB", text1[1]);

		headersContainer = text1[0];
		abcText.value = text1[1];
		console.log("testooooo", otherAbc.value)
		ensembleAll();
	}
	reader.readAsText(fileLoaded, "UTF-8");

}
