let express=require('express');
let knex=require('knex');

let app=express();

app.get('/api/genres/:id', function(request, response){
    let id=request.params.id;
    console.log(id);

    let connection = knex({
        client: 'sqlite3',
        connection:{
            filename:'chinook.db'
        }
    });

    connection
    .select()
    .from('genres')
    .where('GenreId', id)
    .first()
    .then((genre) => {
        if(genre){
            response.json(genre);
        } else {
            response.status(404).json({
                error: `genre ${id} not found`
            });
        }
    });
});



// app.get('/api/genres/:id',function(request, response){
//     let id=request.params.id;
    
//     let conneciton=knex({
//         client:'sqlite3',
//         connection: {
//             filename:'chinook.db'
//         }
//     });
    
//     connection
//         .select()
//         .from('genres')
//         .where('GenreId',id)
//         .first()
//         .then((genres)=>{
//             if(genre){
//                 response.json(genres);
//             } else{
//                 response.status(404).json({
//                     error: `Genre ${id} not found`
//                 });
//             }
//         });
//     });

app.listen(8000);