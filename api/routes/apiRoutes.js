const express = require('express')

let apiRouter = express.Router();

const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : '123456',
        database : 'postgres'
      }
    });

const endpoint = '/'


apiRouter.get(endpoint+'produtos',function(req,res){
    knex.select('*').from('produto')
        .then( produtos => res.status(200).json(produtos) )
        .catch(err => {
        res.status(500).json({
        message: 'Erro ao recuperar produtos - ' + err.message })
        })
})

apiRouter.get(endpoint+'produtos/:id',function(req,res){
    var prodId = req.params['id'] 
    
    knex.where('id', prodId)
    .from('produto')
    .then( resp => {
        if(resp[0]===undefined){
            res.status(404).json("nao encontrado")
        }else{
            res.status(200).json(resp)
        }
        return
    })
    .catch(err => {
    res.status(500).json({
    message: 'Erro ao recuperar produtos - ' + err.message })
    })
     
})

apiRouter.post(endpoint+'produtos',function(req,res){
    if(req.body.id!=undefined){
        res.status(409).json("invalid field: id");
    }else{

        knex('produto').insert(
            {descricao: req.body.descricao,
            valor: req.body.valor,
            marca: req.body.marca},'id'
            ).then(resp => res.status(201).json(resp))
            .catch(err => {
            res.status(500).json({
            message: 'Erro ao inserir produtos - ' + err.message })
            })
    }
 })

 apiRouter.put(endpoint+'produtos/:id',function(req,res){

    var prodId = req.params['id'] 

    knex('produto')
    .where( 'id', prodId )
    .update({ 
        valor: req.body.valor,
        marca: req.body.marca,
        descricao: req.body.descricao
    }, ['id','descricao','valor','marca'])
    .then( resp =>{
        if(resp[0]===undefined){
            res.status(404).json("nao encontrado")
        }else{
            res.status(200).json(resp)
        }
        return   
    }).catch(err => {
    res.status(500).json({
    message: 'Erro ao deletar produtos - ' + err.message })
    }) 
} )

 apiRouter.delete(endpoint+'produtos/:id',function(req,res){

    var prodId = req.params['id'] 
    
    knex('produto')
    .where('id', prodId)
    .del()
    .then( resp => {
        if(resp===0){
            res.status(404).json("nao encontrado")
        }else{
            res.status(200).json("sucesso")
        }
        return   
    })
    .catch(err => {
    res.status(500).json({
    message: 'Erro ao deletar produtos - ' + err.message })
    })
 })


module.exports = apiRouter;

