sap.ui.define(function() {
	"use strict";
	return {
		isNumPassengersVisible: function(transportMethod) {
			if (transportMethod === "2") {
				return true;
			} else {
				return false;
			}
		},
		isTripTypeVisible: function(transportMethodActive, commuteActive){
			if(commuteActive){ return false; }
			if(transportMethodActive){ return true; }
			return false;
		}
	};
});