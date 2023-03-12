const rainDivs = ["rain r1", "rain r2", "rain r3", "rain r4", "rain r5", "rain r6"]
var filesAdded = '';
var disabled = false;


function loadRain() { 
    
    // Check if the css is already added, toggle on and off on button press if detected
    if(filesAdded.indexOf('rain.css') !== -1) {
        // Get the audio from DOM
        var activatedAudio = document.getElementById("dynamicAudio");

        // Check if the audio and css is already disabled, toggle on if it is
        if(disabled) {
            activatedAudio.play();
            document.styleSheets[2].disabled = false;
            disabled = false;
            return
        }
        
        activatedAudio.pause();
        document.styleSheets[2].disabled = true;
        disabled = true;
        return
    }

    var head = document.getElementsByTagName('head')[0]
    var body = document.getElementsByTagName('body')[0]
    var host = window.location.host;

    // Interate through the rainDivs and append them all to the body, change the array for more or less rain!
    for (let i = 0; i < rainDivs.length; i++) {
        var div = document.createElement('div');
        div.className = rainDivs[i];
        body.appendChild(div);
    }

    // Check if we are offline so we can still obtain a path in that case. Assumes Pelican is used to build output.
    if(host == '') {
        var offlinePath = window.location.pathname
        host = offlinePath.substring(0, offlinePath.indexOf('output')) + 'output'
    }
    
    //console.log(window.location.pathname.substring(0,window.location.pathname.indexOf('output')));

    // Add stylesheet for the rain
    var style = document.createElement('link') 
    style.href = host + '/theme/css/rain.css'
    style.type = 'text/css'
    style.rel = 'stylesheet'
    head.append(style);


    // Add music to the page
    var audio = document.createElement('audio')
    audio.src = host + '/theme/audio/raining.mp3'
    audio.loop = true
    audio.autoplay = true
    audio.volume = 0.5
    audio.id = 'dynamicAudio'
    body.append(audio);
      
    // Adding the name of the file to keep record
    filesAdded += 'rain.css';
}