import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Categoria from './components/Categoria.vue'
import Articulo from './components/Articulo.vue'
import Anomalia from './components/wcm/Anomalia.vue'
import Area from './components/wcm/Area.vue'
import Tarjeta from './components/wcm/Tarjeta.vue'




Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: Categoria
    },
    {
      path: '/articulos',
      name: 'articulos',
      component: Articulo
    },
    // CODIGO DE WCM -->
    {
      path: '/areas',
      name: 'areas',
      component: Area
    },
    {
      path: '/tarjetas',
      name: 'tarjetas',
      component: Tarjeta
    },
    {
      path: '/anomalias',
      name: 'anomalias',
      component: Anomalia
    }
    
  ]
})
