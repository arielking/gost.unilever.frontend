<template>
    <v-layout align-start>
        <v-flex>
            <v-toolbar flat color="white">
                <v-toolbar-title>Usuarios</v-toolbar-title>
                    <v-divider
                    class="mx-2"
                    inset
                    vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Búsqueda" single-line hide-details></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="nombre" label="Nombre">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-select v-model="idrol"
                                    :items="roles" label="Roles">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                   <v-select v-model="tipo_documento"
                                    :items="documentos" label="Tipo Documento">
                                    </v-select>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field  v-model="num_documento" label="Numero Documento">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field  v-model="direccion" label="Direccion">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="telefono" label="Telefono">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs6 sm6 md6>
                                    <v-text-field v-model="email" label="Email"></v-text-field>
                                </v-flex>
                                 <v-flex xs6 sm6 md6>
                                    <v-text-field type="password" v-model="password" label="Password"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 v-show="valida">
                                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                                    </div>
                                </v-flex>
                                </v-layout>
                            </v-container>
                            </v-card-text>
                
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
                                <v-btn color="blue darken-1" flat @click.native="guardar">Guardar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="adModal" max-width="290">
                        <v-card>
                            <v-card-title class="headline" v-if="adAccion==1">¿Activar Usuario?</v-card-title>
                            <v-card-title class="headline" v-if="adAccion==2">¿Desactivar Usuario?</v-card-title>
                            <v-card-text>
                                Estás a punto de 
                                <span v-if="adAccion==1">Activar </span>
                                <span v-if="adAccion==2">Desactivar </span>
                                el usuario {{ adNombre }}
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
                :items="usuarios"
                :search="search"
                class="elevation-1"
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
                        <template v-if="props.item.condicion">
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
                    <td>{{ props.item.nombre }}</td>
                    <td>{{ props.item.rol }}</td>
                    <td>{{ props.item.tipo_documento }}</td>
                    <td>{{ props.item.num_documento }}</td>
                    <td>{{ props.item.direccion }}</td>
                    <td>{{ props.item.telefono }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>
                        <div v-if="props.item.condicion">
                            <span class="blue--text">Activo</span>
                        </div>
                        <div v-else>
                            <span class="red--text">Inactivo</span>
                        </div>
                    </td>
                </template>
                <template slot="no-data">
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                usuarios:[],                
                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Nombre', value: 'nombre', sortable: false },
                    { text: 'Rol', value: 'rol' },
                    { text: 'Tipo Documento', value: 'tipo_documento' },
                    { text: 'Numero Documento', value: 'num_documento' },
                    { text: 'Direccion', value: 'direccion', sortable: false  },
                    { text: 'Telefono', value: 'telefono', sortable: false  },
                    { text: 'Email', value: 'email', sortable: false  },  
                    { text: 'Estado', value: 'condicion', sortable: false  }              
                ],
                search: '',
                editedIndex: -1,
                id: '',
                idrol:'',
                roles:[                   
                ],
                nombre:'',
                tipo_documento: '',
                documentos: ['C.I','PASAPORTE','CEDULA'],
                num_documento: '',
                direccion: '',
                telefono: '',
                email: '',
                password:'',
                actPassword:false,
                passwordAnt:'',
                valida: 0,
                validaMensaje:[],
                adModal: 0,
                adAccion: 0,
                adNombre: '',
                adId: ''              
            }
        },
        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo usuario' : 'Actualizar usuario'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            this.select();
        },
        methods:{
            listar(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/usuarios/Listar',configuracion).then(function(response){
                    //console.log(response);
                    me.usuarios=response.data;
                }).catch(function(error){
                    console.log(error);
                });
            },
            select(){
                let me=this;
                var rolesArray=[];
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.get('api/roles/Select',configuracion).then(function(response){
                    rolesArray=response.data;
                    rolesArray.map(function(x){
                        me.roles.push({text: x.nombre,value:x.idrol});
                    });
                }).catch(function(error){
                    console.log(error);
                });
            },
            editItem (item) {
                this.id=item.idusuario;
                this.idrol=item.idrol;
                this.nombre=item.nombre;
                this.tipo_documento=item.tipo_documento;
                this.num_documento=item.num_documento;
                this.direccion=item.direccion;
                this.telefono=item.telefono;
                this.email=item.email;
                this.password=item.password_hash;
                this.passwordAnt=item.password_hash;
                this.editedIndex=1;
                this.dialog = true
            },
            close () {
                this.dialog = false;
                this.limpiar();
            },
            limpiar(){
                this.id="";
                this.idrol="";
                this.nombre="";
                this.tipo_documento="";
                this.num_documento="";
                this.direccion="";
                this.telefono="";
                this.email="";
                this.password="";
                this.passwordAnt="";
                this.actPassword=false;
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
                     if (me.password!=me.passwordAnt){
                        me.actPassword=true;
                    }
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                    axios.put('api/usuarios/Actualizar',{
                        'idusuario':me.id,
                        'idrol':me.idrol,
                        'nombre': me.nombre,
                        'tipo_documento':me.tipo_documento,
                        'num_documento':me.num_documento,
                        'direccion':me.direccion,
                        'telefono':me.telefono,
                        'email':me.email,
                        'password':me.password,
                        'act_password':me.actPassword
                    },configuracion).then(function(response){
                        me.close();
                        me.listar();
                        me.limpiar();                        
                    }).catch(function(error){
                        console.log(error);
                    });
                } else {
                    //Código para guardar
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                    axios.post('api/usuarios/Crear',{
                        'idrol':me.idrol,
                        'nombre':me.nombre,
                        'tipo_documento': me.tipo_documento,
                        'num_documento':me.num_documento,
                        'direccion':me.direccion,
                        'telefono': me.telefono,
                        'email':me.email,
                        'password':me.password

                        
                        
                    },configuracion).then(function(response){
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
                if (!this.idrol){
                    this.validaMensaje.push("Seleccione un rol.");
                }
                if (!this.tipo_documento || this.stock==0){
                    this.validaMensaje.push("Seleccione un tipo de documento.");
                }
                if (!this.email ){
                    this.validaMensaje.push("Ingrese un email valido.");
                }
                if (!this.password ){
                    this.validaMensaje.push("Ingrese un password valido.");
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
            activar(){
                let me=this;
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('api/usuarios/Activar/'+this.adId,{},configuracion).then(function(response){
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
                let header={"Authorization" : "Bearer " + this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('api/usuarios/Desactivar/'+this.adId,{},configuracion).then(function(response){
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
