export function playSound(src: string, volume: number = 1) {
  const audio = new window.Audio(src);
  audio.volume = volume;
  audio.play().catch(() => {});
}
