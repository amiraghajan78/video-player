const $ = document;

let mainVideo = $.querySelector("#video");
let videosContainer = $.querySelector(".side-bar-videos-container");
let videoVolume = $.querySelector("#volume");
let menuVideoVolume = $.querySelector("#menu-volume");
let volumeRangeContainer = $.querySelector("#volume-range");
let menuVolumeRangeContainer = $.querySelector("#menu-volume-range");
let speakerIcon = $.querySelector("#speaker-icon");
let menuSpeakerIcon = $.querySelector("#menu-speaker-icon");
let playPauseBtn = $.querySelector("#play-pause-btn");
let playPauseBtnIcon = $.querySelector("#play-pause-btn-icon");
let speedBtn = $.querySelector("#speed-btn");
let tooltipBox = $.querySelector("#tooltip-box");
let speedItems = $.querySelectorAll('.speed-btn-item');
let screenBtn = $.querySelector('#screen-button');
let videoPlayer = $.querySelector('.video-player');
let screenIcon = $.querySelector('#screen-icon');
let currentTimeContainer = $.querySelector('#current-time');
let durationTimeContainer = $.querySelector('#duration-time');
let progressBarTrack = $.querySelector('.progress-bar-track');
let progressBar = $.querySelector('.progress-bar');
let stopBtn = $.querySelector('#stop-btn');
let backwardBtn = $.querySelector('#backward-btn');
let forwardBtn = $.querySelector('#forward-btn');
let videoTitle = $.querySelector('#video-title');
let randomBtn = $.querySelector('#random-btn');
let prevBtn = $.querySelector('#prev-btn');
let nextBtn = $.querySelector('#next-btn');
let settingsBtn = $.querySelector('#setting');
let mobileMenu = $.querySelector('.mobile-menu');
let dropDownBox = $.querySelector('.drop-down-box');
let dropDownIcon = $.querySelector('#drop-down-icon');
let dropDownMenu = $.querySelector('.drop-down-menu');
let dropDownMenuItems = $.querySelectorAll('.drop-down-item');

let isPlaying = false;
let isToggle = false;
let isFullScreen = false;
let menuStatus = false;
let isDropDown = false;
let randomVideo = [];
let videoIndex = 0;

const videosData = [
    {id: 1, title: 'Vide-1 From Video Data.', path: './public/videos/video-1.mp4', poster: './public/images/poster-1.png'},
    {id: 2, title: 'Vide-2 From Video Data.', path: './public/videos/video-2.mp4', poster: './public/images/poster-2.png'},
    {id: 3, title: 'Vide-3 From Video Data.', path: './public/videos/video-3.mp4', poster: './public/images/poster-3.png'},
    {id: 4, title: 'Vide-4 From Video Data.', path: './public/videos/video-4.mp4', poster: './public/images/poster-4.png'},
    {id: 5, title: 'Vide-5 From Video Data.', path: './public/videos/video-5.mp4', poster: './public/images/poster-5.png'},
    {id: 6, title: 'Vide-6 From Video Data.', path: './public/videos/video-6.mp4', poster: './public/images/poster-6.png'},
    {id: 7, title: 'Vide-7 From Video Data.', path: './public/videos/video-7.mp4', poster: './public/images/poster-7.png'},
    {id: 8, title: 'Vide-8 From Video Data.', path: './public/videos/video-8.mp4', poster: './public/images/poster-8.png'},
    {id: 9, title: 'Vide-9 From Video Data.', path: './public/videos/video-9.mp4', poster: './public/images/poster-9.png'},
    {id: 10, title: 'Vide-10 From Video Data.', path: './public/videos/video-10.mp4', poster: './public/images/poster-10.png'},
];

function clickHandler(videoID) {
    let mainVideoSelected = videosData.find(selectedVideo => selectedVideo.id === videoID);
    mainVideo.setAttribute('src', mainVideoSelected.path);
    let linkElem = $.createElement('a');
    linkElem.setAttribute('href', mainVideoSelected.path);
    linkElem.setAttribute('class', 'download-link');
    linkElem.setAttribute('download', mainVideoSelected.path);
    linkElem.addEventListener('click', downloadMsg);
    linkElem.innerText = 'Download Video';
    let downloadIcon = $.createElement('i');
    downloadIcon.setAttribute('class', 'fa fa-download download-icon');
    linkElem.appendChild(downloadIcon);
    videoTitle.innerText = mainVideoSelected.title;
    videoTitle.appendChild(linkElem);
    swal.fire({
        title: 'Video Selected Successfully...!',
        text: `You Selected Video ${videoID} from Videos Data....!`,
        icon: 'success'
    });
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};

