var melody = [];
var states = [];
var headers = [];
var abcText;
var levels = 0;
var container = [];
var headerContainer = "";

function init() {
	levels++;
	abcText = document.getElementById('abc');
	states.push(abcText.value);
	console.log("value", abcText);

}

function overWrite() {

	states.splice(levels, states.length);
	console.log("length dopo overwrite:", states.length);
}

function undo() {

	console.log("undo prima", levels);
	console.log("lunghezza", states.length);

	if (levels > 1) {
		abcText.value = states[levels - 2];
		levels--;

	}

	console.log("undo dopo", levels);
	ABCJS.renderAbc("paper0", abcText.value);
}

function redo() {
	console.log("redo prima", levels);
	if (levels < states.length) {
		abcText.value = states[levels];
		levels++;
	}

	console.log("redo dopo", levels);
	ABCJS.renderAbc("paper0", abcText.value);

}

function autoQuantize() {
	// TO-DO aggiungere un controllo sulle note immesse per incrementare le
	// battute e le andate accapo
}

function renderThisAbc() {
	states.push(abcText.value);
	levels++;
	console.log("push", abcText.value);
	ABCJS.renderAbc("paper0", abcText.value);
}

function pushNewFigure(musicalFigure) {
	overWrite();
	melody.push(musicalFigure);
	abcText.value = abcText.value + musicalFigure;
	renderThisAbc();
}

function writeA() {
	pushNewFigure("A#");

}
function writeB() {
	pushNewFigure("B#");
}
function writeC() {
	pushNewFigure("C#");
}
function writeD() {
	pushNewFigure("D#");
}

function writeE() {
	pushNewFigure("E#");
}
function writeF() {
	pushNewFigure("F#");
}

function writeG() {
	pushNewFigure("G#");
}
/*
 * var symbol = ""; var melody_index = ""; var melody_lenght = "";
 * 
 * 
 * function insertSymbolLeft(symbol) { melody = abcText.value.split("#");
 * melody.splice(melody.length-2,0,symbol); }
 */

function insertSymbolLeft(symbol) {

	melody = abcText.value.split("#");

	// console.log("melody", melody)

	melody.splice(melody.length - 2, 0, symbol);
	melody.push("#");
	abcText.value = melody.join("");
	renderThisAbc();

	// console.log("melody", melody)

}
function sharp() {
	insertSymbolLeft("^");
}

function flat() {
	insertSymbolLeft("_");
}

function natural() {
	insertSymbolLeft("=");
}

function doubleSharp() {
	insertSymbolLeft("^^");
}

function doubleFlat() {
	insertSymbolLeft("__");
}

// chiavi
function writeAltoClef() {
	pushNewFigure("[K:clef=alto]");
}

function wirteTrebleClef() {
	pushNewFigure("[K:clef=treble]");
}

function wirteBassClef() {
	abcText.value = abcText.value + "";
	pushNewFigure("[K:clef=bass]");
}

// BARS
function writeClosingStartBar() {
	pushNewFigure("[| #");
}

function writeClosingEndBar() {
	pushNewFigure("|] #");
}

function writeSingleBar() {
	pushNewFigure("| #");
}

function writeDoubleBar() {
	pushNewFigure("|| #");
}

function writeRepeatStart() {
	pushNewFigure("[|: #");
}

function writeRepeatEnd() {
	pushNewFigure(":|] #");
}

function RepeatEndStart() {
	pushNewFigure(":: #");
}

function writeTie() {
	pushNewFigure("-# #");
}

// Segni di espressione

function writeFFFF() {
	pushNewFigure("!ffff! #");
}

function writeFFF() {
	pushNewFigure("!fff! #");
}

function writeFF() {
	pushNewFigure("!ff! #");
}

function writeFORTE() {
	pushNewFigure("!f! #");
}

function writeMF() {
	pushNewFigure("!mf! #");
}

function writeMP() {
	pushNewFigure("!mp! #");
}

function writeP() {
	pushNewFigure("!p! #");
}

function writePP() {
	pushNewFigure("!pp! #");
}

function writePPP() {
	pushNewFigure("!ppp! #");
}

function writePPPP() {
	pushNewFigure("!pppp! #");
}

function writeSF() {
	pushNewFigure("!sfz! #");
}

function endOfTheLine() {
	pushNewFigure("\n");
}

// informazioni aggiuntive compositore ecc ecc
/*
function properties_apply() {
	headers = [ "T:" + document.getElementById('title').value + "\n",
			"C:" + document.getElementById('composer').value + "\n",
			"K:" + document.getElementById('keySignature').value + "\n",
			"M:" + document.getElementById('timeSignature').value + "\n",
			"L:" + document.getElementById('noteUnit').value + "\n",
			"Q:" + document.getElementById('tempo').value + "\n" ];
	headersContainer = headers.join("");
	mergeHeaders(headersContainer);
}

function mergeHeaders(symbol) {

	melody = abcText.value.split("#");

	// console.log("melody", melody)

	melody.splice(0, 0, headersContainer);
	melody.push("#");
	abcText.value = melody.join("");
	renderThisAbc();

	// console.log("melody", melody)

}*/
