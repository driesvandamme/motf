sap.ui.define(function() {
	"use strict";
	return {
		isNumPassengersVisible: function(transportMethod) {
			if (transportMethod === "2") {
				return true;
			} else {
				return false;
			}
		}
	};
});