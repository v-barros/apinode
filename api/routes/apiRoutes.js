const express = require('express')

let apiRouter = express.Router();

const endpoint = '/'

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  }
    ]
}

apiRouter.get(endpoint+'produtos',function(req,res){
    res.status(200).json(lista_produtos)
})

apiRouter.get(endpoint+'produtos/:id',function(req,res){
    var prodId = req.params['id'] 
    var check = lista_produtos.produtos.find(prod=>prod.id==prodId)

    if(check==undefined){
        res.status(404).json("produto nao existe");
    }else{
        res.status(200).json(check);
    }
})

apiRouter.post(endpoint+'produtos',function(req,res){
    if(req.body.id!=undefined){
        res.status(409).json("invalid field: id");
    }else{
        const aux = lista_produtos.produtos.findLast((prod) => prod.id !=undefined);
        req.body.id=aux.id+1;
        console.log(aux);
        lista_produtos.produtos.push(req.body);
        res.status(201).json(req.body);
    }
 })

 apiRouter.put(endpoint+'produtos/:id',function(req,res){

    var prodId = req.params['id'] 

    var check = lista_produtos.produtos.find(prod=>prod.id==prodId)
    if(check==undefined){
        res.status(404).json("produto nao existe");
    }else{
        check.descricao=req.body.descricao;
        check.marca=req.body.marca;
        check.valor=req.body.valor;

        res.status(200).json(check);
    }
 })

 function getById(arr, value) {
    for (var i=0, iLen=arr.length; i<iLen; i++) {
      if (arr[i].id == value) return i;
    }
    return undefined;
  }

 apiRouter.delete(endpoint+'produtos/:id',function(req,res){

    var prodId = req.params['id'] 
    var check = getById(lista_produtos.produtos,prodId)

    if(check==undefined){
         res.status(404).json("produto nao existe");
    }else{
        removed = lista_produtos.produtos.splice(check, 1);
    
        res.status(200).json(prodId);
    }
 })


module.exports = apiRouter;

