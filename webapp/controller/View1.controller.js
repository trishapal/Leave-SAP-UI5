// sap.ui.define([
// 	"sap/ui/core/mvc/Controller"
// ],
// 	/**
// 	 * @param {typeof sap.ui.core.mvc.Controller} Controller
// 	 */
// 	function (Controller) {
// 		"use strict";

// 		return Controller.extend("Leav.controller.View1", {
// 			onInit: function () {

// 			}
// 		});
// 	});

sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
], function (Controller, JSONModel, MessageBox ) {
	"use strict";

	return Controller.extend("Leav.controller.View1", {

        onInit: function(){
            // this.employee={
            //     name:"Trisha",
            //     email:"Pal",
            //     startdate:null,
            //     enddate:null,
            // },
            // this.data={
            //     employee:[],
            //     employees: this.employee
            // }
            // var oModel = new JSONModel(this.employee);
            // console.log(oModel);
            // this.getView().setModel(oModel);
            var testData = [];
            var oModel = new sap.ui.model.json.JSONModel({
            data: testData
            });
            this.getView().setModel(oModel);
        },
        onAfterRendering:function(){
            
        },
         validateEmail: function(email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        validateName: function(name){
            const reg = /^[A-Za-z]+$/;
            return reg.test(name);
        },
		onPress : function () {
            // display the "notFound" target without changing the hash
            // var oViewData = this.getView().getData();
            // console.log(oViewData);

            var name=this.getView().byId("firstname").getValue();
            var email=this.getView().byId("email").getValue();
            var startDate = this.getView().byId("start").getValue();
            var endDate = this.getView().byId("end").getValue();
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            // var yyyy = today.getFullYear();
            console.log(startDate)
            if(name == ""){
                MessageBox.alert("Name cannot be blank");
            }
            else if (email ==""){
                 MessageBox.alert("Email Address cannot be blank");
            }
            else if (startDate == ""){
                 MessageBox.alert("Start Date cannot be blank");
            }
            else if(endDate ==""){
                MessageBox.alert("End Date cannot be blank");
            }
            else if(this.validateEmail(email)==false){
                 MessageBox.alert("Email ID is not valid");
            }
            else if(this.validateName(name)==false){
                MessageBox.alert("Name cannot contain digits");
            }
            else{
                var itemRow={
                    name: name,
                    email:email,
                    startDate: startDate,
                    endDate: endDate
                };
               var oModel=this.getView().byId("emp").getModel();
               var itemData=oModel.getProperty("/data");
               if(typeof itemData!==undefined && itemData!=null && itemData.length>0){
                   itemData.push(itemRow)
               } else{
                   itemData=[];
                   itemData.push(itemRow)
               }
               oModel.setData({
                   data:itemData
               })   

            //    this.getView().byId("name").setValue("");
            //    this.getView().byId("email").setValue("");
            //    this.getView().byId("start").setValue("");
            //    this.getView().byId("end").setValue("");
            //console.log(itemRow)
               var ooModel = new sap.ui.model.json.JSONModel(itemRow);
                this.getOwnerComponent().setModel(ooModel, "itemData");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("employee");
                // this.oRouter = this.getOwnerComponent().getRouter();
                // this.oRouter.navTo("employee", itemRow);
            }
		
		}

	});

});
