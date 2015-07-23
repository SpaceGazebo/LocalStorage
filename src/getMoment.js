(function(LS){
  LS.prototype.getMoment = function(key,def)
  {
      var value = new moment(this.get(key));
      
      if (value.isValid()) return value;
      
      return def;
  };
  LS.prototype.setMoment = function(key,value)
  {
      this.setObj(key,value);
  };
})(window.SG.LocalStorage);
