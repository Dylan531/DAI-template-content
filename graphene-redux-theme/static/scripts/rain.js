var filesAdded = '';
var disabled = false;

function loadRain() { 
    var head = document.getElementsByTagName('head')[0]
    var body = document.getElementsByTagName('body')[0]

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

      
    // Creating link element
    var style = document.createElement('link') 
    style.href = 'theme/css/rain.css'
    style.type = 'text/css'
    style.rel = 'stylesheet'
    head.append(style);

    // Add music to the page
    var audio = document.createElement('audio')
    audio.src = 'theme/audio/raining.mp3'
    audio.loop = true
    audio.autoplay = true
    audio.volume = 0.5
    audio.id = 'dynamicAudio'
    body.append(audio);
      
    // Adding the name of the file to keep record
    filesAdded += 'rain.css';
}