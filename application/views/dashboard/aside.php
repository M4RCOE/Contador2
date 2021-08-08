    <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img src="<?php echo base_url($this->session->userdata('user')['FOTO']) ?>" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <a href="#" class="d-block"><?php echo $this->session->userdata('user')['USERNAME']; ?></a>
                </div>
            </div>
            <nav class="mt-2">
        <?php 
          $idSession = $this->session->userdata('user')['IDUSER'];
        ?>
                <ul id="navMenus" class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


                </ul>
            </nav>
            <script>
                var sess = '<?php echo $idSession; ?>' ;
            </script>
        </div>
    <!-- /.sidebar -->
    </aside>