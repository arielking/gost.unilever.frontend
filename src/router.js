import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Categoria from './components/Categoria.vue'
import Articulo from './components/Articulo.vue'
import Rol from './components/GestionUsuarios/Rol.vue'
import Usuario from './components/GestionUsuarios/Usuario.vue'
import Cliente from './components/Cliente.vue'
import Proveedor from './components/Proveedor.vue'
import Login from './components/Login.vue'
import Ingreso from './components/Ingreso.vue'

import RegistroAnomalia from './components/wcm/1_N/RegistroAnomalia.vue'
import Tecnico from './components/wcm/1_N/RegistrosAnomalias/Tecnico.vue'
import TecnicoLista from './components/wcm/1_N/RegistrosAnomalias/TecnicoLista.vue'
import TecnicoListaPropia from './components/wcm/1_N/RegistrosAnomalias/TecnicoListaPropio.vue'
import TecnicoListaPropiaConfirmado from './components/wcm/1_N/RegistrosAnomalias/TecnicoListaEsperaconfirmacion.vue'
import SupervisorLista from './components/wcm/1_N/RegistrosAnomalias/SupervisorLista.vue'
import SheLista from './components/wcm/1_N/RegistrosShe/ListaShe.vue'



import store from './store'


Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta :{
        administrador :true,
        almacenero: true,
        vendedor: true,
        mantenimiento:true,
        operador:true,
        supervisor:true
      }
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: Categoria,
      meta :{
        administrador :true,
        almacenero: true
      },
      
    },
    {
      path: '/articulos',
      name: 'articulos',
      component: Articulo,
      meta :{
        administrador :true,
        almacenero: true
      }
    },
    {
      path: '/roles',
      name: 'roles',
      component: Rol,
      meta :{
        administrador :true
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Usuario,
      meta :{
        administrador :true
      }
    },
    {
      path: '/ingresos',
      name: 'ingresos',
      component: Ingreso,
      meta :{
        administrador :true,
        almacenero: true
      }
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: Cliente,
      meta :{
        administrador :true,
        vendedor: true
      }
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: Proveedor,
      meta :{
        administrador :true,
        almacenero: true
      }
    },
    {
      path: '/registroanomalia',
      name: 'registroanomalia',
      component: RegistroAnomalia,
      meta :{
        administrador :true,
        almacenero: true
      }
    },
    {
      path: '/tecnico',
      name: 'tecnico',
      component: Tecnico,
      meta :{
        administrador :true,
        almacenero: true,
        mantenimiento:true,
        operador:true
      }
    },
    {
      path: '/tecnicoLista',
      name: 'tecnicoLista',
      component: TecnicoLista,
      meta :{
        administrador :true,
        almacenero: true,
        mantenimiento:true,
        operador:true
      }
    },
    {
      path: '/tecnicoListaPropia',
      name: 'tecnicoListaPropia',
      component: TecnicoListaPropia,
      meta :{
        administrador :true,
        almacenero: true,
        mantenimiento:true,
        operador:true
      }
    },
    {
      path: '/tecnicoListaPropiaConfirmado',
      name: 'tecnicoListaPropiaConfirmado',
      component: TecnicoListaPropiaConfirmado,
      meta :{
        administrador :true,
        almacenero: true,
        mantenimiento:true,
        operador:true
      }
    },
    {
      path: '/supervisorLista',
      name: 'supervisorLista',
      component: SupervisorLista,
      meta :{
        administrador :true,
        almacenero: true,
        mantenimiento:true,
        operador:true,
        supervisor:true
      }
    },
    {
      path: '/SheLista',
      name: 'SheLista',
      component: SheLista,
      meta :{
        administrador :true,
        mantenimiento:true,
        operador:true,
        supervisor:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta : {
        libre: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.libre)){
    next()
  } else if (store.state.usuario && store.state.usuario.rol== 'Administrador'){
    if (to.matched.some(record => record.meta.administrador)){
      next()
    }
  }else if (store.state.usuario && store.state.usuario.rol== 'Almacenero'){
    if (to.matched.some(record => record.meta.almacenero)){
      next()
    }
  }else if (store.state.usuario && store.state.usuario.rol== 'Vendedor'){
    if (to.matched.some(record => record.meta.vendedor)){
      next()
    }
  }else if (store.state.usuario && store.state.usuario.rol== 'Mantenimiento'){
    if (to.matched.some(record => record.meta.mantenimiento)){
      next()
    }
  }else if (store.state.usuario && store.state.usuario.rol== 'Operador'){
    if (to.matched.some(record => record.meta.operador)){
      next()
    }
  }else if (store.state.usuario && store.state.usuario.rol== 'Supervisor'){
    if (to.matched.some(record => record.meta.supervisor)){
      next()
    }
    
    
    
  } else{
    next({
      name: 'login'
    })
  }
})

export default router
