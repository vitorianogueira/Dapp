pragma solidity ^0.4.16;


contract Inclusao {
     
    struct Dados {
        string mensagem;
        string nome;
        string dono;
    }
    
    mapping(uint => Dados[]) dados;
     
    function add(uint id, string _nome, string _dono, string _mensagem) public payable {
        require(bytes(_mensagem).length > 0 && bytes(_nome).length > 0);
        dados[id].push(Dados(_nome, _dono, _mensagem));
        
    }

    function get(uint id) public view returns(string, string, string) {
        uint index;
        return (dados[id][index].nome, dados[id][index].dono, dados[id][index].mensagem);
    }

}