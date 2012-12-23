var SC = SC || {};
SC.audio = {};

SC.audio.spacegun = function () {
  new Audio('/media/laser.wav').play();
};

SC.audio.background = function () {
  new Audio('/media/digital-sonar.mp3').play();
};
