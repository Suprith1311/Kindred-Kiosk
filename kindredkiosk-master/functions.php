<?php

show_admin_bar( false );

require_once('inc/constantes.php');

function theme_options() {
    // add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('menus');
 };
 add_action( 'after_setup_theme', 'theme_options' );

function add_theme_scripts() {
    wp_enqueue_style( 'index', get_template_directory_uri() . '/dist/index.css', array(), '1.1', 'all');
    wp_enqueue_script( 'index', get_template_directory_uri() . '/dist/index.js', array(), '1.1', false);
}

add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );