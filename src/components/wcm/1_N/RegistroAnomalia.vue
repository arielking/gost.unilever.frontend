<template>
    <v-layout align-start>
       
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Tarjetas</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field v-if="verNuevo==0" class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn v-if="verNuevo==0" @click="mostrarNuevo"   color="primary" dark class="mb-2">Nuevo</v-btn>
                   
                   <!-- DIALOG BUSCAR MAQUINA-->
                    <v-dialog v-model="verMaquinas" max-width="500">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Seleccione una Maquina</span>
                                <v-flex xs12 sm1 md1 lg1 xl2>
                                    <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                     <v-btn @click="listarMaquinas()" small fab dark color="teal" v-on="on">
                                        <v-icon dark>cached</v-icon>
                                    </v-btn>
                                    </template>
                                    <span>Actualizar lista maquinas</span>

                                    
                                    </v-tooltip>
                                </v-flex>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                           <template>
                                          
                                                <v-spacer></v-spacer>
                                                <v-text-field
                                                    v-model="buscarmaquina"
                                                    append-icon="search"
                                                    label="Search"
                                                    single-line
                                                    hide-details
                                                ></v-text-field>
                                                <v-data-table
                                                :headers="cabeceraMaquinas"
                                                :items="maquinas"
                                                :search="buscarmaquina"
                                                >
                                                <template slot="items" slot-scope="props">
                                                        <td class="justify-center layout px-0">
                                                            <v-icon
                                                            medium
                                                            class="mr-2"
                                                            @click="agregarMaquina(props.item) "
                                                            >
                                                            add_circle
                                                            </v-icon>
                                                           
                                                        </td>
                                                        <td>{{ props.item.nombre }}</td>
                                                        <td>{{props.item.area}}</td>
                                                        
                                                    </template>
                                                    
                                                    <template slot="no-data">
                                                        <h3>No hay maquinas para mostrar.</h3>
                                                    </template>
                                                
                                                </v-data-table>
                                            
                                            </template>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="ocultarMaquinas()" color="blue darken" flat>
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                     <!-- DIALOG BUSCAR SUCESSO-->
                    <v-dialog v-model="verSucesos" max-width="500">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Relacionada con :</span>
                                <v-flex xs12 sm1 md1 lg1 xl2>
                                    <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                     <v-btn @click="listarSuceso()" small fab dark color="teal" v-on="on">
                                        <v-icon dark>cached</v-icon>
                                    </v-btn>
                                    </template>
                                    <span>Actualizar lista Relacion</span>
                                    </v-tooltip>
                                </v-flex>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                           <template>
                                          
                                                <v-spacer></v-spacer>
                                                <v-text-field
                                                    v-model="buscarsuceso"
                                                    append-icon="search"
                                                    label="Search"
                                                    single-line
                                                    hide-details
                                                ></v-text-field>
                                                <v-data-table
                                                :headers="cabeceraSuceso"
                                                :items="sucesosdata"
                                                :search="buscarsuceso"
                                                >
                                                <template slot="items" slot-scope="props">
                                                        <td class="justify-center layout px-0">
                                                            <v-icon
                                                            medium
                                                            class="mr-2"
                                                            @click="agregarSuceso(props.item) "
                                                            >
                                                            add_circle
                                                            </v-icon>
                                                           
                                                        </td>
                                                        <td>{{ props.item.nombre }}</td>
                                                       
                                                        
                                                    </template>
                                                    
                                                    <template slot="no-data">
                                                        <h3>No hay sucesos para mostrar.</h3>
                                                    </template>
                                                
                                                </v-data-table>
                                            
                                            </template>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="ocultarSuceso()" color="blue darken" flat>
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- DIALOG ANOMALIAS-->
                    <v-dialog v-model="verAnomalias" max-width="500">
                        <v-card>
                            <v-card-title>
                                <span class="headline">Seleccione una Anomalia</span>

                                <v-flex xs12 sm1 md1 lg1 xl2>
                                    <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                     <v-btn @click="listarAnomalia()" small fab dark color="teal" v-on="on">
                                        <v-icon dark>cached</v-icon>
                                    </v-btn>
                                    </template>
                                    <span>Actualizar lista anomalias</span>

                                    
                                    </v-tooltip>
                                </v-flex>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12 lg12 xl12>
                                           <template>
                                          
                                                <v-spacer></v-spacer>
                                                <v-text-field
                                                    v-model="buscaranomalia"
                                                    append-icon="search"
                                                    label="Search"
                                                    single-line
                                                    hide-details
                                                ></v-text-field>
                                                <v-data-table
                                                :headers="cabeceraAnomalias"
                                                :items="anomaliasdata"
                                                :search="buscaranomalia"
                                                >
                                                <template slot="items" slot-scope="props">
                                                        <td class="justify-center layout px-0">
                                                            <v-icon
                                                            medium
                                                            class="mr-2"
                                                            @click="agregarAnomalia(props.item)"
                                                            >
                                                            add_circle
                                                            </v-icon>
                                                        </td>
                                                        <td>{{ props.item.nombre }}</td>
                                                         <td>{{ props.item.descripcion }}</td>
                                                        
                                                        
                                                    </template>
                                                    <template slot="no-data">
                                                        <h3>No hay anomalias para mostrar.</h3>
                                                    </template>
                                                
                                                </v-data-table>
                                            
                                            </template>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="ocultarAnomalia()" color="blue darken" flat>
                                    Cancelar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                   
                    </v-dialog>
                    <!--FORM TABLE-->
                    <v-dialog v-model="adModal" max-width="290">
                        <v-card>
                            <v-card-title class="headline" v-if="adAccion==1">¿Activar Item?</v-card-title>
                            <v-card-title class="headline" v-if="adAccion==2">¿Desactivar Item?</v-card-title>
                            <v-card-text>
                                Estás a punto de 
                                <span v-if="adAccion==1">Activar </span>
                                <span v-if="adAccion==2">Desactivar </span>
                                el ítem {{ adNombre }}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click="activarDesactivarCerrar">
                                    Cancelar
                                </v-btn>
                                <v-btn v-if="adAccion==1" color="orange darken-4" flat="flat" @click="activar">
                                    Activar
                                </v-btn>
                                <v-btn v-if="adAccion==2" color="orange darken-4" flat="flat" @click="desactivar">
                                    Desactivar
                                </v-btn>
                            </v-card-actions>

                        </v-card>
                    </v-dialog>
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="anomalias"
                :search="search"
                class="elevation-1"
                v-if="verNuevo==0"
            >
                <template slot="items" slot-scope="props">
                    <td class="justify-center layout px-0">
                        <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                        >
                        edit
                        </v-icon>
                        <template v-if="props.item.estado=='Aceptado'">
                            <v-icon
                            small
                            @click="activarDesactivarMostrar(2,props.item)"
                            >
                            block
                            </v-icon>
                        </template>
                        <template v-else>
                            <v-icon
                            small
                            @click="activarDesactivarMostrar(1,props.item)"
                            >
                            check
                            </v-icon>
                        </template>
                    </td>
                    <td>{{ props.item.codigo }}</td>
                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.emision_ts}}</td>
                    <td>{{ props.item.usuario }}</td>
                    <td>{{ props.item.area }}</td>
                    <td>{{ props.item.maquina }}</td>
                    <td>{{ props.item.tarjeta }}</td>
                  
                    <td>
                        <div v-if="props.item.estado=='Aceptado'">
                            <span class="blue--text">Aceptado</span>
                        </div>
                        <div v-else>
                            <span class="red--text">{{props.item.estado}}</span>
                        </div>
                    </td>
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
            <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
                <v-layout row wrap>
                     
                     <!--Atributos del fomulario-->
                     <v-flex xs12 sm3 md3 lg3 xl4>
                        <v-text-field v-model="tarjetanombre" label="Nombre" required>
                        </v-text-field>
                    </v-flex>
                    <v-flex  xs12 sm3 md3 lg3 xl2>
                            <v-menu
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                full-width
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="tarjetafecha"
                                    label="Fecha"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="tarjetafecha" @input="menu2 = false"></v-date-picker>
                            </v-menu>
                    </v-flex>
                     <v-flex xs12 sm3 md3 lg3 xl2>
                        <v-overflow-btn
                            class="my-0"
                            :items="pasoma"
                            label="Paso MA"
                            v-model="tarjetapasoma"
                          
                        ></v-overflow-btn>
                      
                    </v-flex>
                    <v-flex xs12 sm3 md3 lg3 xl2>
                       <v-select v-model="idarea"
                       
                        :items="areas" label="Area">
                        </v-select>
                    </v-flex>    
                    <v-flex xs12 sm4 md4 lg4 xl4>
                       <v-radio-group v-model="tarjetacriticidad" row label ="Criticidad"  :mandatory="false">
                        <v-radio label="A" value="A"></v-radio>
                        <v-radio label="B" value="B"></v-radio>
                        <v-radio label="C" value="C"></v-radio>
                        </v-radio-group>  
                    </v-flex>
                  
                   <!--TURNO-->
                    <v-flex xs12 sm4 md4 lg4 xl4>
                        <v-radio-group v-model="tarjetaturno" row label ="Turno"  :mandatory="false">
                        <v-radio label="T1" value="T1"></v-radio>
                        <v-radio label="T2" value="T2"></v-radio>
                        <v-radio label="T3" value="T3"></v-radio>
                        </v-radio-group>
                    </v-flex>
                     
                     <v-flex xs12 sm3 md3 lg3 xl2>
                    </v-flex>
                     <v-flex xs12 sm3 md3 lg3 xl2>
                        <v-text-field  v-model="nombremaquina" label="Maquina">
                        </v-text-field>
                    </v-flex>
                     <v-flex xs12 sm1 md1 lg1 xl2>
                        <v-btn @click="mostrarMaquinas()" small fab dark color="teal">
                            <v-icon dark>list</v-icon>
                        </v-btn>
                    </v-flex>
                     <v-flex xs12 sm3 md3 lg3 xl2>
                        <v-text-field  v-model="nombreanomalia" label="Anomaila">
                        </v-text-field>
                    </v-flex>
                     <v-flex xs12 sm1 md1 lg1 xl2>
                        <v-btn @click="mostrarAnomalia()" small fab dark color="teal">
                            <v-icon dark>list</v-icon>
                        </v-btn>
                    </v-flex>
                     <v-flex xs12 sm3 md3 lg3 xl2>
                        <v-text-field  v-model="nombresuceso" label="Relacionada con:">
                        </v-text-field>
                    </v-flex>
                     <v-flex xs12 sm1 md1 lg1 xl2>
                        <v-btn @click="mostrarSuceso()" small fab dark color="teal">
                            <v-icon dark>list</v-icon>
                        </v-btn>
                    </v-flex>
                     <v-flex xs12 sm6 md6 lg6 xl2>
                         <v-textarea
                            clearable
                            clear-icon="cancel"
                            label="Descripción detallada de la anomalía:"
                            value=""
                            v-model="tarjetadescripcion"
                        ></v-textarea>
                    </v-flex>
                    <v-flex xs12 sm2 md2 lg2 xl2 v-if="errorArticulo">
                        <div class="red--text" v-text="errorArticulo">
                        </div>
                    </v-flex>
                    
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                        </div>
                    </v-flex>
                    <v-flex xs12 sm12 md12 lg12 xl12>
                        <v-btn @click="ocultarNuevo()" color="blue darken-1" flat>Cancelar</v-btn>
                        <v-btn @click="guardar()" color="success">Guardar</v-btn>
                    </v-flex>
		        </v-layout>
            </v-container>
        </v-flex>
        
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :color="color"
                :right="x === 'right'"
                :top="y === 'top'"
                >
                <v-icon dark>check_circle </v-icon>
                {{ mensajesnack }}
                
                <v-btn
                color="#0039cb"
                text
                @click="snackbar = false"
                >
                Cerrar
                </v-btn>
            </v-snackbar>
    </v-layout>
    
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                //MODULOS EXTRAS VARIBALES DECLARADAS
                criticidad:"",
                turno:"",
                min: -1,
                max: 7,
                paso_ma: 0,
                pasoma:[0,1,2,3,4,5,6,7],
                range: [0, 7],
                tarjetafecha: new Date().toISOString().substr(0, 10),
                menu2: false,
                // SNACKBAS NOTIFICACIONS
                color:"",
                snackbar: false,
                mensajesnack: 'My timeout is set to 2000.',
                timeout: 2000,
                
                x: 'right',
                y: 'top',

                //MODULOS EXTRAS VARIBALES DECLARADAS
                anomalias:[],                
                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Codigo', value: 'codigo' },
                    { text: 'Nombre', value: 'nombre' },
                    { text: 'Fecha emision', value: 'emision_ts' },
                    { text: 'Usuario', value: 'usuario' },
                    { text: 'Area', value: 'area', sortable: false  },
                    { text: 'Maquina ', value: 'maquina', sortable: false  },
                    { text: 'Tarjeta', value: 'tarjeta', sortable: false  },
           
                ],
                search: '',
                //variables de maquina
                buscarmaquina:'',
                idmaquina:'',
                nombremaquina:'',
                maquinas:[],
                verMaquinas:0,
                showbuscarmaquinatooltip:false,
                //variables de areas
                idarea:'',
                nombrearea:'',
                //variables de anomalias
                buscaranomalia:'',
                idanomalia:'',
                nombreanomalia:'',
                anomaliasdata:[],
                verAnomalias:0,
                //variables de registro sucesos
                buscarsuceso:'',
                idsuceso:'',
                nombresuceso:'',
                sucesosdata:[],
                verSucesos:0,
                
                id: '',
                idproveedor:'',
                areas:[                   
                ],
                
                idusuariotarjeta:'',
                tarjetanombre:'',
                tarjetafecha:'',
                tarjetapasoma:'',
                tarjetacriticidad:'',
                tarjetaturno:'',
                tarjtadecripcion:'',
                tarjetasol_implementada:'',
                tarjetaidtecnico:2,
                tarjetaconfirmacion_tec:false,
                tarjetaidsupervisor:2,
                tarjetaconfirmacion_super:false,
                tarjetaobservaciones:'',
                tarjetaprog:false,
                tarjetaeliminado:false,
                tarjetadescripcion:'',
                tarjetaidtarjeta:1,
                //auxiliadres
             
                    
                verNuevo:0,
                errorArticulo:null,
                
                cabeceraMaquinas: [
                    {text: 'Seleccionar', value: 'seleccionar', sortable: false },
                    { text: 'Maquina', value: 'nombre', sortable: false },
                    { text: 'Area', value: 'area' , sortable: false }
                            
                ],
                cabeceraAnomalias: [
                    {text: 'Seleccionar', value: 'seleccionar', sortable: false },
                    { text: 'Anomalia', value: 'nombre', sortable: false },
                    { text: 'Descripcion', value: 'descripcion' , sortable: false }         
                ],
                cabeceraSuceso: [
                    {text: 'Seleccionar', value: 'seleccionar', sortable: false },
                    { text: 'Anomalia', value: 'nombre'}
                          
                ],
                articulos:[],
                texto:'',
                valida: 0,
                validaMensaje:[],
                adModal: 0,
                adAccion: 0,
                adNombre: '',
                adId: ''             
            }
        },
        computed: {
            calcularTotal:function(){
                var resultado=0.0;
                for(var i=0;i<this.detalles.length;i++){
                    resultado=resultado+(this.detalles[i].precio*this.detalles[i].cantidad);
                }
                return resultado;
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            this.listarMaquina();
            this.listarAnomalia();
            this.listarSuceso();
            //let me=this;
            //this.idusuariotarjeta=this.$store.state.usuario.idusuario;
            this.select();
        },
        methods:{
            mostrarNuevo(){
                this.verNuevo=1;
               
            },
            ocultarNuevo(){
                this.verNuevo=0;
                this.limpiar();
            },

         //METODOS DE MAQUINAS   
            listarMaquina(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/Maquinas/ListarMaquinas/',configuracion).then(function(response){
                    //console.log(response);
                    me.maquinas=response.data;
                    
                }).catch(function(error){
                    console.log(error);
                });
            },
            mostrarMaquinas(){
                this.verMaquinas=1;
                
            },
            ocultarMaquinas(){
                this.verMaquinas=0;
            },
            agregarMaquina(data = []){
                this.idmaquina=data['idmaquina'];
                this.nombremaquina= data['nombre'];
                this.verMaquinas=0;
                this.snackbar = true;
                this.color="success";
                
                this.mensajesnack='Maquina seleccionada' +" "+ this.nombremaquina
            },
            //METODOS ANOMALIAS LISTAR 
            listarAnomalia(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/Anomalias/ListarAnomalias/',configuracion).then(function(response){
                    //console.log(response);
                    me.anomaliasdata=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            mostrarAnomalia(){
                this.verAnomalias=1;
                
            },
            ocultarAnomalia(){
                this.verAnomalias=0;
            },

             agregarAnomalia(data = []){
                this.idanomalia=data['idanomalia'];
                this.nombreanomalia= data['nombre'];
                this.verAnomalias=0;
                this.verMaquinas=0;
                this.snackbar = true;
                this.color="success";
                this.mensajesnack='Anomalia seleccionada' +" "+ this.nombreanomalia

            },
        // METODOS DE SUCESOS RELACIONADO 
            listarSuceso(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/Sucesos/ListarSucesos/',configuracion).then(function(response){
                    //console.log(response);
                    me.sucesosdata=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            mostrarSuceso(){
                this.verSucesos=1;
                
            },
            ocultarSuceso(){
                this.verSucesos=0;
            },

             agregarSuceso(data = []){
                this.idsuceso=data['idsuceso'];
                this.nombresuceso= data['nombre'];
                this.verSucesos=0;
                this.snackbar = true;
                this.color="success";
                this.mensajesnack='Relacionado con ' +" "+ this.nombresuceso

            },
            ///  FIN DE METODOS SUCESOS

            /// METODO SNACBAR
            mostrarSnacbar(){
                this.verSucesos=0;
                this.snackbar = true;
                this.color="success";
                this.mensajesnack='Tarjeta creada exitosa'
                    
            },
            
            encuentra(id){
                var sw=0;
                for(var i=0;i<this.detalles.length;i++){
                    if (this.detalles[i].idarticulo==id){
                        sw=1;
                    }
                }
                return sw;
            },
            eliminarDetalle(arr,item){
                var i= arr.indexOf(item);
                if (i!==-1){
                    arr.splice(i,1);
                }
            },
            listar(){
                
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/RegistrosAnomalias/Listar',configuracion).then(function(response){
                    //console.log(response);
                    me.anomalias=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            select(){
                let me=this;
                var areasArray=[];
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/Areas/SelectAreas',configuracion).then(function(response){
                    areasArray=response.data;
                    areasArray.map(function(x){
                        me.areas.push({text: x.nombre,value:x.idarea});
                    });
                }).catch(function(error){
                    console.log(error);
                });
            },
            limpiar(){
                this.id="";
               
                
              
              
            },
            guardar () {
                //if (this.validar()){
                  //  return;
                //}
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};                
                let me=this;
                axios.post('api/RegistrosAnomalias/CrearAnomalias',{
                    'nombre':me.tarjetanombre,
                    'emision_ts':me.tarjetafecha,
                    'idusuario': this.$store.state.usuario.idusuario,
                    'paso_ma': me.tarjetapasoma,
                    'criticidad':me.tarjetacriticidad,
                    'turno':me.tarjetaturno,
                    'idarea':me.idarea,
                    'idmaquina':me.idmaquina,
                    'idanomalia':me.idanomalia,
                    'idsuceso':me.idsuceso,
                    'idtarjeta':me.tarjetaidtarjeta,
                    'descripcion':me.tarjetadescripcion,
                    'sol_implementada':me.tarjetasol_implementada,
                    'idtecnico':me.tarjetaidtecnico,
                    'confirmacion_tec':me.tarjetaconfirmacion_tec,
                    'idsupervisor':me.tarjetaidsupervisor,
                    'confirmacion_super':me.tarjetaconfirmacion_super,
                    'observaciones':me.tarjetaobservaciones,
                    'prog':me.tarjetaprog,
                    'eliminado':me.tarjetaeliminado

                    
                },configuracion).then(function(response){
                    me.ocultarNuevo();
                    me.listar();
                   // me.limpiar(); 
                   me.mostrarSnacbar(); 
                    
                }).catch(function(error){
                    console.log(error);
                });
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];

                if (!this.idproveedor){
                    this.validaMensaje.push("Seleccione un proveedor.");
                }
                if (!this.tipo_comprobante){
                    this.validaMensaje.push("Seleccione un tipo de comprobante.");
                }
                if (!this.num_comprobante){
                    this.validaMensaje.push("Ingrese el número del comprobante.");
                }
               
                if (this.detalles.length<=0){
                    this.validaMensaje.push("Ingrese al menos un artículo al detalle.");
                }
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
            activarDesactivarMostrar(accion,item){
                this.adModal=1;
                this.adNombre=item.nombre;
                this.adId=item.idusuario;                
                if (accion==1){
                    this.adAccion=1;
                }
                else if (accion==2){
                    this.adAccion=2;
                }
                else{
                    this.adModal=0;
                }
            },
            activarDesactivarCerrar(){
                this.adModal=0;
            },
           
            }
            
    }
</script>
