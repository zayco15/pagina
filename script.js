
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');




let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//crear elemento de audio
let track = document.createElement('audio');


//lista de canciones
let All_song = [
   {
     name: "Face",
     path: "music/song1.mp3",
     img: "imagenes/img1.jpg",
     singer: "Woosung"
   },
   {
     name: "Love To Lose",
     path: "music/song2.mp3",
     img: "imagenes/img2.jpg",
     singer: "Sandro Cavazza, Georgia Ku"
   },
   {
     name: "Procura",
     path: "music/song3.mp3",
     img: "imagenes/img3.jpg",
     singer: "Chichi Peralta"
   },
   {
     name: "You Say",
     path: "music/song4.mp3",
     img: "imagenes/img4.jpg",
     singer: "Lauren Daigle"
   },
];


// Funciones


// funcion cargar el track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//funcion mutear sonido
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// la cancion se esta reproduciendo o no?
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// resetear slider de cancion
 function reset_slider(){
 	slider.value = 0;
 }

// reproducir cancion
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fas fa-pause"></i>';
}

//pausar cancion
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fas fa-play"></i>';
}


// siguiente cancion
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// cancion anterior
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// cambiar volumen
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// cambiar posicion del slider
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// funcion autoplay - nota: tengo que arreglarlo o quitarlo
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF8A65";
	}
}


function range_slider(){
	let position = 0;
        
        // actualizar posicion del slider
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // la funcion se activara cuando la cancion acabe
       if(track.ended){
       	 play.innerHTML = '<i class="fas fa-play"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }