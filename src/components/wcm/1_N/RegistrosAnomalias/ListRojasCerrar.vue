<template>
<v-layout align-start>
    <v-container fluid grid-list-sm>
      <!--VENTANA DE REGISTROS-->

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
  
    
               <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
                <v-layout row wrap>
                     
        
                     <!--Atributos del fomulario-->
                     <v-flex xs12 sm4 md4 lg4 xl2>
                        <v-text-field v-model="tarjetanombre" label="Nombre de la anomalia" required>
                        </v-text-field>
                    </v-flex>
                   
                     <v-flex xs12 sm4 md4 lg4 xl2>
                        <v-overflow-btn
                            class="my-0"
                            :items="pasoma"
                            label="Paso MA"
                            v-model="tarjetapasoma"
                          
                        ></v-overflow-btn>
                      
                    </v-flex>
                    <v-flex xs12 sm4 md4 lg4 xl2>
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
                     <v-flex xs12 sm3 md3 lg3 xl2>
                        <v-text-field  readonly v-model="nombremaquina" label="Maquina">
                        </v-text-field>
                    </v-flex>
                     <v-flex xs12 sm1 md1 lg1 xl2>
                        <v-btn @click="mostrarMaquinas()" small fab dark color="teal">
                            <v-icon dark>list</v-icon>
                        </v-btn>
                    </v-flex>
                     <v-flex xs12 sm3 md3 lg3 xl2>
                        <v-text-field  readonly v-model="nombreanomalia" label="Anomaila">
                        </v-text-field>
                    </v-flex>
                     <v-flex xs12 sm1 md1 lg1 xl2>
                        <v-btn @click="mostrarAnomalia()" small fab dark color="teal">
                            <v-icon dark>list</v-icon>
                        </v-btn>
                    </v-flex>
                     <v-flex xs12 sm3 md3 lg3 xl2>
                        <v-text-field  readonly v-model="nombresuceso" label="Relacionada con:">
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
                            rows="2"
                            label="Descripción detallada de la anomalía:"
                            value=""
                            v-model="tarjetadescripcion"
                        ></v-textarea>
                    </v-flex>
                    <v-flex>
                      <div>
        <div>
            <img :src="imageUrl" ref="imageUrl" height="150" @click="onPickFile" style="cursor: pointer;">
        </div>
        <div>
            <v-btn raised @click="onPickFile" v-if="!imageUrl">
                {{ selectLabel }}
            </v-btn>
            <v-btn raised class="error" @click="removeFile" v-else>
                {{ removeLabel }}
            </v-btn>
            <input type="file" ref="image" name="image" :accept="accept" @change="onFilePicked">
        </div>
    </div>
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
                        <v-btn 
                           :loading="loading"
                           :disabled="loading"
                          @click="guardar()" color="success">Guardar</v-btn>
                          
                            
                    </v-flex>
		        </v-layout>
            </v-container>


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
        <v-card>
          <v-card-title class="headline" v-text="this.codigo" ></v-card-title>
          <v-card-text>
        <v-flex xs12 sm12 md12 lg12 xl2>
            <v-textarea
                         clearable
                            clear-icon="cancel"
                            label="Ingrese la observacion para la confirmacion:"
                            value=""
                            v-model="tarjetaobservaciones"
                        ></v-textarea>
                    </v-flex>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
           
        <v-spacer></v-spacer>
            <v-btn   v-if="this.tarjetaobservaciones" color="green darken-1"  @click="confirmarStadoSupervisor">Confirmar</v-btn>
            <v-btn color="green darken-1" flat @click="dialogconfirmar = false">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--VENTANA CONFIRMACION DE ASIGNACION-->
      
       <v-dialog v-model="dialogconfirmar" persistent max-width="290">
        <v-card>
          <v-card-title class="headline" v-text="this.codigo" ></v-card-title>
          <v-card-text>
        <v-flex xs12 sm12 md12 lg12 xl2>
            <v-textarea
                         clearable
                            clear-icon="cancel"
                            label="Ingrese la solución Implementada:"
                            value=""
                            v-model="solucionimplentada"
                        ></v-textarea>
                    </v-flex>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
           
        <v-spacer></v-spacer>
            <v-btn   v-if="this.solucionimplentada" color="green darken-1"  @click="confirmarSolucion">Confirmar</v-btn>
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
                  <v-text-field label="Nombre tarjeta:" 
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
                     <v-textarea
                    outlined
                    name="input-7-4"
                    label="Descripcion :"
                    rounded=true
                    filled=true
                    rows="4"
                    readonly
                   v-model="this.descripcion"
                  ></v-textarea>
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

     <template v-if="this.verListaTarjetas==true">
       <v-toolbar flat color="white">
            <div class="text-center" v-if="this.idtarjeta==1">
            <v-avatar>
                <img  :src="require('../../../../assets/Roja.png')" alt="avatar">
            </v-avatar>
            </div>

             <div class="text-center" v-if="this.idtarjeta==2">
            <v-avatar>
                <img  :src="require('../../../../assets/Azul.png')" alt="avatar">
            </v-avatar>
            </div>

             <div class="text-center" v-if="this.idtarjeta==3">
            <v-avatar>
                <img  :src="require('../../../../assets/Amarilla.png')" alt="avatar">
            </v-avatar>
            </div>

              <div class="text-center" v-if="this.idtarjeta==4">
            <v-avatar>
                <img  :src="require('../../../../assets/Verde.png')" alt="avatar">
            </v-avatar>
            </div>

            
                <v-toolbar-title>Lista de Recepción</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center"  v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    
                  <!--  <v-btn  v-if="verNuevo==0" @click="mostrarNuevo(1)" color="#64DD17" fab dark>
                        <v-icon>post_add</v-icon>
                    </v-btn>-->
                    
                   
                     <v-btn  v-if="verNuevo==0 && this.botonlista==false" @click="VerbotonFoto(true)" color="#EF6C00" fab dark>
                        <v-icon>reorder</v-icon>
                    </v-btn>
                   
                 
                     <v-btn  v-if="verNuevo==0 && this.botonlista" @click="VerbotonFoto(false)" color="#00838F" fab dark>
                        <v-icon>class</v-icon>
                    </v-btn>
                   
                    
                     <v-btn  v-if="verNuevo==0" @click="mostrarNuevo(1)" color="#0288D1" fab dark>
                        <v-icon>search</v-icon>
                    </v-btn>
                    
                
                    

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
        <template  v-slot:item="props">
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
        <v-hover>

          
              <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
              class="mx-auto"
              >
              
          <v-img
            class="white--text"
            height="200px"
           width="100%"
            
             :src="(props.item.foto_anomalia)"
          >
            <v-container fill-height fluid >
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                 <template v-if="props.item.criticidad==='A'">
               <div class="headline"> <span class="red--text">{{props.item.criticidad}}</span></div>
               </template>
                <template v-if="props.item.criticidad==='B'">
               <div class="headline"> <span class="yellow--text">{{props.item.criticidad}}</span></div>
               </template>
                <template v-if="props.item.criticidad==='C'">
               <div class="headline"> <span class="green--text">{{props.item.criticidad}}</span></div>
               </template>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
               <v-list-tile-content>
                 <v-flex xs5 sm5 md5>
                  <template v-if="props.item.idtarjeta === 1">
                        
                        <v-chip 
                        
                        color="red"
                        class="ma-2"
                        text-color="black"
                        > <v-icon left>build</v-icon>
                        <div class="subtitle-1">
                        {{props.item.codigo}} MTTO
                        </div>
                        </v-chip>
                        
                        
                       
                   </template>
                    <template v-if="props.item.idtarjeta === 2">
                    <v-chip
                        color="primary"
                         class="ma-2"
                         text-color="black"
                        >
                        <v-avatar left>
                          <v-icon>account_circle</v-icon>
                        </v-avatar>
                        {{props.item.codigo}} OPERADOR
                        </v-chip>
                   </template>
                   <template v-if="props.item.idtarjeta === 3">
                    <v-chip
                        color="yellow"
                         class="ma-2"
                         text-color="black"
                        >
                        <v-avatar left>
                          <v-icon>public</v-icon>
                        </v-avatar>
                        {{props.item.codigo}} INGENIERIA
                        </v-chip>
                   </template>
                 </v-flex>
                  
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
                  
                <div class="caption">Atentido por: {{props.item.usuariotecnico}}</div>
                 <div class="caption">Fecha Hora: {{props.item.ejecucion_ts}}</div>
                 <template v-if="props.item.confirmacion_super === true">
                 <div class="caption">Recibido por: {{props.item.usuariosupervisor}}</div>
                 <div class="caption">Fecha Hora: {{props.item.cierre_ts}}</div>
                  </template>
                  <template v-if="props.item.confirmacion_super === false">
                  <v-flex>
                    <v-flex>
                      
                    </v-flex>
                  </v-flex>
                  </template>
                 <template v-if="props.item.confirmacion_super === false">
                  
                      <v-chip 
                        
                        color="yellow"
                        class="ma-2"
                        text-color="black"
                        small
                        > 
                        <div class="subtitle-2">
                         En espera de la recepción
                         <v-icon right>hourglass_empty</v-icon>
                        </div>
                        </v-chip>
                     
                  
                   </template>
                   <template v-if="props.item.confirmacion_super === true">
                  <v-chip 
                        
                        color="green"
                        class="ma-2"
                        text-color="black"
                        small
                        > 
                        <div class="subtitle-2">
                         Recepcionado
                         <v-icon right>assignment_turned_in</v-icon>
                        </div>
                        </v-chip>
                   </template>
            </template>
          </v-list>
          </v-flex >
                
            
          </v-card-title>
          <v-card-actions>
            <v-btn  color="green"
            @click="editItemConfirmar(props.item)"
            >CERRAR</v-btn>
            <v-btn outline color="blue"
                @click="editItem(props.item)"
            >Detalles</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>

          </v-flex>
        </template>
      </v-data-iterator>
       </template>
    </v-container>
 </v-layout>
</template>
  


<script>
    import axios from 'axios'
import { all } from 'q';
    export default {
      props: {
            value: {
                type: String
            },
            accept: {
                type: String,
                default: '*'
            },
            selectLabel: {
                type: String,
                default: 'Seleccione una imagen'
            },
            cargarunaimagen: {
                type: String,
                default: 'cargue una imagen'
            },
            removeLabel: {
                type: String,
                default: 'Remover'
            }
        },
        data(){
            return {
              imageUrl: '',
              imagen_anomalia:null,
                files:null,
        dialog: false,
        show:false,
        search:'',       
        rowsPerPageItems: [4, 8, 12,50],
        pagination: {
        rowsPerPage: 4
        },
         pasoma:[0,1,2,3,4,5,6,7],
         menu2: false,
         areas:[                   
                ],
         // SNACKBAS NOTIFICACIONS
        color:"",
        snackbar: false,
        textsnackbar: 'My timeout is set to 2000.',
        timeout: 2000, 
        x: 'right',
        y: 'top',
        anomalias:[], 
        
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
        idtarjeta:0,
        descripcion:'',
        paso_ma:'',
        criticidad:'',
        turno:'',
        area:'',
        relacionado:'',
        dialogconfirmar:false,
        snackbar:false,
        timeout:2000,
        mensajesnack:'',
        tarjetauser:'',
        verNuevo:0,
       
        errorArticulo:null,
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
                tarjetapasoma:-1,
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
                loading:false,
                verMenuTarjetas:true,
                verListaTarjetas:true,
                botonlista:false,

                src:'data:image/png;base64,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'
                ,
                //Confimacion 
                solucionimplentada:'',
                    
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
                adId: ''     ,
            }
            },
             watch: {
                loader () {
                  const l = this.loader
                  this[l] = !this[l]

                  setTimeout(() => (this[l] = false), 3000)

                  this.loader = null
                },
              },
            created () {
                this.listarsinfoto(1);
                //this.seleccionautomaticotarjeta();
                this.listarMaquina();
                this.listarAnomalia();
                this.listarSuceso();
            //let me=this;
            //this.idusuariotarjeta=this.$store.state.usuario.idusuario;
                this.select();
                
            },
            methods:{

                confirmarStadoSupervisor () {
              
               
                    let me=this;
                    axios.put('api/RegistrosAnomalias/ConfirmarSupervisor',{
                        'idregistroanomalia':me.idanomalia,
                        'idsupervisor': me.$store.state.usuario.idusuario,
                        'observaciones':me.tarjetaobservaciones
                        
                    }).then(function(response){
                        me.close();
                        me.listar(1);
                        me.limpiar();  
                                          
                    }).catch(function(error){
                        console.log(error);
                      
                    });    
                
            },

            editItemConfirmar (item) {
                
                    this.idanomalia=item.idregistroanomalia;
                    //this.editedIndex=1;
                    this.codigo=item.codigo;
                    this.dialogconfirmar = true;
                },
                mostrarNuevo(nrotarjeta){
                  this.verNuevo=1;
                  this.idtarjeta=nrotarjeta;
                  this.verMenuTarjetas=false;

                  this.verListaTarjetas=false;
               
                },
                ocultarNuevo(){
                    this.verMenuTarjetas=true;
                    this.verNuevo=0;
                    this.limpiar();
                    this.verListaTarjetas=true;
                    
                },
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
                listar(tarjeta){
                    let me=this;
                    this.idtarjeta=tarjeta;
                    var bandera1;
                    axios.get('api/RegistrosAnomalias/ListarTarjetaCerrar/'+me.idtarjeta).then(function(response){
                        //console.log(response);
                        me.itemsdata=response.data;
                       
                        me.verListaTarjetas=true;
                    }).catch(function(error){
                        console.log(error);
                        
                });
            },

            listarsinfoto(tarjeta){
                    let me=this;
                    this.idtarjeta=tarjeta;
                    var bandera1;
                    axios.get('api/RegistrosAnomalias/ListarTarjetaCerrarSF/'+me.idtarjeta).then(function(response){
                        //console.log(response);
                        me.itemsdata=response.data;
                      
                        me.verListaTarjetas=true;
                    }).catch(function(error){
                        console.log(error);
                        
                });
            },
            VerbotonFoto(valor){
              this.botonlista=valor;
              if(this.botonlista==true){
                this.listar(1);
              }
               if(this.botonlista==false){
                   this.listarsinfoto(1);
              }

             
              
            },
            VerMenuTarjetasLista(){
               this.verMenuTarjetas=true;
               //this.verNuevo=true; 
               this.verListaTarjetas=false;    
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
            confirmarSolucion () {
              
               
                    let me=this;
                    axios.put('api/RegistrosAnomalias/AplicarContramedida',{
                        'idregistroanomalia':me.idanomalia,
                        'sol_implementada':me.solucionimplentada,
                        'idtecnico': me.$store.state.usuario.idusuario
                        
                    }).then(function(response){
                        me.close();
                        me.listar(me.idtarjeta);
                        me.limpiar();
                        //me.verListaTarjetas=true;  
                                          
                    }).catch(function(error){
                        console.log(error);
                      
                    });    
                
            },
            close(){
              this.dialogconfirmar=false
              this.snackbar=true
              this.textsnackbar='Operacion exitosa'
            },
            limpiar(){
        
                this.tarjetanombre= "";
                this.tarjetapasoma=-1;
                this.tarjetacriticidad="",
                this.idarea="",
                this.nombrearea="";
                this.idmaquina="";
                this.nombremaquina="";
                this.idanomalia="";
                this.nombreanomalia="";
                this.idsuceso="";
                this.nombresuceso="";
                this.tarjetadescripcion="";
                
               
               
            },
           
            
          
            abrirventanaconfirmar(){
             
              this.confirmar=true
               
            },
            
             editItemConfirmar (item) {
                
                this.idanomalia=item.idregistroanomalia;
                //this.editedIndex=1;
                this.codigo=item.codigo;
                this.dialogconfirmar = true;
            },
            seleccionautomaticotarjeta(){
              let me=this;
              if (this.$store.state.usuario.rol =='Mantenimiento'){
                this.tarjetauser=1;
              }else
              if (this.$store.state.usuario.rol =='Operador'){
                this.tarjetauser=2;
              }
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
                
                this.textsnackbar='Maquina seleccionada' +" "+ this.nombremaquina
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
                this.textsnackbar='Anomalia seleccionada' +" "+ this.nombreanomalia

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
                this.textsnackbar='Relacionado con ' +" "+ this.nombresuceso

            },
            ///  FIN DE METODOS SUCESOS
         guardar () {
                if (this.validar()){
                  return;
                }
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};                
                let me=this;
                this.loading= true;
                
                if(this.imageUrl==''){
                    this.imageUrl = 'data:image/png;base64,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'
                  //console.log("entra");
                };
                //console.log("algo "+this.imageUrl)
                
                axios.post('api/RegistrosAnomalias/CrearAnomalias',{
                    'nombre':me.tarjetanombre,
                    //'emision_ts':me.tarjetafecha,
                    'idusuario': this.$store.state.usuario.idusuario,
                    'paso_ma': me.tarjetapasoma,
                    'criticidad':me.tarjetacriticidad,
                    'idarea':me.idarea,
                    'idmaquina':me.idmaquina,
                    'idanomalia':me.idanomalia,
                    'idsuceso':me.idsuceso,
                    'idtarjeta':me.idtarjeta,
                    'descripcion':me.tarjetadescripcion,
                    'sol_implementada':me.tarjetasol_implementada,
                    'idtecnico':me.tarjetaidtecnico,
                    'confirmacion_tec':me.tarjetaconfirmacion_tec,
                    'idsupervisor':me.tarjetaidsupervisor,
                    'confirmacion_super':me.tarjetaconfirmacion_super,
                    'observaciones':me.tarjetaobservaciones,
                    'prog':me.tarjetaprog,
                    'foto_anomalia':me.imageUrl,
                    'eliminado':me.tarjetaeliminado
                    
                },configuracion).then(function(response){
                    me.loading=false;
                    me.ocultarNuevo();
                    me.listar(me.idtarjeta);
                    me.limpiar(); 
                    me.mostrarSnacbar();
                    me.verListaTarjetas=true;
                    me.removeFile();
                    
                    
                }).catch(function(error){
                    me.snackbar=true
                    me.color="#C62828";
                    me.textsnackbar='Error en la operacion intente mas tarde'
                    me.loading=false;
                    me.verListaTarjetas=true;
                    me.removeFile();
                    console.log(error);
                });
            },
            /// METODO SNACBAR
            mostrarSnacbar(){
                this.verSucesos=0;
                this.snackbar = true;
                this.color="success";
                this.textsnackbar='Tarjeta creada exitosa'
                    
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
             validar(){
                this.valida=0;
                this.validaMensaje=[]; 

                if (!this.tarjetanombre){
                    this.validaMensaje.push("Ingrese un nombre.");
                }
                if (this.tarjetapasoma < 0 ){
                  this.validaMensaje.push("Seleccioné PASO MA");    
                }
                 if (!this.tarjetacriticidad){
                  this.validaMensaje.push("Seleccioné criticidad");    
                }
                 //if (!this.tarjetaturno){
                 // this.validaMensaje.push("Seleccioné un turno");    
                //}
                if (!this.idarea){
                  this.validaMensaje.push("Seleccioné una area.");    
                }
                if (!this.idmaquina){
                  this.validaMensaje.push("Seleccioné una maquina.");    
                }
                 if (!this.idanomalia){
                  this.validaMensaje.push("Seleccioné una anomalia.");    
                }
                if (!this.idsuceso){
                  this.validaMensaje.push("Seleccioné un suceso relacionado.");    
                }
                if (!this.tarjetadescripcion){
                  this.validaMensaje.push("Ingrese una descripcion.");    
                }
                
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
             onPickFile() {
                this.$refs.image.click()
            },

            onFilePicked(event) {
                var bandera = '';
                
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                const files = event.target.files || event.dataTransfer.files
                let me=this;
                
                if (files && files[0]) {
                    let filename = files[0].name

                    if (filename && filename.lastIndexOf('.') <= 0) {
                        return //return alert('Please add a valid image!')
                    }
                    const fileReader = new FileReader()
                    fileReader.addEventListener('load', () => {
                        this.imageUrl = fileReader.result;
                        bandera = fileReader.result;
                    })
                    fileReader.readAsDataURL(files[0])
                    //console.log(fileReader)

                    this.$emit('input', files[0])
                }
            },
            
            removeFile() {
                this.imageUrl = ''
            }
        }        
    }
</script>
<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>