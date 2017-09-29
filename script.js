//SHUFFLE - NathanChrs (c) 2014
//for Brilliant Competition 7

countdown_interval: null
//initialize
var initShuffle = function(bidang){

	//data included from file data.js in index.html
	
	window.isShuffling = false;
	window.isRandomShuffling = true;
	window.currentPosition = passCount;
	window.bidanglomba = bidang;
	
	window.container = document.getElementById("container");
	window.textContainer = document.getElementById("text-container");
	window.rank = document.getElementById("rank");
	window.names = document.getElementById("names");
	window.school = document.getElementById("school");
	
	window.doneList = document.getElementById("donelist");
	
	document.onclick = clickHandler;
	TweenMax.to(container,0.5,{opacity:0.4});
	randomShuffle();
}

var nextShuffle = function (nextId){
	isShuffling = true;
	TweenMax.to(textContainer, 0.2, {opacity:0, ease:Power2.easeOut}); //fadein duration
	TweenMax.to(textContainer, 0.2, {x:50, ease:Power2.easeInOut});
	window.setTimeout(function(){nextShuffle2(nextId);},200);
}

var nextShuffle2 = function (nextId){
	rank.innerHTML = kode_pst[nextId];
	names.innerHTML = data_name1[nextId] + "<br>" + data_name2[nextId];
	school.innerHTML = data_school[nextId];
	
	TweenMax.set(textContainer, {x:-50});
	TweenMax.to(textContainer, 0.2, {opacity:1, ease:Power2.easeIn}); //fadeout duration
	TweenMax.to(textContainer, 0.2, {x:0, ease:Power2.easeInOut});
	window.setTimeout(nextShuffle3,200);
}

var nextShuffle3 = function(){
	isShuffling = false;
}

var clickHandler = function(){
	isRandomShuffling = !isRandomShuffling;
}
var audio = new Audio('lagu_pengumuman.mp3');
var randomShuffle = function() {
	if(isRandomShuffling){
		audio.play();
		var randomIndex = Math.floor(Math.random() * participantCount) + 1;
		nextShuffle(randomIndex);
		window.setTimeout(randomShuffle,500); //shuffle duration
	} else {
		//show, pause for a few seconds
		audio.pause();
		nextShuffle(data_rank[currentPosition]);
		TweenMax.to(container,0.5,{opacity:1});
		var that = this;
		//bikin ilang njir
		this.countdown_interval = setInterval(function() {
			if (isRandomShuffling) {
				TweenMax.to(container,1,{opacity:0.4});			
				//add to table;
				var tableContents = doneList.innerHTML;
				doneList.innerHTML ='<div id="donelistitem'
				+ currentPosition
				+ '" class="donelistrow" style="opacity:0; transform: scaley(0);">'
				+ kode_pst[data_rank[currentPosition]]
				+ ' - <b>'
				+ data_name1[data_rank[currentPosition]] + "</b> & <b>"
				+ data_name2[data_rank[currentPosition]] + "</b> - "
				+ data_school[data_rank[currentPosition]] + ' </div> '
				+ tableContents;
				var newRow = document.getElementById("donelistitem"+currentPosition);
				TweenMax.to(newRow, 0.5, {opacity:1, ease:Power2.easeInOut});
				TweenMax.to(newRow, 0.8, {scaleY:1, ease:Power2.easeOut});
				currentPosition--;
				
				if(currentPosition>0){
					clearInterval(that.countdown_interval);
					randomShuffle();
				} else {
					//done, show table only
					clearInterval(that.countdown_interval);
					TweenMax.to(container, 1, {opacity:0, ease:Power2.easeInOut});
					TweenMax.to(donelist, 1, {y:-380, ease:Power2.easeInOut});
				}
			}
		}, 250);
	}
}
