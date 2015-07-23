(function (window){
  function DataStore (options) {
      this.data = {};
  }
  DataStore.prototype.setItem = function(id, val) { return this.data[id] = String(val); };
  DataStore.prototype.getItem = function(id) { return this.data.hasOwnProperty(id) ? data[id] : undef; };
  DataStore.prototype.removeItem = function(id) { return delete this.data[id]; };
  DataStore.prototype.clear = function() { return this.data = {}; };

  function LS (options){
    this.options = options||{};
    if (this.options.prefix)
    {
        this.options.prefix = this.options.prefix+':';
    }
    else
    {
        this.options.prefix = '';
    }
    
    var ds = {};
    try{
        ds = options.dataStore||window.localStorage||{};
        ds.setItem('a','a');
        if (ds.getItem('a')!=='a')
        {
            throw 'not a';
        }
        ds.removeItem('a');
    }
    catch(err)
    {
        this.ds = new DataStore();
    }
  };
  LS.prototype.get = function(key,def /*default*/)
  {
      var value = this.ds.getItem(this.options.prefix+key);
      
      if (typeof value==='undefined' || value===null)
      {
          return def;
      }
      return value;
  };
  LS.prototype.set = function(key,value){
      this.ds.setItem(this.options.prefix+key,value);
  };
  LS.prototype.rm = function(key){
      this.ds.removeItem(this.options.prefix+key);
  };
  /**
   *  @todo only clear keys that match prefix 
   */
  LS.prototype.clear = function(){
      this.ds.clear();
  }
  LS.prototype.getObj = function(key,def)
  {
    var v = this.get(key);
    if (v)
    {
        try{
          return JSON.parse(v);
        }catch(e){}
    }
    if (typeof def !== 'undefined') return def;
    return v;
  };
  LS.prototype.setObj = function(key,value)
  {
      this.set(key, JSON.stringify(value))||false;
  };
  LS.prototype.concat = function(key,arr){
      this.setObj(key,this.getObj(key,[]).concat(arr));
  };
  
  
  window.SG = window.SG||{};
  window.SG.DataStore = DataStore;
  window.SG.LocalStorage = LS;
})(window);
