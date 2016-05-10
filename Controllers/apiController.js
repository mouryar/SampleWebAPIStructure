module.exports = function(app){
    app.get('/api/:id',(req,res)=> {
       res.json({firstName:'Mourya', lastname:'Rajala'}); 
    });
    
     app.post('/api/:id',(req,res)=> {
       res.json({message:'success', error:false}); 
    });
    
     app.delete('/api/:id',(req,res)=> {
       res.json({message:'success', error:false});
    });
}