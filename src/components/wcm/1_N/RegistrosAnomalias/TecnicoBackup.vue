
<template>
 
    <v-layout align-start>
      
      <v-flex  xs12 sm12 md12 lg12 xl12>
        <v-card>
           <v-toolbar flat color="white">
                <v-toolbar-title>Reportes</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center"  append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                   
                   
                </v-toolbar>
          <v-container v-bind="{ [`grid-list-sm`]: true }" fluid>
            <v-layout wrap>
              <v-flex  xs12 sm4 md4 lg4 xl12

                v-for="listadata in lista_data"
                :key="listadata.idregistroanomalia"
                v-bind="{ [`xs4`]: true }"
               >
                <v-card
                  class="mx-auto"
                  max-width="344"
                >
                  <v-img
                    src="https://www.lostiempos.com/sites/default/files/media_imagen/2019/4/5/756785e2-6ea8-430e-a479-24a7d6d74b74.jpg"
                    height="200px"
                  ></v-img>
              
                  <v-card-title  >
                    <div v-text="listadata.codigo">Cinta trasnportadora</div>
                  </v-card-title>
                  <v-card-text>
                    <span class="grey--text subtitle-1" v-text="listadata.nombre" >Incidencia rotura de montaje</span>

                  </v-card-text>
              
                  <v-card-actions>
                    <v-btn text>Asignarme</v-btn>
              
                    <v-btn
                      text
                      color="blue"
                    >
                      Detalles
                    </v-btn>
              
                    <v-spacer></v-spacer>
              
                    <v-btn
                      icon
                      @click="show = !show"
                    >
                      <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                    </v-btn>
                  </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-card-text v-text="listadata.nombre">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      </v-layout>
     
</template>

<script>
    import axios from 'axios'
    
    export default {
        data(){
            return {
               
                adId: '',
                size: 'sm',
                show: false,
                // LISTAR DATOS INCIDENCIAS
                lista_data:[],
          items: [
            { text: 'Extra small (2px)', value: 'xs' },
            { text: 'Small (4px)', value: 'sm' },
            { text: 'Medium (8px)', value: 'md' },
            { text: 'Large (16px)', value: 'lg' },
            { text: 'Extra large (24px)', value: 'xl' },
          ],             
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo equipo' : 'Actualizar equipo'
            }
        },

        watch: {
            
        },

        created () {
            this.listar();
            
        },
        methods:{
             listar(){
                let me=this;
                axios.get('api/RegistrosAnomalias/ListarTecnico').then(function(response){
                    //console.log(response);
                    me.lista_data=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            select(){
                let me=this;
                var esperaArray=[];
                axios.get('api/RegistrosAnomalias/ListarTecnico').then(function(response){
                    esperaArray=response.data;
                    esperaArray.map(function(x){
                        me.listaespera.push({text: x.nombre,value:x.idarea});
                    });
                }).catch(function(error){
                    console.log(error);
                });
            },
            editItem (item) {
                this.idmaquina=item.idmaquina;
                this.idcategoria=item.idarea;
                this.nombre=item.nombre;
                this.descripcion=item.descripcion;
                this.editedIndex=1;
                this.dialog = true
            },
            close () {
                this.dialog = false;
                this.limpiar();
            },
            limpiar(){
                this.idmaquina="";
                this.idarea="";
                this.nombre="";
                this.descripcion="";
                this.editedIndex=-1;
            },
            guardar () {
                if (this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Código para editar
                    //Código para guardar
                    let me=this;
                    axios.put('api/maquinas/Actualizar',{
                        'idmaquina':me.idmaquina,
                        'idarea':me.idarea,
                        'nombre': me.nombre,
                        'descripcion': me.descripcion
                    }).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                } else {
                    //Código para guardar
                    let me=this;
                    axios.post('api/maquinas/Crear',{
                        'idarea':me.idarea,
                        'nombre': me.nombre,
                        'descripcion': me.descripcion
                    }).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                }
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];

                if (this.nombre.length<3 || this.nombre.length>50){
                    this.validaMensaje.push("El nombre debe tener más de 3 caracteres y menos de 50 caracteres.");
                }
                if (!this.idarea){
                    this.validaMensaje.push("Seleccione una area.");
                }
                
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
            activarDesactivarMostrar(accion,item){
                this.adModal=1;
                this.adNombre=item.nombre;
                this.adId=item.idmaquina;                
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
            activar(){
                let me=this;
                axios.put('api/maquinas/Activar/'+this.adId,{}).then(function(response){
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.adId="";
                    me.listar();                       
                }).catch(function(error){
                    console.log(error);
                });
            },
            desactivar(){
                let me=this;
                axios.put('api/maquinas/Desactivar/'+this.adId,{}).then(function(response){
                    me.adModal=0;
                    me.adAccion=0;
                    me.adNombre="";
                    me.adId="";
                    me.listar();                       
                }).catch(function(error){
                    console.log(error);
                });
            }
        }        
    }
</script>