function downloadMsg() {
    swal.fire({
        title: 'Video Downloaded Successfully...!',
        icon: 'success'
    });
};

function setVideoVolume(e) {
    let mainVolume = e.target.value;
    let convertToNumberVolume = parseInt(mainVolume);
    let dividedVolume = (convertToNumberVolume / 100);
    let finalVolume = dividedVolume;
    mainVideo.volume = finalVolume;
    volumeRangeContainer.innerHTML = mainVolume;
    menuVolumeRangeContainer.innerHTML = mainVolume;
    if (finalVolume === 0) {
        speakerIcon.className = 'fa fa-volume-mute';
        menuSpeakerIcon.className = 'fa fa-volume-mute';
    } else if (finalVolume > 0 && finalVolume < 0.25) {
        speakerIcon.className = 'fa fa-volume-off';
        menuSpeakerIcon.className = 'fa fa-volume-off';
    } else if (finalVolume >= 0.25 && finalVolume < 0.50) {
        speakerIcon.className = 'fa fa-volume-down';
        menuSpeakerIcon.className = 'fa fa-volume-down';
    } else if (finalVolume >= 0.50 && finalVolume <= 1) {
        speakerIcon.className = 'fa fa-volume-up';
        menuSpeakerIcon.className = 'fa fa-volume-up';
    };
};

function playPauseVideo() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        mainVideo.play();
        setInterval(() => {
            calcVideoTimes(currentTimeContainer , durationTimeContainer);
        }, 1000);
        playPauseBtnIcon.className = 'fa fa-pause';
    } else {
        mainVideo.pause();
        playPauseBtnIcon.className = 'fa fa-play';
    };
};

function setVideoSpeed() {
    isToggle = !isToggle;
    if (isToggle) {
        tooltipBox.style.display = 'block';
    } else {
        tooltipBox.style.display = 'none';
    };
    speedItems.forEach((item) => {
        item.addEventListener('click', () => {
            let mainSpeed = item.value;
            let convertSpeedToNumberSpeed = parseInt(mainSpeed);
            mainVideo.playbackRate = convertSpeedToNumberSpeed;
            tooltipBox.style.display = 'none';
            swal.fire({
                title: 'Speed set Successfully...!',
                text: `You set speed ${item.value} for video...!`,
                icon: 'success'
            });
        });
    });
};

function screenStatus() {
    isFullScreen = !isFullScreen;
    if (isFullScreen) {
        screenIcon.className = 'fa fa-compress';
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        };
        if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
        };
        if (videoPlayer.mozRequestFullscreen) {
            videoPlayer.mozRequestFullscreen();
        };
        if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
        };
    } else {
        screenIcon.className = 'fa fa-expand';
        if ($.exitFullscreen) {
            $.exitFullscreen();
        };
        if ($.webkitExitFullscreen) {
            $.webkitExitFullscreen();
        };
        if ($.mozExitFullscreen) {
            $.mozExitFullscreen();
        };
        if ($.msExitFullscreen) {
            $.msExitFullscreen();
        };
    }
};

function calcVideoTimes() {
    let videoDurationTime = mainVideo.duration;
    let videoCurrentTime = mainVideo.currentTime;
    let durationMinute = Math.floor(videoDurationTime / 60);
	let durationSeconde = Math.floor(videoDurationTime % 60);
	let currentMinute = Math.floor(videoCurrentTime / 60);
	let currentSeconde = Math.floor(videoCurrentTime % 60);
    if (durationMinute < 10) {
		durationMinute = "0" + durationMinute;
	};
	if (durationSeconde < 10) {
		durationSeconde = "0" + durationSeconde;
	};
	if (currentMinute < 10) {
		currentMinute = "0" + currentMinute;
	};
	if (currentSeconde < 10) {
		currentSeconde = "0" + currentSeconde;
	};
	durationTimeContainer.textContent = durationMinute + ":" + durationSeconde;
	durationTimeContainer.textContent = durationMinute + ":" + durationSeconde;
	currentTimeContainer.textContent = currentMinute + ":" + currentSeconde;
	let progressBarPercent = (videoCurrentTime / videoDurationTime) * 100;
	progressBarTrack.style.width = progressBarPercent + "%";
};

