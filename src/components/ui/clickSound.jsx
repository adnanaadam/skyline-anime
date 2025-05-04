import clickSound from '@/assets/sounds/skyline_chime.wav';

export default function ClickSound() {
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.4;
    audio.play();
  };

  return playSound;
}
