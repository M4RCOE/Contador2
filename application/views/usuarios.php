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
                        <li class="breadcrumb-item"><a href="<?php echo base_url('') ?>">Inicio</a></li>
                        <li class="breadcrumb-item active">Usuarios</li>
                    </ol>
                </div><!-- /.col -->
            </div>
            <div class="d-flex justify-content-center pl-3 pr-3 pt-1">
                <div class="formulario d-flex flex-column" style="width:40%;">
                    <br />
                    <h4 class="titulo">Añadir nuevo Usuario</h4>
                    <br />
                    <label>Nombre</label>
                    <input type="text" id="inputNombreUsuario" />
                    <p class="descripcion"></p>
                    <br />
                    <label>Email</label>
                    <input type="email" id="inputEmailUsuario" />
                    <p class="descripcion"></p>
                    <br />
                    <label>Contraseña</label>
                    <input type="password" id="inputContraseñaUsuario" />
                    <p class="descripcion"></p>
                    <br />
                    <div class="d-flex justify-content-around">
                        <div>
                        <label>Menú Activo</label><br>
                            <select>
                                <option>Elige...</option>
                            </select>
                        </div>
                        <div>
                            <label>Sucursal</label><br>
                            <select>
                                <option>Elige...</option>
                            </select>
                        </div>
                        <div>
                            <label>Departamento</label><br>
                            <select>
                                <option>Elige...</option>
                            </select>
                        </div>
                    </div>
                    <br />
                    <label>Teléfono</label>
                    <input type="tel" id="inputTelefonoUsuario" maxlength="10" />
                    <p class="descripcion"></p>
                    <br />
                    <div class="d-flex justify-content-around">
                        <div>
                            <label>Activo</label>
                            <input type="checkbox" id="inputActivoUsuario" checked />
                        </div>
                        <div>
                            <label>WAdmin</label>
                            <input type="checkbox" id="inputWAdminUsuario" />
                        </div>
                        <div>
                            <label>SysAdmin</label>
                            <input type="checkbox" id="inputSysAdminUsuario" />
                        </div>
                    </div>
                    <br />
                    <div>
                        <button class="btn btn-primary" onclick="">
                            Añadir nuevo usuario
                        </button>
                    </div>
                    <br />
                </div>
                <div class="table-responsive border ml-3 border-right-0 border-left-0 border-bottom-0 border-top-5 border-white rounded" style="width:60%">
                    <table id="tablaUsuarios" class="table table-hover table-striped align-middle display">
                        <thead class="table-dark">
                            <tr>
                                <td style="text-align:center; font-size:20px;">Nombre</td>
                                <td style="text-align:center; font-size:20px;">Email</td>
                                <td style="text-align:center; font-size:20px;">Contraseña</td>
                                <td style="text-align:center; font-size:20px;">MenúActivo</td>
                                <td style="text-align:center; font-size:20px;">Sucursal</td>
                                <td style="text-align:center; font-size:20px;">Departamento</td>
                                <td style="text-align:center; font-size:20px;">Teléfono</td>
                                <td style="text-align:center; font-size:20px;">Activo</td>
                                <td style="text-align:center; font-size:20px;">WAdmin</td>
                                <td style="text-align:center; font-size:20px;">SysAdmin</td>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaUsuarios">

                        </tbody>
                    </table>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </div>
</div> 
<script src="<?php echo base_url('js/ma_usuarios.js') ?>"></script> 