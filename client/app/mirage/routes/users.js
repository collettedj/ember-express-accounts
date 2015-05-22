export default function(route){
  route.get('/users/:id', function(db, request){
   var id = request.params.id;
    return {
      users: db.users.find(id)
    };
  });

  route.get('/users', function(db){
    return {
      users: db.users
    };
  });  

  route.delete('/users/:id', function(db, request){
  	var id = request.params.id;
  	db.users.remove(id);
  });
}