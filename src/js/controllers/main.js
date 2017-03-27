angular
  .module('runApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;
  // rootscope is listening - it will pick up any 'error'
  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    console.log(e, err);
    vm.message = err.data.message; // this is the message from the server
    if(err.status === 401) $state.go('login'); // redirect to login.
  });

  $rootScope.$on('stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
  });

  function logout() {
    //console.log('Logout');
    $auth.logout();
    $state.go('login'); // redirect to login page
  }

  vm.logout = logout;
}