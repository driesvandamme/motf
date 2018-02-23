sap.ui.define(["sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
		"./utilities",
		"sap/ui/core/routing/History",
		"sap/ui/model/json/JSONModel"
	], function(BaseController, MessageBox, Utilities, History, JSONModel) {
		"use strict";

		return BaseController.extend("com.sap.build.standard.hackathon2018.controller.Overview", {
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
			_onGenericTilePress: function(oEvent) {

				var oBindingContext = oEvent.getSource().getBindingContext();

				return new Promise(function(fnResolve) {

					this.doNavigate("Planning", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});

			},
			doNavigate: function(sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {

				var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
				var oModel = (oBindingContext) ? oBindingContext.getModel() : null;

				var sEntityNameSet;
				if (sPath !== null && sPath !== "") {
					if (sPath.substring(0, 1) === "/") {
						sPath = sPath.substring(1);
					}
					sEntityNameSet = sPath.split("(")[0];
				}
				var sNavigationPropertyName;
				var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;

				if (sEntityNameSet !== null) {
					sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet,
						sRouteName);
				}
				if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
					if (sNavigationPropertyName === "") {
						this.oRouter.navTo(sRouteName, {
							context: sPath,
							masterContext: sMasterContext
						}, false);
					} else {
						oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function(bindingContext) {
							if (bindingContext) {
								sPath = bindingContext.getPath();
								if (sPath.substring(0, 1) === "/") {
									sPath = sPath.substring(1);
								}
							} else {
								sPath = "undefined";
							}

							// If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
							if (sPath === "undefined") {
								this.oRouter.navTo(sRouteName);
							} else {
								this.oRouter.navTo(sRouteName, {
									context: sPath,
									masterContext: sMasterContext
								}, false);
							}
						}.bind(this));
					}
				} else {
					this.oRouter.navTo(sRouteName);
				}

				if (typeof fnPromiseResolve === "function") {
					fnPromiseResolve();
				}
			},
			_onGenericTilePress1: function(oEvent) {

				var oBindingContext = oEvent.getSource().getBindingContext();

				return new Promise(function(fnResolve) {

					this.doNavigate("RewardsPage", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});

			},
			_onGenericTilePress2: function(oEvent) {

				var oBindingContext = oEvent.getSource().getBindingContext();

				return new Promise(function(fnResolve) {

					this.doNavigate("Carpooling", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});

			},
			_onGenericTilePress3: function(oEvent) {

				var oBindingContext = oEvent.getSource().getBindingContext();

				return new Promise(function(fnResolve) {

					this.doNavigate("CoeffCompany", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});

			},
			_onGenericTilePress4: function(oEvent) {
				var oBindingContext = oEvent.getSource().getBindingContext();
				return new Promise(function(fnResolve) {
					this.doNavigate("Employee", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
			},
			_onGenericTilePress5: function(oEvent) {
				var oBindingContext = oEvent.getSource().getBindingContext();
				return new Promise(function(fnResolve) {
					this.doNavigate("Achievements", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
			},
			_onGenericTilePress6: function(oEvent) {
				var oBindingContext = oEvent.getSource().getBindingContext();
				return new Promise(function(fnResolve) {
					this.doNavigate("TransportPoints", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});
			},
			_onButtonPress: function(oEvent) {

				var oBindingContext = oEvent.getSource().getBindingContext();

				return new Promise(function(fnResolve) {

					this.doNavigate("Settings", oBindingContext, fnResolve, "");
				}.bind(this)).catch(function(err) {
					if (err !== undefined) {
						MessageBox.error(err.message);
					}
				});

			},
			onChangeDirection: function(oEvent) {

				var idx = oEvent.getParameter("selectedIndex");
				var homeAddress = "Nieuwstraat+101+Brussel";
				var workAddress = "Dendermondsesteenweg+39+Gent";

				switch (idx) {
					case 0: //To work
						var trainUrl =
							"https://maps.googleapis.com/maps/api/directions/json?origin=" + homeAddress + "&destination=" + workAddress +
							"&mode=transit&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";
						var carUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + homeAddress + "&destination=" + workAddress +
							"&mode=driving&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";
						var bikeUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + homeAddress + "&destination=" + workAddress +
							"&mode=bicycling&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";
						break;
					case 1: //To home
						var trainUrl =
							"https://maps.googleapis.com/maps/api/directions/json?origin=" + workAddress + "&destination=" + homeAddress +
							"&mode=transit&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";
						var carUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + workAddress + "&destination=" + homeAddress +
							"&mode=driving&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";
						var bikeUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + workAddress + "&destination=" + homeAddress +
							"&mode=bicycling&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";
						break;
					default:
				}

				//Get train data
				var transitTime;
				var transitDistance;
				var departureTime;
				var arrivalTime;
				var that = this;
				var url;

				$.ajax({
					url: trainUrl,
					type: "GET",
					dataType: "text",
					contentType: "application/json;",
					success: function(data) {
						var transitData = JSON.parse(data);
						transitTime = transitData.routes[0].legs[0].duration.text;
						transitDistance = transitData.routes[0].legs[0].distance.text;
						departureTime = transitData.routes[0].legs[0].departure_time.text;
						arrivalTime = transitData.routes[0].legs[0].arrival_time.text;
						that.getView().byId("idTrainTileContent").setProperty("footer", departureTime + "-" + arrivalTime);
						that.getView().byId("idTrainTile").setProperty("subheader", transitTime + " for " + transitDistance + " kilometers");

					},
					error: function(xhr, status) {
						console.log("ERROR");
					}
				});

				//Get car data
				var carTime;
				var carDistance;
				var thatCar = this;

				$.ajax({
					url: carUrl,
					type: "GET",
					dataType: "text",
					contentType: "application/json;",
					success: function(data) {
						var transitData = JSON.parse(data);
						carTime = transitData.routes[0].legs[0].duration.text;
						carDistance = transitData.routes[0].legs[0].distance.text;

						//that.getView().byId("idCarTileContent").setProperty("footer", departureTime + "-" + arrivalTime);
						that.getView().byId("idCarTile").setProperty("subheader", carTime + " for " + carDistance + " kilometers");
					},
					error: function(xhr, status) {
						console.log("ERROR");
					}
				});
				//Get Bike data
				var bikeTime;
				var bikeDistance;
				var thatBike = this;

				$.ajax({
					url: bikeUrl,
					type: "GET",
					dataType: "text",
					contentType: "application/json;",
					success: function(data) {
						var bikeData = JSON.parse(data);
						bikeTime = bikeData.routes[0].legs[0].duration.text;
						bikeDistance = bikeData.routes[0].legs[0].distance.text;

						//that.getView().byId("idCarTileContent").setProperty("footer", departureTime + "-" + arrivalTime);
						thatBike.getView().byId("idBikeTile").setProperty("subheader", bikeTime + " for " + bikeDistance + " kilometers");
					},
					error: function(xhr, status) {
						console.log("ERROR");
					}
				});

			},
			onItemClose: function(oEvent) {
				var oItem = oEvent.getSource(),
					oList = oItem.getParent();

				oList.removeItem(oItem);
				oList.setProperty("visible", false);

			},
			onInit: function() {
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.oRouter.getTarget("Overview").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

				var homeAddress = "Nieuwstraat+101+Brussel";
				var workAddress = "Dendermondsesteenweg+39+Gent";

				var trainUrl =
					"https://maps.googleapis.com/maps/api/directions/json?origin=" + homeAddress + "&destination=" + workAddress +
					"&mode=transit&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";
				var carUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + homeAddress + "&destination=" + workAddress +
					"&mode=driving&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";
				var bikeUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + workAddress + "&destination=" + homeAddress +
					"&mode=bicycling&key=AIzaSyDat0kYBy6-O7ZMedb0Fuxs_snx3kDdqPI";

				//Get train data
				var transitTime;
				var transitDistance;
				var departureTime;
				var arrivalTime;
				var that = this;
				var url;

				$.ajax({
					url: trainUrl,
					type: "GET",
					dataType: "text",
					contentType: "application/json;",
					success: function(data) {
						var transitData = JSON.parse(data);
						transitTime = transitData.routes[0].legs[0].duration.text;
						transitDistance = transitData.routes[0].legs[0].distance.text;
						departureTime = transitData.routes[0].legs[0].departure_time.text;
						arrivalTime = transitData.routes[0].legs[0].arrival_time.text;
						that.getView().byId("idTrainTileContent").setProperty("footer", departureTime + "-" + arrivalTime);
						that.getView().byId("idTrainTile").setProperty("subheader", transitTime + " for " + transitDistance + " kilometers");

					},
					error: function(xhr, status) {
						console.log("ERROR");
					}
				});

				//Get car data
				var carTime;
				var carDistance;
				var thatCar = this;

				$.ajax({
					url: carUrl,
					type: "GET",
					dataType: "text",
					contentType: "application/json;",
					success: function(data) {
						var transitData = JSON.parse(data);
						carTime = transitData.routes[0].legs[0].duration.text;
						carDistance = transitData.routes[0].legs[0].distance.text;

						//that.getView().byId("idCarTileContent").setProperty("footer", departureTime + "-" + arrivalTime);
						that.getView().byId("idCarTile").setProperty("subheader", carTime + " for " + carDistance + " kilometers");
					},
					error: function(xhr, status) {
						console.log("ERROR");
					}
				});

				//Get Bike data
				var bikeTime;
				var bikeDistance;
				var thatBike = this;

				$.ajax({
					url: bikeUrl,
					type: "GET",
					dataType: "text",
					contentType: "application/json;",
					success: function(data) {
						var bikeData = JSON.parse(data);
						bikeTime = bikeData.routes[0].legs[0].duration.text;
						bikeDistance = bikeData.routes[0].legs[0].distance.text;

						//that.getView().byId("idCarTileContent").setProperty("footer", departureTime + "-" + arrivalTime);
						thatBike.getView().byId("idBikeTile").setProperty("subheader", bikeTime + " for " + bikeDistance + " kilometers");
					},
					error: function(xhr, status) {
						console.log("ERROR");
					}
				});

			}
		});
	},
	/* bExport= */
	true);