var SC = SC || {};
SC.audio = {};

SC.audio.off = true;

SC.audio.spacegun = function () {
  if (SC.audio.off) return;
  new Audio('/media/laser.wav').play();
};

SC.audio.background = function () {
  if (SC.audio.off) return;
  new Audio('/media/digital-sonar.mp3').play();
};
