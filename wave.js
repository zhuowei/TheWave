/**
 * A jumbled mess of code. Feel free to send this to the Daily WTF.
 */

var nextWaveTime;
var nextCenter;
var curWaveTime;
var curCenter;
var map;
var nextMarker;
var curMarker;
var WAVE_INTERVAL = 1*60*1000; //1 minute
var WAVE_DISTANCE;
var waveTimer;


function calcWaveTimes(){
	calcCurrentWaveTime();
	calcNextWaveTime();
}

function calcCurrentWaveTime(){
	var curTime = new Date();
	curTime.setUTCMilliseconds(0);
	curTime.setUTCSeconds(0);
	curTime.setUTCMinutes(0);
	curWaveTime = curTime;
}

function calcNextWaveTime(){
	var curTime = new Date();
	curTime.setUTCMilliseconds(0);
	curTime.setUTCSeconds(0);
	curTime.setUTCMinutes(0);
	curTime.setUTCHours(curTime.getUTCHours() + 1);
	nextWaveTime = curTime;
}
function wave_init(e){
	calcWaveTimes();
	calcWaveCenters();
	init_gui();
	waveTimer = setInterval(waveTimerHandler, WAVE_INTERVAL);
}

function init_gui(){
	nextWaveDisplay = document.getElementById("next-wave-display");
	initGoogleMap();
	updateDisplay();
	function initGoogleMap(){
		var myOptions = {
		      zoom: 2,
		      center: nextCenter,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
		map = new google.maps.Map(document.getElementById("next_center_map_canvas"),
			myOptions);
		nextMarker = new google.maps.Marker({
		      position: nextCenter, 
		      map: map, 
		      title:"Next center"
		  });
		curMarker = new google.maps.Marker({
			position: curCenter,
			map: map,
			animation: google.maps.Animation.BOUNCE,
			title: "Current center"
		});
	}
}

function updateDisplay(){
	nextWaveDisplay.innerHTML = "Next wave begins at " + nextWaveTime.toString();
}

function updateMap(){
	nextMarker.setPosition(nextCenter);
	curMarker.setPosition(curCenter);
}


function calcWaveCenters(){
	nextCenter = calcWaveCenter(nextWaveTime);
	curCenter = calcWaveCenter(curWaveTime);
}

function calcWaveCenter(time){
	var rand = new PseudoRandom(time.getTime());
	var lon = toLongitude(rand.random());
	var lat = toLatitude(rand.random());
	return new google.maps.LatLng(lat, lon);;

	function toLongitude(num){
		return 360 * (num - 0.5)
	}
	function toLatitude(num){
		return 180 * (num - 0.5)
	}
}

function waveUpdate(){
	distance = waveCalcDistance();
	var timeSinceWave = 42; //FIXME
}
function waveCalcDistance(){
	return google.maps.geometry.spherical.computeDistanceBetween(curCenter, myLocation);
}

function waveTimerHandler(){
	calcWaveTimes();
	calcWaveCenters();
	updateDisplay();
	updateMap();
}

window.addEventListener("load", wave_init, false);
