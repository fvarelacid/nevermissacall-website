/**
 * AudioWorklet processor that captures mic input and posts
 * raw Float32 chunks to the main thread for resampling + sending.
 */
class AudioCaptureProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super()
    // Default ~100ms at 48kHz; main thread passes actual value
    this.bufferSize = options.processorOptions?.bufferSize ?? 4800
    this.buffer = new Float32Array(this.bufferSize)
    this.writeIndex = 0
  }

  process(inputs) {
    const input = inputs[0]?.[0]
    if (!input) return true

    for (let i = 0; i < input.length; i++) {
      this.buffer[this.writeIndex++] = input[i]
      if (this.writeIndex >= this.bufferSize) {
        // Send a copy to the main thread
        const chunk = this.buffer.slice()
        this.port.postMessage(chunk, [chunk.buffer])
        this.buffer = new Float32Array(this.bufferSize)
        this.writeIndex = 0
      }
    }
    return true
  }
}

registerProcessor('audio-capture-processor', AudioCaptureProcessor)
