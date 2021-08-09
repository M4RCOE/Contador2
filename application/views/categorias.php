<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Categorías</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?php echo base_url('') ?>">Inicio</a></li>
                        <li class="breadcrumb-item active">Categorías</li>
                    </ol>
                </div><!-- /.col -->
            </div>
            <div class="d-flex justify-content-center pl-3 pr-3 pt-1">
                <div class="formulario d-flex flex-column" style="width:40%;">
                    <br />
                    <h4 class="titulo">Añadir nueva sección</h4>
                    <br />
                    <label>Nombre</label>
                    <input type="text" id="inputNombreCategoria" />
                    <p class="descripcion">El nombre es cómo aparecerá en tu sitio</p>
                    <br />
                    <label>Slug</label>
                    <input type="text" id="inputSlugCategoria" />
                    <p class="descripcion">
                        El "slug" es la versión amigable de la URL del nombre. suele estar en minúsculas y contiene solo letras, números y guiones.
                    </p>
                    <br />
                    <label>Descripción</label>
                    <textarea id="inputDescripcionCategoria"></textarea>
                    <p class="descripcion">
                        La descripción no suele mostrarse por defecto, sin embargo hay algunos temas que puede que la muestren.
                    </p>
                    <br />
                    <div>
                        <button class="btn btn-primary" onclick="insert_categoria()">
                            Añadir nueva categoría
                        </button>
                    </div>
                </div>
                <div class="table-responsive border ml-3 border-right-0 border-left-0 border-bottom-0 border-top-5 border-white rounded" style="width:60%">
                    <table id="tablaCategorias" class="table table-hover table-striped align-middle display">
                        <thead class="table-dark">
                            <tr>
                                <td style="text-align:center; font-size:20px;">Nombre</td>
                                <td style="text-align:center; font-size:20px;">Descripción</td>
                                <td style="text-align:center; font-size:20px;">Slug</td>
                                <td style="text-align:center; font-size:20px;">Cantidad</td>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaCategoria">

                        </tbody>
                    </table>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </div>
</div> 
<script src="<?php echo base_url('js/categorias.js') ?>"></script>