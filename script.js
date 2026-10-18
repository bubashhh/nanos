(() => {
  const player = document.querySelector('[data-audio-player]'), audio = player.querySelector('audio'), toggle = player.querySelector('.audio-toggle'), label = player.querySelector('.audio-label'), symbol = toggle.querySelector('[aria-hidden="true"]'), progress = player.querySelector('.progress'), current = player.querySelector('.current-time'), duration = player.querySelector('.duration');
  const format = s => !Number.isFinite(s) ? '0:00' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const setPlaying = playing => { label.textContent = playing ? 'პაუზა' : 'მოუსმინე'; symbol.textContent = playing ? 'Ⅱ' : '▶'; toggle.setAttribute('aria-label', playing ? 'აუდიოს დაპაუზება' : 'აუდიო შეტყობინების მოსმენა'); toggle.setAttribute('aria-pressed', String(playing)); };
  audio.addEventListener('loadedmetadata', () => { duration.textContent = format(audio.duration); progress.disabled = false; });
  audio.addEventListener('timeupdate', () => { current.textContent = format(audio.currentTime); progress.value = audio.duration ? audio.currentTime / audio.duration * 100 : 0; });
  audio.addEventListener('play', () => setPlaying(true)); audio.addEventListener('pause', () => setPlaying(false));
  audio.addEventListener('ended', () => { progress.value = 0; current.textContent = '0:00'; });
  audio.addEventListener('error', () => { toggle.disabled = true; toggle.setAttribute('aria-label', 'აუდიო შეტყობინება ვერ ჩაიტვირთა'); });
  toggle.addEventListener('click', async () => { try { audio.paused ? await audio.play() : audio.pause(); } catch (_) { setPlaying(false); } });
  progress.addEventListener('input', () => { if (audio.duration) audio.currentTime = progress.value / 100 * audio.duration; });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const stage = document.querySelector('#kitten-stage'), templates = ['kitten-1', 'kitten-2', 'kitten-3'], wait = (min, max) => Math.round((min + Math.random() * (max - min)) * 1000);
  const sendKitten = () => {
    const kitten = document.createElement('div'), fromLeft = Math.random() > .5, distance = innerWidth + 180, durationMs = 8000 + Math.random() * 4000, pauseAt = Math.random() < .35 ? .42 + Math.random() * .2 : null, started = performance.now();
    kitten.className = 'kitten'; kitten.append(document.querySelector(`#${templates[Math.floor(Math.random() * templates.length)]}`).content.cloneNode(true)); kitten.style.transform = `translateX(${fromLeft ? -110 : innerWidth + 110}px) scaleX(${fromLeft ? 1 : -1})`; stage.append(kitten);
    const move = now => { let elapsed = now - started; if (pauseAt !== null) { const stop = durationMs * pauseAt, length = 1600; if (elapsed >= stop && elapsed < stop + length) { kitten.classList.add('is-looking'); requestAnimationFrame(move); return; } if (elapsed >= stop + length) elapsed -= length; } const percent = Math.min(elapsed / durationMs, 1), x = fromLeft ? -110 + distance * percent : innerWidth + 110 - distance * percent; kitten.style.transform = `translateX(${x}px) scaleX(${fromLeft ? 1 : -1})`; if (percent < 1) requestAnimationFrame(move); else { kitten.remove(); setTimeout(sendKitten, wait(13, 24)); } };
    requestAnimationFrame(move);
  };
  setTimeout(sendKitten, wait(5, 8));
})();
