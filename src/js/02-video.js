import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY="videoplayer-current-time";

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onTimeupdate=function(data){
    //console.log(JSON.stringify( data));
    localStorage.setItem(STORAGE_KEY,JSON.stringify( data));
}
const setPlayerLastTime=function(){
    //console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(data!==null){
        player.setCurrentTime(data.seconds).then(function(seconds) {
            // seconds = the actual time that the player seeked to
        }).catch(function(error) {
            switch (error.name) {
                case 'RangeError':
                    // the time was less than 0 or greater than the video’s duration
                    break;
        
                default:
                    // some other error occurred
                    break;
            }
        });
    }
}

window.addEventListener("load",setPlayerLastTime);
player.on("timeupdate",throttle(onTimeupdate,1000));




