var SC = SC || {};

SC.objectFactory = function (json) {
  var parsed = JSON.parse(json);
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
