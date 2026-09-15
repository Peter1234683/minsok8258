export async function playAlertSound() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  const now = ctx.currentTime;
  const tones = [0, 0.28, 0.56];
  for (const t of tones) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.value = t === 0.56 ? 660 : 880;
    g.gain.setValueAtTime(0.0001, now + t);
    g.gain.exponentialRampToValueAtTime(0.12, now + t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.2);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now + t);
    o.stop(now + t + 0.22);
  }
  window.setTimeout(() => void ctx.close(), 1200);
}
