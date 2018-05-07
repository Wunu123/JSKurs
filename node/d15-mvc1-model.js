/*
*
*	 Model Module
*
*/
var MVC = (function(mvc) {
  'use strict';

  mvc.Model = function(data) {
    this._data = data;
    this.onSet = new mvc._Event(this); //WEnn Daten gesetz werden
  };

  // define getters and setters
  mvc.Model.prototype.get = function(){ //Daten laden/zurückgeben
	  return this._data;
  };
  mvc.Model.prototype.set = function(data){ //Daten speichern
	  this._data = data;
      this.onSet.notify({ data: data }); //...wird ausgeführt
  };
  return mvc;
})(MVC || {});
