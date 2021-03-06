<?php

	function reactpress_theme_setup() {

		// load_theme_textdomain( 'reactpress', get_template_directory() . '/languages' );

		// add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		// add_theme_support( 'automatic-feed-links' );
		// add_theme_support( 'title-tag' );
		add_theme_support( 'post-formats', array( 'link', 'video', 'aside', 'audio', 'chat', 'gallery', 'image', 'quote', 'status' ) );
		add_post_type_support( 'post', 'post-formats' );
		add_post_type_support( 'page', 'post-formats' );

		// Nav Menus
		register_nav_menus( array(
			'primary'   => __( 'Navigation Menu', 'reactpress' ),
			'secondary' => __( 'Footer Menu', 'reactpress' ),
		) );

		// featured images aka thumbnails
		add_theme_support( 'post-thumbnails' );
 		set_post_thumbnail_size( 150, 150, true ); // default Post Thumbnail dimensions: 150px width x 150px height (cropped)
		update_option( 'thumbnail_size_w', 150 ); // don't depend on these 
		update_option( 'thumbnail_size_h', 150 ); // the size of these can be edited by the user

		// add image and manage image sizes
		add_image_size( 'small', 100 );
		update_option( 'medium_size_w', 300 ); // don't depend on these 
		update_option( 'medium_size_h', 300 ); // the size of these can be edited by the user
		update_option( 'medium_large_size_w', 768 );
		update_option( 'medium_large_size_h', 768 );	
		update_option( 'large_size_w', 1024 ); // don't depend on these 
		update_option( 'large_size_h', 1024 ); // the size of these can be edited by the user
		add_image_size( 'extralarge', 1600 );
		// more image sizes is good for page speed now that srcset is in wp core:
		// make.wordpress.org/core/2015/11/10/responsive-images-in-wordpress-4-4/

		// change option defaults - https://codex.wordpress.org/Option_Reference
		update_option('image_default_link_type', 'none');
		update_option('image_default_align', 'none');
		// update_option('uploads_use_yearmonth_folders', 0); // keep all uploaded images in the same folder
		update_option('use_smilies', 0); // because fuck smiling >:( 

	}
	add_action( 'after_setup_theme', 'reactpress_theme_setup' );

	function reactpress_scripts() {
		wp_register_script( 'wp-theme-options', false );
		wp_localize_script( 'wp-theme-options', 'WP_THEME_OPTIONS', reactpress_get_wp_options() );
		wp_enqueue_script(  'wp-theme-options');
	}
	add_action( 'wp_enqueue_scripts', 'reactpress_scripts' );

	// wpautop tries to add <p> tags around EVERYTHING. 
	// remove_filter('the_content', 'wpautop');
	// remove_filter('the_excerpt', 'wpautop');
	
	// REST API OPTIONS //
	// register REST API route to get wp options
	add_action( 'rest_api_init', function () {
		register_rest_route( 'reactpress/v2', '/options', array(
			array(
				'methods'  => WP_REST_Server::READABLE,
				'callback' => 'reactpress_get_rest_options',
			)
		) );
	});

	function reactpress_get_rest_options( WP_REST_Request $request ) {
		return new WP_REST_Response( reactpress_get_wp_options() );
	}
	
	function reactpress_get_wp_options() {

		// WP SETTINGS OPTIONS //
		// @link: https://codex.wordpress.org/Option_Reference
		return array(
			'discussion' => array(
				'require_name_email' => boolval(get_option('require_name_email')),
				'thread_comments' => boolval(get_option('thread_comments')),
				'thread_comments_depth' => intval(get_option('thread_comments_depth')),
				'show_avatars' => boolval(get_option('show_avatars')),
				'avatar_default' => get_option('avatar_default'),
				'page_comments' => boolval(get_option('page_comments')),
				'comments_per_page' => intval(get_option('comments_per_page')),
				'default_comments_page' => get_option('default_comments_page'),
				'comment_order' => get_option('comment_order'),
			),
			'general' => array(
				'admin_email' => get_option('admin_email'),
				'blogdescription' => get_option('blogdescription'),
				'blogname' => get_option('blogname'),
				'comment_registration' => boolval(get_option('comment_registration')),
				'date_format' => get_option('date_format'),
				'home' => get_option('home'),
				'siteurl' => get_option('siteurl'),
				'start_of_week' => intval(get_option('start_of_week')),
				'time_format' => get_option('time_format'),
				'users_can_register' => boolval(get_option('users_can_register')),
			),
			'permalinks' => array(
				'permalink_structure' => get_option('permalink_structure'),
				'category_base' => get_option('category_base'),
				'tag_base' => get_option('tag_base'),
			),
			'reading' => array(
				'page_on_front' => intval(get_option('page_on_front')),
				'page_for_posts' => intval(get_option('page_for_posts')),
				'posts_per_page' => intval(get_option('posts_per_page')),
				'show_on_front' => get_option('show_on_front'),
				'sticky_posts' => get_option('sticky_posts'),
			),
			'widgets' => array(
				'sidebars_widgets' => get_option('sidebars_widgets'),
				'widget_categories' => get_option('widget_categories'),
				// not sure what these are for...
				// 'widget_text' => get_option('widget_text'),
				// 'widget_rss' => get_option('widget_rss'),
			),
			// 'nonce' => wp_create_nonce( 'wp_rest' )
		);
	}

	// need this in order to post comments from the rest api
	// maybe wouldn't need it if you can figure out how to use a nonce here
	add_filter('rest_allow_anonymous_comments', '__return_true');

	// WIDGETS //
	// can't do widgets right now
	// function reactpress_widget_setup() {
	// 	register_sidebar( array(
	// 		'name'          => __( 'Footer Widgets', 'reactpress' ),
	// 		'id'            => 'footer-widgets',
	// 		'before_widget' => '<div id="%1$s" class="widget %2$s">',
	// 		'after_widget'  => '</div>',
	// 		'before_title'  => '<h3 class="widget-title">',
	// 		'after_title'   => '</h3>',
	// 	) );
	// }
	// add_action( 'widgets_init', 'reactpress_widget_setup' );

// stay cool y'all! 
?>
