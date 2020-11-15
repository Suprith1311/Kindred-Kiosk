<?php
DEFINE('PHP_ENV', true ? 'production ' : 'development'); 
DEFINE('IMAGES_URI', get_template_directory_uri() . (trim(PHP_ENV) == 'production' ? '/dist/img/compressed' : '/assets/img'));
?>