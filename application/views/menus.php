<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Menus</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?php echo base_url('') ?>">Inicio</a></li>
                        <li class="breadcrumb-item active">Menus</li>
                    </ol>
                </div><!-- /.col -->
          
            </div><!-- /.row -->
            <div class="h-100">
                <nav class="h-100">
                <!-- Tab Editar Menú -->
                <ul class="nav nav-tabs" id="myTab" role="tablist" style="height: 40px">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="editar-menu-tab" data-bs-toggle="tab" data-bs-target="#editar-menu" type="button" role="tab" aria-controls="editar-menu" aria-selected="true">
                            Editar Menú
                        </button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent" style="height: calc(100% - 40px);">
                    <!-- Tab Contenten Editar Menú -->
                    <div class="tab-pane fade show active" id="editar-menu" role="tabpanel" aria-labelledby="editar-menu-tab" style="height: calc(100%)">
                        <nav class="navbar navbar-expand navbar-light bg-light" style="height: 65px;">
                            <div class="container-fluid">
                                <ul class="navbar-nav me-auto mb-0 mb-lg-0">
                                    <li class="nav-item">
                                        <div class="input-group">
                                            <select id="select_de_menus" class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon" onchange="elegir_select_menu(this)">
                                                
                                            </select>
                                            <button class="btn btn-outline-secondary" type="button">
                                                Elegir
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <!-- Alerta Guardar Menú -->
                        <div id="alerta" class="alert alert-success" role="alert" hidden>
                            
                        </div>
                        <div class="d-flex align-items-start" style="height: calc(100% - 65px); width: 100%;">
                            <!-- Aside Menú -->
                            <aside class="d-flex align-items-start" style="height: 100%; width: 315px">
                                <div class="p-3 bg-white" style="width: 315px">
                                    <h6 class="pb-3">Agregar articulos al menú</h6>
                                    <ul class="list-unstyled ps-0">
                                        <!-- Crear Menú -->
                                        <li class="mb-1">
                                            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                                Crear menú
                                            </button>
                                            <div class="collapse" id="dashboard-collapse">
                                                <div class="d-flex flex-column">
                                                    <br>
                                                    <div class="d-flex justify-content-around">
                                                        <label class="col-4">Nombre:</label><input id="input_nombre_menu" class="col-8" type="text" />
                                                    </div> 
                                                    <br>
                                                    <div class="d-flex justify-content-end">
                                                        <button class="btn btn-primary" onclick="insert_menu()">Añadir al menú</button>
                                                    </div>         
                                                </div>
                                            </div>
                                        </li>
                                        <!-- Crear Enlace Menú -->
                                        <li class="mb-1">
                                            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                                Enlaces personalizados
                                            </button>
                                            <div class="collapse border border-1" id="orders-collapse">
                                                <div class="d-flex flex-column">
                                                    <br>
                                                    <div class="d-flex justify-content-around">
                                                        <label class="col-4">URL:</label><input id="inputURL" class="col-8" type="text" />
                                                    </div>
                                                    <br>
                                                    <div class="d-flex justify-content-between">
                                                        <label class="col-4">Texto del enlace: </label><input id="inputTextoURL" class="" type="text" />
                                                    </div>  
                                                    <br>
                                                    <div class="d-flex justify-content-end">
                                                        <button class="btn btn-primary" onclick="agregar_submenu()">Añadir al menú</button>
                                                    </div>         
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                            <!-- estructura Mostrar Menú -->
                            <div class="d-flex align-items-start h-100 border border-1" style="width: calc(100% - 315px);">
                                <div class="flex-shrink-0 p-3 bg-white w-100 h-100">
                                    <h6 class="pb-3">Estructura del menú</h6>
                                        <div class="d-flex flex-column border border-1 h- w-100">
                                            <div class="d-flex align-items-center justify-content-around pt-3 pb-3" style="background-color: lightgrey;">
                                                <label class="text-center">Nombre del menú</label><input class="" id="nombre_menu" class="" readonly/>
                                                <input id="input_id_menu" hidden/>
                                                <button class="btn btn-primary" onclick="guardar_menu()">Guardar</button>
                                            </div>
                                            <div>
                                                <p class="text-center" >Coloca los elementos en el orden que prefieras</p>
                                                <ol id="contenedor_menu" class="sortable">
                    
                                                </ol>     
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- Modal Editar Submenú -->
            <div class="modal fade" id="ModalEditarDetalleMenu" tabindex="-1" aria-labelledby="EditarDetalleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="EditarDetalleModalLabel">Editar</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <input id="input_id_detalle" value="" hidden/>
                            <input id="input_nivel_detalle" value=""/>
                            <label>Nombre:</label><br>
                            <input id="input_nombre_detalle" type="text"/><br>
                            <label>URL:</label><br>
                            <input id="input_url_detalle" type="text"/><br>
                            <label>Icono:</label><br>
                            <input id="input_icono_detalle" type="text" hidden/>
                            <select class="icono" onchange="$('#input_icono_detalle').val(this.value)">
                                <option value="fas fa-home">&#xf015;</option>
                                <option value="fas fa-car">&#xf1b9;</option>
                                <option value="fas fa-envelope">&#xf0e0;</option>
                                <option value="fas fa-check">&#xf00c;</option>
                                <option value="fas fa-archive">&#xf187;</option>
                                <option value="fas fa-child">&#xf1ae;</option>
                                <option value="fas fa-desktop">&#xf108;</option>
                                <option value="fas fa-file">&#xf15b;</option>
                                <option value="fas fa-info">&#xf129;</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" onclick="modificar_detalle()">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </div>
</div>