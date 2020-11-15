<?php get_header(); ?>

<section class="home">
  <a href="http://kindredkiosk.com.au/filter/">
    <img src="<?php echo IMAGES_URI . '/white_logo.png' ?>" class="logo">

    <div class="home__header">
      <video autoplay muted loop class="video">
        <source src="<?php echo IMAGES_URI . '/background.mp4' ?>" type="video/mp4">
      </video>

      <div class="header__text">
        <p>the home of virtual<br>
          <b>real estate</b></p>
      </div>

      <p><img src="<?php echo IMAGES_URI . '/touch@2x.png' ?>" class=""/>touch screen to start</p>
      <div class="header__background"></div>
    </div>
  </a>
</section>

<?php get_footer(); ?>