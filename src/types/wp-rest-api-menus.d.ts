// https://wordpress.org/plugins/wp-rest-api-v2-menus/

export interface IWpMenuItem {
    ID: number;
    attr: string;
    children: IWpMenuItem[];
    classes: string;
    description: string;
    object: string;
    object_id: number;
    order: number;
    parent: number;
    target: string;
    title: string;
    type: string;
    type_label: string;
    url: string;
    xfn: string;
}