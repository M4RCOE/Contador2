    <div class="d-flex justify-content-center align-items-center" style="min-height: calc(100vh - 60px - 60px); width: 100%;">
        <div class="table-responsive w-80">
            <table class="table w-100">
                <thead class="thead-dark">
                    <tr class="bg-dark text-white">
                        <th scope="col" hidden>IDUSER</th>
                        <th scope="col">FOTO</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col" hidden>USERNAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">BOTONES</th>
                    </tr>
                </thead>
                <tbody id="bodyTablaUsersServicio">
                    
                </tbody>
            </table>
        </div>
        <div id="modalesUsersServicio">

        </div>
    </div>
    <div class="modal fade bg-dark" id="ModalNIP" tabindex="-1" aria-labelledby="ModalNIPLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered border border-1 border-dark" style="width:80%;">
            <div class="modal-content border border-1 border-dark" >
                <div class="modal-header justify-content-center bg-dark border border-1 border-dark">
                    <h5 class="modal-title text-white fs-2" id="ModalNIPLabel">Ingrese su NIP</h5>
                </div>
                <div class="modal-body text-center bg-dark border border-1 border-dark">
                    <input id="idUserNIP" hidden/>
                    <input id="nip1" type="password" class="nip border border-3 border-white fs-2" maxlength=1 />
                    <input id="nip2" type="password" class="nip border border-3 border-white fs-2" maxlength=1 />
                    <input id="nip3" type="password" class="nip border border-3 border-white fs-2" maxlength=1 />
                    <input id="nip4" type="password" class="nip border border-3 border-white fs-2" maxlength=1 />
                </div>
                <div class="modal-footer justify-content-center bg-dark border border-1 border-dark">
                    <button type="button" class="btn text-white fs-2" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <div id="ModalCarga" class="modal-carga" tabindex="-1">
        <div class="d-flex justify-content-center">
            <div class="icono-carga spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <div>
        <input id="fechaInicioContador" type="text" placeholder="Fecha Inicio" hidden/>
        <input id="fechaContador" type="text" placeholder="Fecha" hidden/>
        <input id="fechaFinContador" type="text" placeholder="Fecha Fin" hidden/>
        <input id="tiempoContador" type="text" placeholder="Tiempo" hidden/>
        <input id="idUserContador" type="text" placeholder="ID User" hidden/>
    </div>