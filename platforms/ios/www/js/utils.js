'use strict'
/*
 global cordova
 */
var Ethereum = Ethereum || {};
Ethereum.Utils = function(){
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });
};