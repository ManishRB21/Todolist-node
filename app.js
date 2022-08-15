const express= require('express');
const bodyParesr= require('body-parser');
const date= require(__dirname+'/date.js');

const app= express();

let items= ['buy', 'cook','eat'];
let workitems=[];

app.set('view engine', 'ejs');

app.use(bodyParesr.urlencoded({extended:true}));
app.use(express.static('public'));
app.get('/', function(req,res){
  
    let day =date();

        res.render('list', {
            listtitle: day,
            newlistitems: items
        });
   
}); 

app.post('/', function(req,res){
    let item = req.body.newitem;
    if(req.body.list === 'work'){
        workitems.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect('/');
    }
    

});

app.get('/work', function(req,res){
    res.render('list', {
        listtitle: 'work list',
        newlistitems: workitems
    });
});

app.get('/about', function(req,res){
    res.render('about');
});

app.post('/work', function(req,res){
    let item= req.body.newitem;
    workitems.push(item);
    res.redirect('/work');
});


app.listen(3000, function(){
    console.log('serverhosted');
});