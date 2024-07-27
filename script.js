console.log("Let's Write JS")
async function getSongs(){

let a =await fetch("https://dhruv-patel-07.github.io/Spotify-Clone/songs/")
let response = await a.text();
// console.log(response)
let div = document.createElement("div")
div.innerHTML = response;
let as = div.getElementsByTagName("a")
// console.log(as)
let songs = []
for (let index=0;index < as.length;index++){
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
    }
}
// console.log(songs)
return songs;
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic =(track)=>{
    // let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    if(!currentSong.pause){
        currentSong.play()
        play.src = "pause.svg"

    }
    // currentSong.play();
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


}
let currentSong = new Audio();

async function main(){
    // get list
    let songs = await getSongs()
    playMusic(songs[0],true)
    // console.log(songs)
    // show all the song in playlist
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
        <img class="invert" src="music.svg" alt="image" srcset="">
           <div class="info">
            <div> ${song.replaceAll("%20"," ")}</div>
            <div>Dhruv Patel</div>
            </div>
            <div class="playnow">
              <span>Play Now</span>
            <img src="play.svg" class="invert" alt="image" srcset="">
          </div>
          </li>
        
       </li>`;
        
    }

    // Attact event listner each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        console.log(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })

    })
    // play song
    // var audio = new Audio(songs[0]);
    // audio.play();


    
//     audio.addEventListener("loadeddata",()=>{
//         let duration = audio.duration;
//         console.log(audio.duration,audio.currentSrc,audio.currentTime)
//    });
play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "play.svg"
    }
})

// Listen for time update
currentSong.addEventListener("timeupdate",()=>{
    // currentSong.currentTime
    console.log(currentSong.currentTime,currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%";

})
// add event listner to seekbar
document.querySelector(".seekbar").addEventListener("click",(e)=>{
document.querySelector(".circle")(e.offsetX/e.getBoundingClientReact().width)*100
})
}

main()