function setVideoProgress(e) {
    let width = this.clientWidth;
	let clickX = e.offsetX;
	let time = mainVideo.duration;
	mainVideo.currentTime = (clickX / width) * time;
};

function endVideo() {
    swal.fire({
        title: 'Video Finished...!',
        icon: 'success'
    });
};

function stopVideo() {
    mainVideo.pause();
    mainVideo.currentTime = 0;
};

function backwardVideo() {
    mainVideo.currentTime -= 10;
};

function forwardVideo() {
    mainVideo.currentTime += 10;
};

for (let i = 1; i < videosData.length + 1; i++) {
    randomVideo.push(i);
};

for (let i = randomVideo.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = randomVideo[i];
    randomVideo[i] = randomVideo[j];
    randomVideo[j] = k;
};

function setRandomVideo() {
    let shiftElement = randomVideo.shift();
    let filteredVideo = videosData.find(filterVideo => filterVideo.id === shiftElement);
    if (shiftElement) {
        mainVideo.setAttribute('src', filteredVideo.path);
        videoTitle.innerText = filteredVideo.title;
        swal.fire({
            title: 'Random video has been successfully uploaded...!',
            text: `Video Name : Video-${filteredVideo.id}`,
            icon: 'success'
        });
    } else {
        swal.fire({
            title: 'Random Count Error...!',
            text: 'Please refresh the page again...!',
            icon: 'error'
        });
    };
};

function prevVideo() {
    videoIndex--;
    if (videoIndex < 0) {
        videoIndex = videosData.length - 1;
    };
    let nextVideoPath = videosData[videoIndex].path;
    let nextVideoTitle = videosData[videoIndex].title;
    mainVideo.setAttribute('src', nextVideoPath);
    videoTitle.innerText = nextVideoTitle;
};

function nextVideo() {
    videoIndex++;
    if (videoIndex > videosData.length - 1) {
        videoIndex = 0;
    };
    let nextVideoPath = videosData[videoIndex].path;
    let nextVideoTitle = videosData[videoIndex].title;
    mainVideo.setAttribute('src', nextVideoPath);
    videoTitle.innerText = nextVideoTitle;
};

function toggleMenu() {
    menuStatus = !menuStatus;
    if (menuStatus) {
        mobileMenu.style.display = 'block';
    } else {
        mobileMenu.style.display = 'none';
    };
};

function toggleDropDown() {
    isDropDown = !isDropDown;
    if (isDropDown) {
        dropDownIcon.className = 'fa fa-angle-up';
        dropDownMenu.style.display = 'block';
    } else {
        dropDownIcon.className = 'fa fa-angle-down';
        dropDownMenu.style.display = 'none';
    };
};

dropDownMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
        let dropDownValue = item.value;
        console.log(dropDownValue);
        mainVideo.playbackRate = dropDownValue;
        swal.fire({
            title: 'Speed set Successfully...!',
            text: `You set speed ${dropDownValue} for video...!`,
            icon: 'success'
        });
    });
});

videosData.forEach((videos) => {
    videosContainer.insertAdjacentHTML('beforeend', `
        <video src='${videos.path}'
        poster='${videos.poster}'
        class='video-tag'
        onclick='clickHandler(${videos.id});'
        ></video>
    `);
});

videoVolume.addEventListener('input', setVideoVolume);
menuVideoVolume.addEventListener('input', setVideoVolume);
playPauseBtn.addEventListener('click', playPauseVideo);
speedBtn.addEventListener('click', setVideoSpeed);
screenBtn.addEventListener('click', screenStatus);
progressBar.addEventListener('click', setVideoProgress);
mainVideo.addEventListener('ended', endVideo);
stopBtn.addEventListener('click', stopVideo);
backwardBtn.addEventListener('click', backwardVideo);
forwardBtn.addEventListener('click', forwardVideo);
randomBtn.addEventListener('click', setRandomVideo);
prevBtn.addEventListener('click', prevVideo);
nextBtn.addEventListener('click', nextVideo);
settingsBtn.addEventListener('click', toggleMenu);
dropDownBox.addEventListener('click', toggleDropDown);
