if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/14a9ebf1a2a84cd6b2e5b3b9f7f5edb1"));

}
if (web3.isConnected()) {
    console.log("Conectado");
} else {
    console.log("Não conectado")
}

var account = web3.eth.accounts;
var accountInterval = setInterval(function() {
  if (web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts;
  }
});

var address = $('#conta').val(web3.eth.accounts);

var inclusaoContract = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "_mensagem", "type": "string" }, { "name": "_nome", "type": "string" }, { "name": "_dono", "type": "string" }], "name": "add", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "id", "type": "uint256" }], "name": "get", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }]);

var inclusao = inclusaoContract.at('0xa17a77f7237a51d396d6c47ae00a9b6491cde94e');

web3.eth.defaultAccount = web3.eth.accounts[0];

$("#btn_enviar").click(function () {
    inclusao.add($("#id").val(), $("#nome").val(), $("#conta").val(), $("#mensagem").val(),
        {
            from: address,
            gas: 3000000,
            to: "0xa17a77f7237a51d396d6c47ae00a9b6491cde94e"
        }, function (err, transactionHash) {
            if (err)
                console.log("erro");
            else
                $("#hash").val(transactionHash);
                
        });
        
});
$("#btn_limpar").click(function() {
    $("#id").val('');
    $("#nome").val('');
    $("#mensagem").val('');
    $("#hash").val('');
    
  });
