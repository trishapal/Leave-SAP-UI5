sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel ) {
	"use strict";

	return Controller.extend("Leav.controller.table", {
        onInit: function () {  
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);        
                oRouter.getRoute("employee")
               .attachMatched(this._onRouteMatched, this);  
               var testData = [];
                var oModel = new sap.ui.model.json.JSONModel({
                data: testData
                });
                this.getView().setModel(oModel);
           },

              _onRouteMatched: function() {
               //var itemRow= oEvent.getParameter("arguments");
               //console.log(itemRow)

               var oModel=this.getView().byId("emp").getModel("itemData");
               var itemRow=this.getView().byId("emp").getModel("itemData").oData;
               var itemData=this.getView().byId("emp").getModel().getProperty("/data");
               console.log(oModel);
               if(typeof itemData!==undefined && itemData!=null && itemData.length>0){
                   itemData.push(itemRow)
               } else{
                  itemData=[];
                   itemData.push(itemRow)
               }
               
               this.getView().byId("emp").getModel().setData({
                   data: itemData
               })   
                    },
    })
})