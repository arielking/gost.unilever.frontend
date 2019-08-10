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
          <v-img
            class="white--text"
            height="200px"
            src="https://www.lostiempos.com/sites/default/files/media_imagen/2019/4/5/756785e2-6ea8-430e-a479-24a7d6d74b74.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="subheading font-weight-bold">{{props.item.codigo}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Number 10</span><br>
              <span>Whitehaven Beach</span><br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange"
                @click="editItem(props.item)"
            >Explore</v-btn>
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
