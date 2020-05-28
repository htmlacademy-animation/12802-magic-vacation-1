export class Timer {
  constructor(options) {
    this.state = {};
    this.fps = options.fps;
    this.render = options.render;
  }

  get fpsInterval() {
    return 1000 / this.fps;
  }

  _tick(time) {
    const state = this.state;
    const elapsed = time - state.lastTime;
    if (elapsed >= this.fpsInterval) {
      this.render();
      state.lastTime = time;
    }
  }

  _run() {
    this.state.requestId = requestAnimationFrame((time) => {
      this._run();
      this._tick(time);
    });
  }

  start() {
    const startTime = performance.now();
    this.state.lastTime = startTime;
    this._run();
    return this;
  }

  stop() {
    if (this.state.requestId) {
      cancelAnimationFrame(this.state.requestId);
    }
    return this;
  }
}
