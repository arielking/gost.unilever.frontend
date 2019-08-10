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

            <v-data-iterator
                    :items="itemsdata"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                    :search="search"
                    content-tag="v-layout"
                    hide-actions
                    row
                    wrap
                >
             <template v-slot:item="props">
              <v-flex  xs12 sm4 md4 lg4 xl12
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
                    <div class="subheading font-weight-bold" >{{props.item.codigo}}</div>
                  </v-card-title>
                  <v-card-text>
                    <span class="grey--text subtitle-1" >{{props.item.nombre}}</span>

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
                    <v-card-text>{{props.item.descripcion}}
                        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                    </v-card-text>
                    </div>
                </v-expand-transition>
                            </v-card>
              </v-flex>
                </template>
                 </v-data-iterator>
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
        show:false,
        search:'',       
        rowsPerPageItems: [4, 8, 12],
        pagination: {
        rowsPerPage: 4
        },
        itemsdata:[],
        itemsddd: [
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
                listar(){
                    let me=this;
                    axios.get('api/RegistrosAnomalias/ListarTecnico').then(function(response){
                        //console.log(response);
                        me.itemsdata=response.data;
                    }).catch(function(error){
                        console.log(error);
                        
                });
            }
        }        
    }
</script>
