export default function(route){
  route.post('/auth/login', function(db){
    return db.users.find("1");
  });

  route.get('/auth/user', function(db){
    return db.users.find("1");
  });    

  route.get('/auth/signout', function(){
    return {};
  });  
}