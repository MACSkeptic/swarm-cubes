var SC = SC || {};

SC.objectFactory = function (json) {
  if(json instanceof String){
    var parsed = JSON.parse(json);
  } else {
    var parsed = json;
  }
  var target = SC.core.WorldObject();

  _.each(parsed.flavours, function (flavour) {
    SC[flavour].applyTo(target);
  });
  _.each(parsed.flavours, function (flavour) {
    target.characteristics[flavour] = _.extend(
      target.characteristics[flavour],
      parsed.characteristics[flavour]);
  });


  return target;
};
