// Используется EventEmitter из node.js, так как он является независимым js-модулем
import {EventEmitter} from 'events';

export class Timer extends EventEmitter {
  constructor(options) {
    super();
    this.fps = options.fps;
  }

  get fpsInterval() {
    return 1000 / this.fps;
  }

  run() {
    const self = this;
    let startTime = performance.now();
    let elapsed;

    self.emit(`start`, startTime);

    self.requestId = requestAnimationFrame(function tick(time) {
      self.requestId = requestAnimationFrame(tick);

      elapsed = time - startTime;

      if (elapsed >= self.fpsInterval) {
        startTime = time - (elapsed % self.fpsInterval);
        self.emit(`update`, elapsed);
      }
    });

    return self;
  }

  stop() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.emit(`stop`, performance.now());
    }

    return this;
  }
}
