<!--  Google Maps API  -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Sitios</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?php echo base_url('') ?>">Inicio</a></li>
                        <li class="breadcrumb-item active">Sitios</li>
                    </ol>
                </div><!-- /.col -->
            </div>
            <div class="d-flex justify-content-center pl-3 pr-3 pt-1">
                <div class="formulario d-flex flex-column" style="width:40%;">
                    <br />
                    <h4 class="titulo">Añadir nuevo sitio</h4>
                    <br />
                    <label>Nombre</label>
                    <input type="text" id="inputNombreSitio" />
                    <p class="descripcion"></p>
                    <br />
                    <label>Cliente</label>
                    <input type="text" id="inputClienteSitio" />
                    <p class="descripcion"></p>
                    <br />
                    <label>Domicilio</label>
                    <input type="text" id="inputDomicilioSitio" />
                    <p class="descripcion"></p>
                    <br />
                    <div style="display: flex; flex-direction: column">
                        <label>Descripción</label>
                        <textarea id="inputDescripcionSitio"></textarea>
                        <p class="descripcion"></p>
                    </div>
                    <br />
                    <label>Ubicación GPS</label>
                    <div style="height: 300px">
                        <div class="map" id="map" style="overflow:visible !important"></div>
                    </div>
                    <input id="inputUbicacionSitio" type="text" hidden/>
                    <p class="descripcion"></p>
                    <br />
                    <label>Contacto</label>
                    <input type="text" id="inputContactoSitio" />
                    <p class="descripcion"></p>
                    <br />
                    <label>Telefono</label>
                    <input type="tel" id="inputTelefonoSitio" maxlength="10" minlength="10"/>
                    <p class="descripcion"></p>
                    <br />
                    <div>
                        <button class="btn btn-primary" onclick="anade_sitio()">
                            Añadir nuevo sitio
                        </button>
                    </div>
                    <br />
                </div>
                <div class="table-responsive border ml-3 border-right-0 border-left-0 border-bottom-0 border-top-5 border-white rounded" style="width:60%">
                    <table id="tablaSitios" class="table table-hover table-striped align-middle display">
                        <thead class="table-dark">
                            <tr>
                                <td style="text-align:center; font-size:20px;">Nombre</td>
                                <td style="text-align:center; font-size:20px;">Descripción</td>
                                <td style="text-align:center; font-size:20px;">Cliente</td>
                                <td style="text-align:center; font-size:20px;">Domicilio</td>
                                <td style="text-align:center; font-size:20px;">Ubicación GPS</td>
                                <td style="text-align:center; font-size:20px;">Contacto</td>
                                <td style="text-align:center; font-size:20px;">Teléfono</td>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaSitio">

                        </tbody>
                    </table>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </div>
</div>
<script src="<?php echo base_url('js/sitios.js') ?>"></script> 
