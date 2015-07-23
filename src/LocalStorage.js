(function (window) {
    function DataStore(options) {
        this.data = {};
    }
    DataStore.prototype.setItem = function (id, val) { return this.data[id] = String(val); };
    DataStore.prototype.getItem = function (id, def) { return this.data.hasOwnProperty(id) ? data[id] : def; };
    DataStore.prototype.removeItem = function (id) { return delete this.data[id]; };
    DataStore.prototype.clear = function () { return this.data = {}; };

    function LS(options){
      this.options = options||{};
      if (this.options.hasOwnProperty('prefix'))
      {
          this.options.prefix = this.options.prefix+':';
      }
      else
      {
          this.options.prefix = '';
      }
      if (!this.options.hasOwnProperty('cleanup'))
      {
          this.options.cleanup = [
              function(){ this.clear(); }
          ];
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
        var l = this.options.cleanup.length;
        var i = 0;
        do
        {
            try{
                this.ds.setItem(this.options.prefix+key,value);
                return;
            }
            catch(err)
            {
                /**
                 * @todo http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
                 */
                if ({QUOTA_EXCEEDED_ERR:1,QuotaExceededError:1,NS_ERROR_DOM_QUOTA_REACHED:1}[err.name] && this.options.cleanup[i])
                {
                    var result = this.options.cleanup[i].call(this,{key:key,value:value,error:err});
                    if (false===result)
                    {
                        throw err;
                    }
                }
                else
                {
                    throw err;
                }
            }
            i++;
        }
        while (i < l)
    };
    LS.prototype.rm = function(key){
        this.ds.removeItem(this.options.prefix+key);
    };
    /**
     *  @todo only clear keys that match prefix 
     */
    LS.prototype.clear = function(){
        this.ds.clear();
    };
    LS.prototype.cleanup = function(){
      
    };
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
