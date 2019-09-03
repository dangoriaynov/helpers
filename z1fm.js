function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}
async function downloadSongAsync(index) {
	$("li.tracks-item > div.tracks-button_showDescription")[index].click();
	await sleep(2);
	console.log("Downloading song #" + (index+1));
	$("li.tracks-item_opened > div.tracks-description > a.tracks-download")[0].click();
}
async function loadSongs(maxSongs = 1000) {
	while ($("li.tracks-item").length < maxSongs
			&& $("#moreSongs")[0].style.display != "none") {
		$("#moreSongs").click();
		await sleep(1);
		console.log("Loaded more songs (need " + maxSongs + ", have " + $("li.tracks-item").length + ")");
	}
	maxSongs = $("li.tracks-item").length;
	console.log("Will download " + maxSongs + " songs")
	for (i = 0; i < maxSongs; i++) {
		var duration = $("li.tracks-item")[i].getAttribute("data-duration") / 150;
		downloadSongAsync(i);
		await sleep(duration * 12);
	}
	var audio = new Audio('http://ahandfulof.me/fail/digital-bell-sms.mp3');
	audio.play();
}
loadSongs(150);