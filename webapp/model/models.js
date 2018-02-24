sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	], function (JSONModel, Device) {
		"use strict";

		return {
			createDeviceModel : function () {
				var oModel = new JSONModel(Device);
				oModel.setDefaultBindingMode("OneWay");
				return oModel;
			},

			createFLPModel : function () {
				var fnGetuser = jQuery.sap.getObject("sap.ushell.Container.getUser"),
					bIsShareInJamActive = fnGetuser ? fnGetuser().isJamActive() : false,
					oModel = new JSONModel({
						isShareInJamActive: bIsShareInJamActive
					});
				oModel.setDefaultBindingMode("OneWay");
				return oModel;
			},

			createSettingsModel : function () {
				var oModel = new JSONModel();
					oModel.setData({
						"carActive" : false,
						"busActive" : false,
						"bikeActive" : true,
						"trainActive" : false,
						"tramActive" : false,
						"commuteActive" : false
					});
				oModel.setDefaultBindingMode("TwoWay");
				return oModel;
			}
		};

	}
);