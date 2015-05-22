export default function(route){
  route.get('/appRoles', function(db, request){
    var appId = request.queryParams.appId;
    var appRoles = db['app-roles'].where({app:appId});
    var roleIds = appRoles.mapBy('role');
    var roles = db.roles.find(roleIds);
    return {
      "roles": roles,
      "app-roles": appRoles
    };
  });

}