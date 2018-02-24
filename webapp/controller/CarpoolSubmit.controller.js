sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.hackathon2018.controller.CarpoolSubmit", {
		handleRouteMatched: function(oEvent) {

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}

		},
		_onPageNavButtonPress: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}
		},
		getQueryParameters: function(oLocation) {

			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		_onSegmentedButtonItemPress: function(oEvent) {

			var sDialogName = "Dialog1";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];
			var oSource = oEvent.getSource();
			var oBindingContext = oSource.getBindingContext();
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oView;
			if (!oDialog) {
				this.getOwnerComponent().runAsOwner(function() {
					oView = sap.ui.xmlview({
						viewName: "com.sap.build.standard.hackathon2018.view." + sDialogName
					});
					this.getView().addDependent(oView);
					oView.getController().setRouter(this.oRouter);
					oDialog = oView.getContent()[0];
					this.mDialogs[sDialogName] = oDialog;
				}.bind(this));
			}

			return new Promise(function(fnResolve) {
				oDialog.attachEventOnce("afterOpen", null, fnResolve);
				oDialog.open();
				if (oView) {
					oDialog.attachAfterOpen(function() {
						oDialog.rerender();
					});
				} else {
					oView = oDialog.getParent();
				}

				var oModel = this.getView().getModel();
				if (oModel) {
					oView.setModel(oModel);
				}
				if (sPath) {
					var oParams = oView.getController().getBindingParameters();
					oView.bindObject({
						path: sPath,
						parameters: oParams
					});
				}
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},

		_onSegmentedButtonItemPress1: function() {

    			sap.m.MessageToast.show('Send to Jonas'); // default disappear in 3 sec
		},

		onAfterRendering: function() {
			this.directionsService = new google.maps.DirectionsService();
			this.directionsDisplay = new google.maps.DirectionsRenderer();
			
			if (!this.initialized) {
				this.initialized = true;
				this.geocoder = new google.maps.Geocoder();
				var mapOptions = {
					center: new google.maps.LatLng(50.8503396, 4.351710300000036),
					zoom: 8,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					// start_address: "Brussels, Belgium",
					// end_address: "Ghent, Belgium"
				};
				this.calculateAndDisplayRoute(this.directionsService);
				this.map = new google.maps.Map(this.getView().byId("map_canvas").getDomRef(), mapOptions);
    			this.directionsDisplay.setMap(this.map);
			}
		},

		calculateAndDisplayRoute: function(directionsService) {
			var directionsDisplay = this.directionsDisplay;
			directionsService.route({
				origin: "Alfons Gossetlaan 11, Groot-Bijgaarden",
				destination: "Dendermondsesteenweg 39, Ghent",
				waypoints: [{
					location: "Stationsstraat 13, Aalst",
					stopover: true
				}],
				optimizeWaypoints: true,
				travelMode: 'DRIVING'
			}, function(result, status) {
    			if (status === 'OK') {
    				directionsDisplay.setDirections(result);
    			}
			});
		},

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("CarpoolSubmit").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			$.ajax({
				url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDUV5uTWtLmMOmLQDnEDMqGDcATjqiGf8U",
				type: "GET",
				dataType: "text",
				contentType: "application/json;",
				success: function(data, textStatus) {
					console.log(data);
				},
				error: function(xhr, status) {
					console.log("ERROR");
				}
			});
		}
	});
}, /* bExport= */ true);