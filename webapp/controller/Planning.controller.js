sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History",
	"../util/formatter"
], function(BaseController, MessageBox, Utilities, History, Formatter) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.hackathon2018.controller.Planning", {
		formatter: Formatter,
		handleRouteMatched: function(oEvent) {
			debugger;
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
		
				_onSegmentedButtonItemPress1: function() {

    			sap.m.MessageToast.show('Submitted'); // default disappear in 3 sec
		},
		_onPageNavButtonPress: function(oEvent) {
			var oBindingContext = oEvent.getSource().getBindingContext();
			return new Promise(function(fnResolve) {
				this.doNavigate("Page1", oBindingContext, fnResolve, "");
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
				sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
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
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Planning").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			this.getView().setBusy(true);
			var that = this;
			this.getView().byId('timeline').onAfterRendering = function(){
				 if (sap.suite.ui.commons.Timeline.prototype.onAfterRendering) {
		          sap.suite.ui.commons.Timeline.prototype.onAfterRendering.apply(this, arguments);
		        }
				that.getView().setBusy(false);
			};
		}
	});
}, /* bExport= */ true);