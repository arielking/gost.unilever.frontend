<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
      :width="width"
      v-if="logueado"
    >

    
      <v-list dense>
        <template v-if="esAdministrador || esAlmacenero || esVendedor">
          <v-list-tile :to="{name:'home'}">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
              Inicio
            </v-list-tile-title>
          </v-list-tile>
        </template>
        <!--MODULO WCM -->


         <template v-if="esAdministrador || esAlmacenero|| esTecnico ||esSupervisor ||esOperador">
          <v-list-group
          prepend-icon="menu"
            >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  WCM
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile >
            <!--INICIO DEL FOR-->
             <v-list-tile  :to="{ name: 'tarjetas'}">
              <v-list-tile-action>
                <v-icon>add_circle</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                 WCM ingresar
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

        <!--FOR IMPLEMENT-->
        <v-list-group
            sub-group
            no-action
          >
          
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>WCM ROJA</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(crud, i) in data_rojo"
              :key="i"
             :to="{name:crud[0]}"
            >
              <v-list-tile-title v-text="crud[1]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[2]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group
            sub-group
            no-action
          >
          
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>WCM AZUL</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(crud, i) in data_rojo"
              :key="i"
             :to="{name:crud[0]}"
            >
              <v-list-tile-title v-text="crud[1]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[2]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group
            sub-group
            no-action
          >
          
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>WCM AMARILLA</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(crud, i) in data_rojo"
              :key="i"
             :to="{name:crud[0]}"
            >
              <v-list-tile-title v-text="crud[1]"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text="crud[2]"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
  
         
        </v-list-group>
        

          <!--CIERRO FOR TARJETAS-->



           
            





           
         

        </template>
         <!--
        <template v-if="esAdministrador || esAlmacenero">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Almacén
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'categorias'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Categorías
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'articulos'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Artículos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
        <template v-if="esAdministrador || esAlmacenero">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Compras
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'ingresos'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Ingresos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'proveedores'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Proveedores
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
        <template v-if="esAdministrador|| esVendedor">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Ventas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: ''}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Ventas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'clientes'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Clientes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Accesos
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'roles'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Roles
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'usuarios'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Usuarios
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        </template>
        <template v-if="esAdministrador">
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Consultas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: ''}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Consultas compras
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: ''}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Consultas ventas
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>
        
        
        
        
        
        
        </template>
-->
       
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      dense
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
      
      v-model="drawer"
      v-if="logueado"
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Sistema Unilever</span>
       
      </v-toolbar-title>
            <v-spacer></v-spacer>

       <v-flex xs2 sm2 md2 lg2 xl2>
      <span  v-html="this.rolsistema"></span>
      </v-flex>
      <v-spacer></v-spacer>
       
      <v-btn @click="salir" v-if="logueado" icon>
        <v-icon>logout</v-icon> Salir
      </v-btn>
      <v-btn :to="{name: 'login'}" v-else>
        <v-icon>apps</v-icon> Login
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
   <!-- <v-footer dark height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              IncanatoIT &copy;2018
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>-->

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
       data_rojo: [
      ['tarjetaroja' ,'Ingresar', 'post_add'],
      ['tarjetarojaatender' ,'Atender', 'assignment'],
      ['tarjetarojarecibir' ,'Recibir', 'assignment_ind'],
      ['tarjetarojacerrar' ,'Cerrar', 'assignment_turned_in'],
      ['tarjetas' ,'Visualizar', 'pageview'],
    ],
    cruds: [
      ['Create', 'add'],
      ['Read', 'insert_drive_file'],
      ['Update', 'update'],
      ['Delete', 'delete']
    ],
      clipped: false,
      drawer: null,
      width:'230',
      fixed: false,
      usuariosistema:'',
      rolsistema:'',
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {

    
    logueado(){
      
      return this.$store.state.usuario;
      
      
    },
    esAdministrador(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Administrador';
    
    },
    esAlmacenero(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Almacenero';
     
    },
    esVendedor(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Vendedor';
     
    },
    esTecnico(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Mantenimiento';

    },
    esOperador(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Operador';
     
    }
    ,
    esSupervisor(){
      return this.$store.state.usuario && this.$store.state.usuario.rol =='Supervisor';
   
    }
    
  },
  created(){
    
    this.$store.dispatch("autoLogin");
    this.credenciales();
  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
      this.usuariosistema='';
      this.rolsistema='';
    },
    credenciales(){
      this.usuariosistema=this.$store.state.usuario.nombre;
      this.rolsistema=this.$store.state.usuario.rol;
    }
  }
}
</script>
