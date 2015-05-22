export default function(route){
  route.get('/apps/:id', function(db, request){
   var id = request.params.id;
    return {
      apps: db.apps.find(id)
    };
  });

  route.get('/apps', function(db){
    return {
      apps: db.apps,
      "app-roles": db['app-roles'],
      roles: db.roles
    };
  });    
}