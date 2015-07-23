function LocalStorageDummy() {
  this.attr = {};
  this.get = function(k,d){return array_get(this.attr,k,d);};
  this.set = function(k,v){return array_set(this.attr,k,v);};
  this.rm = function(k){ delete this.attr[k];};
  this.concat = function(k,a){ this.setObj(k,this.getObj(k,[]).concat([a])); };
  this.getObj = function(a,b)
  {
    var v = this.get(a);
    if (v)
    {
        try{
          return JSON.parse(v);
        }catch(e){}
    }
    return b||v;
  };
  this.setObj = function(a,b)
  {
    return this.set(a, JSON.stringify(b))||false;
  };
  this.clear = function(){ this.attr = {}; };
}
function supports_local_storage() {
  try {
    if ('localStorage' in window && window['localStorage'] !== null)
    {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    }
  } catch(e){}
  return false;
}
function LocalStorageObject () {
  this.d = {};
  this.get = function(a,b)
  {
    return localStorage.getItem(a) || b;
  };
  this.getObj = function(a,b)
  {
    var v = this.get(a);
    if (v)
    {
        try{
          return JSON.parse(v);
        }catch(e){}
    }
    return b||v;
  };
  this.set = function(a,b)
  {
    return localStorage.setItem(a,b)||false;
  };
  this.setObj = function(a,b)
  {
    return this.set(a, JSON.stringify(b))||false;
  };
  this.rm = function(a)
  {
    return localStorage.removeItem(a)||false;
  };
  this.clear = function(){ localStorage.clear(); };
  this.concat = function(k,a){ this.setObj(k,this.getObj(k,[]).concat(a)); };
}
if (supports_local_storage())
{
  LS = new LocalStorageObject();
}
else
{
  LS = new LocalStorageDummy();
}
