<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Usuarios</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Usuarios</li>
                    </ol>
                </div><!-- /.col -->
            </div>
            <div class="d-flex justify-content-center p-5">
                <div id="refrescar" class="container text-center d-flex flex-column align-items-centerjustify-content-center p-0 m-0" style="width: 70vw">
                    <!--  Alerta Usuario Guardado -->
                    <div id="alerta" class="alert alert-success" role="alert" hidden>
                        
                    </div>
                    <!--  Tabla  Usuarios -->
                    <div class="table-responsive border border-right-0 border-left-0 border-bottom-0 border-top-5 border-white rounded">
                        <table class="table table-hover table-striped align-middle display" id="tableUsersMenus">
                            <thead class="table-dark">
                                <tr>
                                    <th style="text-align:left; font-size:20px;" scope="col">ID</th>
                                    <th style="text-align:left; font-size:20px;" scope="col">Foto</th>
                                    <th style="text-align:left; font-size:20px;" scope="col">Nombre</th>
                                    <th style="text-align:left; font-size:20px;" scope="col">Username</th>
                                    <th style="text-align:left; font-size:20px;" scope="col">Correo</th>
                                    <th style="text-align:left; font-size:20px;" scope="col">Menú</th>
                                    <th scope="col" class=""><button class="btn btn-light rounded-circle border border-2 border-dark text-center" id="" onclick="abrir_modal_insert_usuario()" style="width:45px; height:45px; font-size:16px;" value="Agregar"><i class="fas fa-user-plus"></i></button></th>
                                </tr>
                            </thead>
                            <tbody id = "tableUsersMenuBody">

                            </tbody>
                        </table>
                        
                    </div>
                    <!-- Modal Insertar Usuario -->
                    <div class="modal fade" id="insertarModal" tabindex="-1" aria-labelledby="insertarModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="insertarModalLabel">Agregar Usuario</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="text-center">
                                        <form id="formAgregarUser" method="POST" enctype="multipart/form-data">
                                        <img id="imagenRecienSubida" src="<?php echo base_url('archivos/sin_foto.png') ?>" width="80px" height="80px" class="rounded-circle mt-3"><br><br>
                                        <div class="d-flex justify-content-around">
                                            <div>
                                                <label for="insertNombre">Nombre:</label><br>
                                                <input name="nombre" class="text-center" id="insertNombreUser" type="text" value=""/>
                                            </div>     
                                            <div>
                                                <label for="insertApellidos">Apellidos:</label><br>
                                                <input name="apellidos" class="text-center" id="insertApellidos" type="text" value=""/>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex justify-content-around">
                                            <div>
                                                <label for="insertUserMenu">Username:</label><br>
                                                <input name="username" class="text-center" id="insertUser" type="text" value=""/>   
                                            </div>     
                                            <div>
                                                <label for="insertContraseña">Contraseña:</label><br>
                                                <input name="password" class="text-center" id="insertContraseña" type="text" value=""/>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex justify-content-around">
                                            <div>
                                                <label for="insertCorreo">Correo:</label><br>
                                                <input name="email" class="text-center" id="insertCorreo" type="text" value=""/>
                                            </div>     
                                            <div>
                                                <label for="insertNIPUser">NIP:</label><br>
                                                <input name="password" class="text-center" id="insertNIPUser" type="text" value=""/>
                                            </div>
                                        </div>
                                        <br>
                                        <label for="insertFoto" class="mt-3">Foto:</label><br>
                                        <input name="img" accept="image/*" class="text-center" id="insertFoto" type="file" onchange="subir_foto_servidor()"/>
                                        <br>
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary" onclick="agregar_usuario()">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal Editar Usuario - Menú -->
                    <div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="editarModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="editarModalLabel">Editar Usuario</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="text-center">
                                        <form id="formEditarUser" method="POST" enctype="multipart/form-data">
                                        <img id="imagenRecienSubidaEditar" src="<?php echo base_url('archivos/sin_foto.png') ?>" width="80px" height="80px" class="rounded-circle mt-3"><br><br>
                                        <div class="d-flex justify-content-around">
                                            <input id="editarUserID" type="text" hidden/>
                                            <div>
                                                <label for="editarNombre">Nombre:</label><br>
                                                <input name="nombre" class="text-center" id="editarNombreUser" type="text" value=""/>
                                            </div>     
                                            <div>
                                                <label for="editarApellidos">Apellidos:</label><br>
                                                <input name="apellidos" class="text-center" id="editarApellidos" type="text" value=""/>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex justify-content-around">
                                            <div>
                                                <label for="editarUserMenu">Username:</label><br>
                                                <input name="username" class="text-center" id="editarUser" type="text" value=""/>   
                                            </div>     
                                            <div>
                                                <label for="editarContraseña">Contraseña:</label><br>
                                                <input name="password" class="text-center" id="editarContraseña" type="text" value=""/>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex justify-content-around">
                                            <div>
                                                <label for="editarCorreo">Correo:</label><br>
                                                <input name="email" class="text-center" id="editarCorreo" type="text" value=""/>
                                            </div>     
                                            <div>
                                                <label for="editarNIPUser">NIP:</label><br>
                                                <input name="password" class="text-center" id="editarNIPUser" type="text" value=""/>
                                            </div>
                                        </div>
                                        <br>
                                        <label for="editarFoto" class="mt-3">Foto:</label><br>
                                        <input name="img" accept="image/*" class="text-center" id="editarFoto" type="file" onchange="editar_foto_servidor()"/>
                                        <br>
                                        </form>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary" onclick="actualizar_usuario()">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal Borrar Usuario -->
                    <div class="modal fade" id="borrarModal" tabindex="-1" aria-labelledby="borrarModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="borrarModalLabel">Editar Menus</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="text-center">
                                        <h6>Seguro que deseas borrar este usuario?</h6>
                                        <input id="idBorrar" type="text" hidden/>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary" onclick="borrar_usuario()">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </div>
</div>