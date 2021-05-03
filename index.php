<?php
    include("admin/_conexion.php");
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>El Carbonero San Miguel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="images//el_carbonero.ico" type="image/icon" sizes="16x16">
    <!-- custom css -->
    <link rel="stylesheet" href="css/style.css">
    <!-- google fonts -->
    <link rel="stylesheet" href="css/fonts.css">
    <!-- font awesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
    <!-- normalize css -->
    <link rel="stylesheet" href="css/normalize.css">
    <!-- magnific popup -->
    <link rel="stylesheet" href="css/magnific-popup.css">
    <!-- slick css -->
    <link rel="stylesheet" href="css/slick.css">
    <link rel="stylesheet" href="css/slick-theme.css">
    <!-- animate on scroll -->
    <link rel="stylesheet" href="css/aos.css">
</head>

<body>

    <!-- navbar -->
    <nav class="navbar">
        <div class="nav-brand-toggler">
            <a href="index.php" class="navbar-brand">El <span>.</span> Carbonero</a>
            <button type="button" class="navbar-toggler" id="navbar-toggler">
          <i class = "fas fa-bars"></i>
        </button>
        </div>

        <div class="navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#home" class="nav-link">Inicio</a>
                </li>
                <li class="nav-item">
                    <a href="#chef" class="nav-link">Personal</a>
                </li>
                <li class="nav-item">
                    <a href="#menu" class="nav-link">Menu</a>
                </li>
                <li class="nav-item">
                    <a href="#contact" class="nav-link">Contactanos</a>
                </li>
                <li class="nav-item">
                    <a href="#nosotros" class="nav-link">Nosotros</a>
                </li>
            </ul>

            <div class="nav-info">
                <span class="call-info">
            <i class = "fas fa-phone"></i>
            7924-8917
          </span>
                
            </div>
        </div>
    </nav>
    <!-- end of navbar -->

    <!-- header -->
    <header class="header" id="home">
        <div class="container">
            <h2>Comida rapida al instante</h2>
            <h1 class="header-title">Disfruta de nuestra deliciosa comida todos los dias</h1>
        </div>
    </header>


    <!-- end of header -->

    <!-- about -->
    
    <!-- end of about -->

    <!-- chef -->
    <section id="chef" class="chef section-py">
        <div class="container">
            <!-- title -->
            <div class="title">
                <h4>Conoce nuestros empleados</h4>
                <h2>Este es nuestro excelente personal</h2>
            </div>
            <!-- end of title -->

            <div class="chef-wrapper" data-aos="fade-up">
                <?php
                    $sql = "SELECT * FROM tblempleado where deleted is NULL and tblempleado.id_empleado > 1";
                    $query = _query($sql);
                    
                    while($row = _fetch_array($query)){
                        if($row['imagen'] == ""){
                            $imagen = "admin/img/publicacion_defecto.jpg";
                        }
                        else{
                            $imagen = "admin/".$row['imagen'];
                        }
                        ?>
                        <div class="chef-item">
                            <div class="chef-item-img">
                                <img src="<?php echo $imagen; ?>" alt="chef image">
                                <div class="chef-overlay">
                                    <p><?php   echo $row['nombre']." ".$row['apellido']; ?></p>
                                    
                                </div>
                            </div>
                            <div class="chef-item-footer">
                                <h2><?php   echo $row['nombre']." ".$row['apellido']; ?></h2>
                                
                            </div>
                        </div>


                        <?php
                    }
                ?>
           
                <!-- item -->
                
                <!-- end of item -->

                <!-- item -->
                
                <!-- end of item -->
            </div>
        </div>
    </section>
    <!--- end of chef -->


    <!-- menu -->
    <section id="menu" class="menu section-py">
        <!-- title -->
        <div class="title">
            <h4>Prueba nuestra comida</h4>
            <h2>Una comida de la que nunca te vas arrpentir</h2>
        </div>
        <!-- end of title -->

        <div class="menu-wrapper popup-gallery" data-aos="fade-up">



        <?php
            $sql = "SELECT tblplatillos.nombre, tblplatillos.descripcion, tblplatillos.precio, tblcategorias.nom_categoria, tblplatillos.imagen FROM tblplatillos INNER JOIN tblcategorias on tblplatillos.id_categoria = tblcategorias.id_categoria WHERE tblplatillos.deleted is NULL";
            $query = _query($sql);
            while($row = _fetch_array($query)){
                if($row['imagen'] == ""){
                    $imagen = "admin/img/comida_defecto.jpg";
                }
                else{
                    $imagen = "admin/".$row['imagen'];
                }
                ?>
                    <div class="menu-item">
                        <a href="<?php echo $imagen; ?>">
                            <img src="<?php echo $imagen; ?>" alt="food image">
                            <div class="menu-overlay">
                                <div class="menu-overlay-content">
                                    <div>
                                        <h2><?php  echo $row['nombre']; ?></h2>
                                        <h2><?php  echo "$".number_format($row['precio'],2); ?></h2>
                                    </div>
                                    <h5><?php  echo $row['nom_categoria']; ?></h5>
                                </div>
                            </div>
                        </a>
                    </div>
                <?php
            }

        ?>
          
        </div>
    </section>
    <!-- end of menu -->

    <!-- testimonial -->
    
    <!-- end of testimonial -->

    <!-- contact -->
    <section id="contact" class="contact section-py">
        <div class="contact-wrapper container">
            <div class="contact-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2705.3383211298383!2d-88.18727810708843!3d13.479864193134345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7b2bf29743431f%3A0x8353ec28fed84fcb!2sCarbonero%20Roosevelt!5e0!3m2!1ses-419!2ssv!4v1619925387362!5m2!1ses-419!2ssv"
                    width="100%" height="500px" frameborder="0" style="border:0;" allowfullscreen="allowfullscreen" aria-hidden="false" tabindex="0"></iframe>
            </div>

            <div class="contact-info">
                <!-- title -->
                <div class="title">
                    <h2>Contactanos</h2>
                </div>
                <!-- end of title -->
                <form class="contact-form" action="admin/bd.php" method="post">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Nombre completo" name="nombre" id="nombre" required>
                        <input type="email" class="form-control" placeholder="Correo electronico" name="correo" id="correo" required>
                    </div>
                    <input type="text" class="form-control" placeholder="Asunto" name="asunto" id="asunto" required>
                    <textarea rows="5" class="form-control" placeholder="Cuentanos de tu proyecto" name="descripcion" id="descripcion" required></textarea>
                    <input type="submit" class="btn contact-btn" value="Envianos tu mensaje" id="btnEnviarMensaje">
                </form>
            </div>
        </div>
    </section>
    <section id="nosotros" class="contact section-py">
        <div class="container">
            
            <h1 class="title">MISION:</h1>
            <h2>Ser uno de los restaurantes con mejor servicio al cliente en el area de San Miguel, y ademas poder brindarle a los cliente un exquisito menu de comidas y bebidas.</h2>
        </div>
        <br>
        <div class="container">
            
            <h1 class="title">VISION:</h1>
            <h2>Ser un restaurante reconocido a nivel nacional como uno de los mejores por su servicio al cliente, y por su exquisito menu</h2>
        </div>
    </section>
    <!-- end of contact -->
                    


    <!-- jQuery -->
    <script src="js/jquery-3.5.1.js"></script>
    <!-- magnific popup -->
    <script src="js/jquery.magnific-popup.min.js"></script>
    <!-- slick js -->
    <script src="js/slick.min.js"></script>
    <!-- custom js -->
    <script src="js/script.js"></script>
    <!-- animate on scroll -->
    <script src="js/aos.js"></script>
</body>

</html>