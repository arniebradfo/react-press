// https://developer.wordpress.org/rest-api/

export interface IWpId {
    id: number;
}

export interface IWpPrimitive extends IWpId {
    author: number;
    author_ref?: IWpUser;
    comment_status: 'open' | 'closed'; // TODO: add the rest
    content: IWpContentProtected;
    date: string | Date;
    date_gmt: string | Date;
    excerpt: IWpContentProtected;
    featured_media: number;
    featured_media_ref: IWpMedia;
    guid: IWpContent;
    link: string;
    menu_order: number;
    meta: string[]; // is this right?
    modified: string | Date; // Date?
    modified_gmt: string | Date; // Date?
    ping_status: 'open' | 'closed'; // TODO: add the rest
    slug: string;
    status: 'open' | 'closed' | 'publish' | 'inherit'; // ??? TODO: add the rest
    template: string;
    title: IWpContent;
    type: 'post' | 'page' | 'attachment'; // TODO: add the rest
}

export interface IWpPage extends IWpPrimitive {
    parent: number;
    _links: {
        about: IWpLinkHref[];
        author: IWpLinkHrefEmbeddable[];
        collection: IWpLinkHref[];
        curies: IWpCurie[];
        replies: IWpLinkHrefEmbeddable[];
        self: IWpLinkHref[];
        'version-history': IWpLinkHref[];
        'wp:attachment': IWpLinkHref[];
    };
}

export interface IWpPost extends IWpPrimitive {
    categories: number[];
    categories_ref?: IWpTaxonomy[];
    format: 'standard' | 'link' | 'video' | 'aside' | 'audio' | 'chat' | 'gallery' | 'image' | 'quote' | 'status';
    sticky: boolean;
    tags: number[];
    tags_ref?: IWpTaxonomy[];
    _links: {
        about: IWpLinkHref[];
        author: IWpLinkHrefEmbeddable[];
        collection: IWpLinkHref[];
        curies: IWpCurie[];
        replies: IWpLinkHrefEmbeddable[];
        self: IWpLinkHref[];
        'version-history': IWpLinkHref[];
        'wp:attachment': IWpLinkHref[];
        'wp:featuredmedia': IWpLinkHrefEmbeddable[];
        'wp:term': {
            embeddable: boolean;
            href: string;
            taxonomy: 'category' | 'post_tag'; // TODO: add the rest
        }[];
    };
}

export interface IWpMedia extends IWpPrimitive {
    description: IWpContent;
    caption: IWpContent;
    alt_text: string;
    media_type: 'image' | 'file';
    mime_type: string;
    media_details: IWpDetailsImg | IWpDetailsAudio | IWpDetailsVideo;
    post: number | null;
    source_url: string;
    _links: {
        about: IWpLinkHref[];
        author: IWpLinkHrefEmbeddable[];
        collection: IWpLinkHref[];
        self: IWpLinkHref[];
        replies: IWpLinkHrefEmbeddable[];
        curies: undefined;
        'version-history': undefined;
        'wp:attachment': undefined;
    };
}

export interface IWpTaxonomy extends IWpId { // IWpCategory & IWpTag
    count: number;
    description: string;
    link: string;
    meta: string[]; // ???
    name: string;
    parent: number;
    slug: string;
    taxonomy: 'category' | 'post_tag'; // ???
    _links: {
        about: IWpLinkHref[];
        collection: IWpLinkHref[];
        curies: IWpCurie[];
        self: IWpLinkHref[];
        'wp:post_type': IWpLinkHref[];
    };
}

export interface IWpUser extends IWpId {
    avatar_urls: IWpAvatarUrls;
    description: string;
    link: string;
    meta: string[];
    name: string;
    slug: string;
    url: string;
    _links: {
        collection: IWpLinkHref[];
        self: IWpLinkHref[];
    };
}

