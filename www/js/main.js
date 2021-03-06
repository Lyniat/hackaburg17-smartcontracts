'use strict'
var Ethereum = Ethereum || {};
Ethereum.Config = {};
Ethereum.Config.SERVER_ADRESS = 'http://172.18.1.218';//'http://server.nopunkgames.space';
Ethereum.Main = function() {
    var that = {},
        qrModule,
        webInterface,
        contracts,
        ID;

    const SCAN_BUTTON = '#scan-qr-partner-button';
    const SHOW_BUTTON = '#toggle-qr-button';

    function init() {
        qrModule = new Ethereum.QRModule();
        webInterface = new Ethereum.Webinterface();
        contracts = new Ethereum.Contracts(webInterface);
        getContracts();
        Ethereum.Utils.loadSite('main-index.html');
    }

    function scanQR() {
        qrModule.scanQR();
    }

    function createQR(value) {
        qrModule.createQR(value);
    }

    function getContracts(){
        ID = window.localStorage.getItem('id');
        if(!ID){
            return;
        }
        webInterface.getContracts(ID,onContracts);
    }

    function onContracts(contracts){
        var contractID = contracts[0];
        getContractByID(contractID);
        console.log(contracts);
    }

    function test() {
        webInterface.saveContractToServer();
    }

    function getContractByID(id){
        webInterface.getContractByID(id,onGetContractByID);
    }

    function getUniqueID(idImage) {
        var value = window.localStorage.getItem('id');
        if (!value) { //no id local stored
            Materialize.toast('Fetching unique ID', 3000);
            webInterface.getUniqueID(idImage,onGetID);
        } else {
            Materialize.toast('Loaded ID', 3000);
            createQR(value);
        }
    }

    function onGetContractByID(contract){
        var owner = contract.owner;
        var partner = contract.partner;
        var text = contract.text;
        $('#contract-date')[0].innerHTML = '' +owner + ' and ' + partner;
    }

    function uploadIDImage(id){
        var uploader = new Ethereum.FileUploader();
        uploader.getFile(id,getUniqueID);
    }

    function onGetID(id) {
        ID = id;
        Materialize.toast('Fetching ID success!', 3000);
        createQR(id);
        window.localStorage.setItem('id', id);
        console.log(id);
    }

    function resetListeners() {
        //addListeners();
    }

    init();
    that.getContractByID = getContractByID;
    that.uploadIDImage = uploadIDImage;
    that.getUniqueID = getUniqueID;
    that.resetListeners = resetListeners;
    return that;
};
