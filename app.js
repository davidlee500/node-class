let express=require('express');
let knex=require('knex');

let app=express();

app.get('/api/genres', function(request, response){
    let connection = knex({
        client: 'sqlite3',
        connection:{
            filename:'chinook.db'
        }
    });

    connection
    .select()
    .from('genres')
    .then((genre) => {
        response.json(genre);
    });
});

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

app.get('/api/artists', function(request, response){
    let name=request.query.filter;
    console.log(name);

    let connection = knex({
        client: 'sqlite3',
        connection:{
            filename:'chinook.db'
        }
    });

    if(name){
        connection
        .select('ArtistId as id','Name as name')
        .from('artists')
        .where('name','like', name)
        .first()
        .then((artist) => {
            if(artist){
                response.json(artist);
            } else {
                response.status(404).json({
                    error: `${name} not found`
                });
            }
        });
    } else {
        connection
        .select('ArtistId as id','Name as name')
        .from('artists')
        .then((artist) => {
            response.json(artist);
        });
    }
    
});

// app.get('/api/artists?filter=:id', function(request,response){
//     let name=request.query.filter;
//     console.log(name);

//     let connection = knex({
//         client: 'sqlite3',
//         connection:{
//             filename:'chinook.db'
//         }
//     });

//     connection
//     .select('ArtistId as id','Name as name')
//     .from('artists')
//     .where('name','like', name)
//     .first()
//     .then((artist) => {
//         if(artist){
//             response.json(artist);
//         } else {
//             response.status(404).json({
//                 error: `${name} not found`
//             });
//         }
//     });
// });
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

app.listen(process.env.PORT||8000);