export interface IWpComment extends IWpId {
    author: number;
    author_ref: IWpUser;
    author_avatar_urls: IWpAvatarUrls;
    author_name: string;
    author_url: string;
    content: IWpContent;
    date: string | Date;
    date_gmt: string | Date;
    link: string;
    meta: string[];
    parent: number;
    post: number;
    status: 'approved' | 'pending';
    type: 'comment';
    _links: {
        author: IWpLinkHrefEmbeddable[];
        collection: IWpLinkHref[];
        self: IWpLinkHref[];
        up: {
            embeddable: boolean;
            href: string;
            post_type: 'post' | 'page'
        }[];
    };
    children?: IWpComment[];
    formOpen?: boolean;
}

export interface IWpOptions {
    discussion: {
        require_name_email: boolean;
        thread_comments: boolean;
        thread_comments_depth: number;
        show_avatars: boolean;
        avatar_default: 'mystery' | 'blank' | 'gravatar_default' | 'identicon' | 'wavatar' | 'monsterid' | 'retro';
        page_comments: boolean;
        comments_per_page: number;
        default_comments_page: 'newest' | string;
        comment_order: 'desc' | 'asc';
    };
    general: {
        admin_email: string;
        blogdescription: string;
        blogname: string;
        comment_registration: boolean;
        date_format: string;
        home: string;
        siteurl: string;
        start_of_week: Week;
        time_format: string;
        users_can_register: boolean;
    };
    permalinks: {
        permalink_structure: string;
        category_base: string;
        tag_base: string;
    };
    reading: {
        page_on_front: number;
        page_for_posts: number;
        posts_per_page: number;
        show_on_front: 'posts' | 'page';
        sticky_posts: number[];
    };
    widgets: {
        sidebars_widgets: {
            wp_inactive_widgets: string[];
            array_version: number;
        };
        widget_categories: {
            [id: number]: {
                title: string;
                count: number;
                hierarchical: number;
                dropdown: number;
            };
            _multiwidget: number;
        };
    };
    nonce: string;
}

export interface IWpError {
    code: string;
    data: { status: number };
    message: string;
}

interface IWpDetailsImg {
    width: number;
    height: number;
    file: string;
    sizes: {
        [size: string]: {
            file: string;
            width: number;
            height: number;
            mime_type: string;
            source_url: string;
        };
    };
    image_meta: {
        aperture: string;
        credit: string;
        camera: string;
        caption: string;
        created_timestamp: string;
        copyright: string;
        focal_length: string;
        iso: string;
        shutter_speed: string;
        title: string;
        orientation: string;
        keywords: string[];
    };
}

interface IWpDetailsAudio {
    dataformat: string;
    channels: number;
    sample_rate: number;
    bitrate: number;
    channelmode: string;
    bitrate_mode: string;
    lossless: boolean;
    encoder_options: string;
    compression_ratio: number;
    fileformat: string;
    filesize: number;
    mime_type: string;
    length: number;
    length_formatted: string;
    title: string;
    artist: string;
    track_number: string;
    part_of_a_set: string;
    year: string;
    genre: string;
    part_of_a_compilation: string;
    comment: string;
    encoded_by: string;
    album: string;
    sizes: {};
}

interface IWpDetailsVideo {
    filesize: number;
    mime_type: string;
    length: number;
    length_formatted: string;
    width: number;
    height: number;
    fileformat: string;
    dataformat: string;
    audio: {
        dataformat: string;
        codec: string;
        sample_rate: number;
        channels: number;
        bits_per_sample: number;
        lossless: boolean;
        channelmode: string;
    };
    created_timestamp?: number;
    sizes: {};
}

interface IWpAvatarUrls {
    24: string;
    48: string;
    96: string;
}

interface IWpContent {
    rendered: string;
}

interface IWpContentProtected extends IWpContent {
    protected: boolean;
}

interface IWpLinkHref {
    href: string;
}

interface IWpLinkHrefEmbeddable extends IWpLinkHref {
    embeddable: boolean;
}

interface IWpCurie {
    href: string;
    name: string;
    templated: boolean;
}

export enum Week {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
