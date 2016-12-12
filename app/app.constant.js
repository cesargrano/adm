app.constant('APP_DATA', {
    serverPath: 'http://192.168.1.14:8080/SedeWS/rest/result/',
    //serverPath: 'http://209.54.57.124/SedeWS/rest/result/',
    prefix: 10000,
    appName: 'adm'
    
});
app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated'/*,
    notAuthorized: 'auth-not-authorized'*/
});
app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
});
app.constant('TRANSACTION_TYPE', {
    read : 1,
    update : 2,
    insert : 3,
    delete : 4,
    restore : 5
});
