<template>

      
    <v-container fluid grid-list-md>
        <!--VENTANA DETALLES -->
    <template>
        <v-dialog v-model="dialog" persistent max-width="600px">
       
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Legal first name*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                  v-model="this.codigo"
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Email*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password*" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
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
              <v-card-title><h4>{{ props.item.codigo }}</h4></v-card-title>
               <v-btn
                      text
                      color="blue"
                      class="mr-2"
                    @click="editItem(props.item)"
                    >
                      Detalles
                    </v-btn>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>Calories:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Fat:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Carbs:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Protein:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Sodium:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Calcium:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Iron:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
 
</template>
  


<script>
    import axios from 'axios'
    export default {
        data(){
            return {
        dialog: false,
        show:false,
        search:'',       
        rowsPerPageItems: [4, 8, 12],
        pagination: {
        rowsPerPage: 4
        },
        
        itemsdata:[],
        // variables
        codigo:'',
        idanomalia:'',
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

                //this.editedIndex=1;
                this.dialog = true
            },
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
