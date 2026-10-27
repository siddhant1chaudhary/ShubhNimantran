/**
 * Web Audio procedural wedding ambient music synthesizer.
 * Creates an authentic, calming Indian classical raga ambient soundscape
 * with gentle flute harmonics, tanpura resonance drone, and chime accents.
 * 100% self-contained with no external mp3 or network dependencies.
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private droneNodes: OscillatorNode[] = [];
  private volumeLevel: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volumeLevel * 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volumeLevel = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volumeLevel * 0.35, this.ctx.currentTime, 0.1);
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.startDrone();
    this.startMelodicArpeggiator();
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.droneNodes.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch {
        // ignore already stopped
      }
    });
    this.droneNodes = [];
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Tanpura root frequencies (Sa and Pa in D: D3 = 146.83Hz, A3 = 220Hz, D4 = 293.66Hz)
    const droneFreqs = [146.83, 220.0, 293.66];

    droneFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle slow chorus detuning
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.08, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      droneGain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx.currentTime);
      osc.connect(droneGain);
      droneGain.connect(this.masterGain);

      osc.start();
      this.droneNodes.push(osc);
    });
  }

  private startMelodicArpeggiator() {
    if (!this.ctx || !this.masterGain) return;

    // Raag Yaman / Bhupali romantic scale frequencies (D major / pentatonic peaceful notes)
    // D4, E4, F#4, A4, B4, D5, E5, F#5
    const notes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99];

    let noteIndex = 0;
    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const freq = notes[noteIndex % notes.length];
      // subtle random variations
      noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % notes.length;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      // Gentle flute envelope: soft attack, sustained resonance, soft release
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.09, now + 0.4);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.3);
    };

    playNextNote();
    this.intervalId = window.setInterval(playNextNote, 1800);
  }
}

export const weddingAudio = new WeddingAudioPlayer();
