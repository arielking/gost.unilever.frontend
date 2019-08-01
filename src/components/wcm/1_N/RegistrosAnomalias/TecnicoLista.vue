<template>

    
    <v-container fluid grid-list-md>
      <!--NOTIFICACIONES-->
    <v-snackbar
      v-model="snackbar"
      :timeout=this.timeout

      color="success"
    >
    
      {{textsnackbar}}
    </v-snackbar>
      <!--VENTANA CONFIRMACION DE ASIGNACION-->
       <v-dialog v-model="dialogconfirmar" persistent max-width="290">
        <template v-slot:activator="{ on }">
        </template>
        <v-card>
          <v-card-title class="headline" v-text="this.codigo" ></v-card-title>
          <!--<v-card-text>.</v-card-text>-->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="confirmarStado">Confirmar</v-btn>
            <v-btn color="green darken-1" flat @click="dialogconfirmar = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <!--VENTANA DETALLES -->
    <template>
        <v-dialog v-model="dialog" persistent max-width="600px">
       
        <v-card>
          <v-card-title>
            <span class="headline">{{this.codigo}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Nombre :" 
                  v-model="this.nombre_anomalia"
                   required
                   readonly
                   ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>

                  <v-text-field label="Creado por el usuario:" v-model="this.nombre_usuario" readonly></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    label="Fecha de la emision:"
                    
                    persistent-hint
                    v-model="this.emision_ts"
                    required
                    readonly
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <v-text-field  readonly label="Criticidad:" required v-model="this.criticidad"></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md2>
                  <v-text-field readonly label="Paso MA:" v-model="this.paso_ma" required></v-text-field>
                </v-flex>
                 <v-flex xs12 sm4 md2>
                  <v-text-field readonly label="Turno:" v-model="this.turno" required></v-text-field>
                </v-flex>
                  <v-flex xs12 sm6 >
                  <v-text-field readonly label="Area:" v-model="this.area" required></v-text-field>
                </v-flex>
                  <v-flex xs12 sm6 >
                  <v-text-field readonly label="Maquina:" v-model="this.maquina" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 >
                  <v-text-field readonly label="Anomalia:" v-model="this.anomaliac" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 >
                  <v-text-field readonly label="Relacionada con:" v-model="this.relacionado" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field  readonly label="Descripcion :" v-model="this.descripcion" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Cerrar</v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
       <v-toolbar flat color="white">
                <v-toolbar-title>Reportes</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center"  v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                   
                   
                </v-toolbar>
                <v-divider ></v-divider>
      <v-data-iterator
        :items="itemsdata"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
        <template v-slot:item="props">
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
              <v-card>
          <v-img
            class="white--text"
            height="200px"
            src="https://www.lostiempos.com/sites/default/files/media_imagen/2019/4/5/756785e2-6ea8-430e-a479-24a7d6d74b74.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="subheading font-weight-bold">A</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
               <v-list-tile-content>
                  <v-list-tile-title >
                      <span class="subheading font-weight-bold" >{{props.item.codigo}}</span>
                  </v-list-tile-title>
                  <v-list-tile-sub-title v-html="props.item.nombre"></v-list-tile-sub-title>
                </v-list-tile-content>
              
              
             <v-flex xs12 sm12 md12>
            <v-list two-line>
            <template >
              <v-divider ></v-divider>
              <v-list-tile >
                <v-list-tile-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="props.item.usuario"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="props.item.area"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html="props.item.maquina"></v-list-tile-sub-title>
                   
                </v-list-tile-content>
                
              </v-list-tile>
              <v-divider ></v-divider>
                   <div text-truncate >Fecha emision: {{props.item.emision_ts}}</div>
                    <div text-truncate >Tecnico : {{props.item.usuariotecnico}}</div>
            </template>
          </v-list>
          </v-flex >
              
                
            
          </v-card-title>
          <v-card-actions>
            <v-btn  color="green"
            @click="editItemConfirmar(props.item)"
            >Asignarme</v-btn>
            <v-btn outline color="blue"
                @click="editItem(props.item)"
            >Detalles</v-btn>
          </v-card-actions>
        </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
 
</template>
  


<script>
    import axios from 'axios'
import { all } from 'q';
    export default {
        data(){
            return {
        dialog: false,
        show:false,
        search:'',       
        rowsPerPageItems: [4, 8, 12,50],
        pagination: {
        rowsPerPage: 4
        },
        
        itemsdata:[],
        // variables
        codigo:'',
        idanomalia:'',
        nombre_anomalia:'',
        emision_ts:'',
        id_usuario:'',
        nombre_usuario:'',
        maquina:'',
        anomaliac:'',
        relacionado:'',
        tarjeta:'',
        descripcion:'',
        paso_ma:'',
        criticidad:'',
        turno:'',
        area:'',
        relacionado:'',
        dialogconfirmar:false,
        snackbar:false,
        textsnackbar:'',
        timeout:2000,

        items: [
        {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
        },
        {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
        },
        {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
        },
        {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
                    }
                ]
            }
            },
            created () {
                this.listar();
                
            },
            methods:{
                 editItem (item) {
                this.idmaquina=item.idmaquina;
                this.codigo=item.codigo;
                this.idanomalia=item.idregistroanomalia;
                this.nombre_anomalia=item.nombre;
                this.emision_ts=item.emision_ts;
                this.id_usuario=item.id_usuario;
                this.nombre_usuario=item.usuario,
                this.maquina=item.maquina;
                this.anomaliac=item.anomaliac;
                this.relacionado=item.relacionado;
                this.tarjeta=item.tarjeta;
                this.descripcion=item.descripcion;
                this.paso_ma=item.paso_ma;
                this.criticidad=item.criticidad;
                this.turno=item.turno;
                this.area=item.area;
                this.relacionado=item.relacionado;


                //this.editedIndex=1;
                this.dialog = true
            },
                listar(){
                    let me=this;
                    axios.get('api/RegistrosAnomalias/SelectListaTecnico/'+me.$store.state.usuario.idusuario).then(function(response){
                        //console.log(response);
                        me.itemsdata=response.data;
                    }).catch(function(error){
                        console.log(error);
                        
                });
            },
             confirmarStado () {
              
               
                    let me=this;
                    axios.put('api/RegistrosAnomalias/AsignarTecnico',{
                        'idregistroanomalia':me.idanomalia,
                        'idtecnico': me.$store.state.usuario.idusuario
                        
                    }).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();  
                                          
                    }).catch(function(error){
                        console.log(error);
                      
                    });    
                
            },
            limpiar(){
               this.idmaquina=0,
                this.codigo='',
                this.idanomalia=0,
                this.nombre_anomalia='',
                this.emision_ts='',
                this.id_usuario=0,
                this.nombre_usuario='',
                this.maquina='',
                this.anomaliac='',
                this.relacionado='',
                this.tarjeta='',
                this.descripcion='',
                this.paso_ma='',
                this.criticidad='',
                this.turno='',
                this.area='',
                this.relacionado=''
            },
            close(){
              this.dialogconfirmar=false
              this.snackbar=true
              this.textsnackbar='Operacion exitosa'
            },
            error(){
              this.dialogconfirmar=false
              this.snackbar=true
              this.textsnackbar='Operacion erronea'
            },
            abrirventanaconfirmar(){
             
              this.confirmar=true
               
            },
            
             editItemConfirmar (item) {
                
                this.idanomalia=item.idregistroanomalia;
                //this.editedIndex=1;
                this.codigo=item.codigo;
                this.dialogconfirmar = true;
            }
        }        
    }
</script>
