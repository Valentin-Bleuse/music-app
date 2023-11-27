import gsap from "gsap";
class AUDIO_CONTROLLER {
    setup() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        this.audio = new Audio();
        this.audio.volume = 0.1;
        this.audio.crossOrigin = "anonymous";

        this.audioSource = this.ctx.createMediaElementSource(this.audio);
        this.analyzer = new AnalyserNode(this.ctx, { fftSize: 1024, smoothingTimeConstant: 0.8 });

        this.fdata = new Uint8Array(this.analyzer.frequencyBinCount);
        console.log(this.fdata);

        this.audioSource.connect(this.analyzer);
        this.audioSource.connect(this.ctx.destination);



        gsap.ticker.add(this.tick);
    }
    updateSong(preview) {
        console.log(preview);
        this.audio.src = preview;
        this.audio.currentTime = 0;
        this.audio.play();

    }

    tick = () => {
        this.analyzer.getByteFrequencyData(this.fdata);
        // console.log(this.fdata);
    }
}
const audioController = new AUDIO_CONTROLLER();
export default audioController;