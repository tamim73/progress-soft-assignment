export type ITableColumnType = 'normal' | 'actions' | 'datetime';

export interface ITableCol {
    name: string;
    label: string;
    notSortable?: boolean;
    width?: string;
}

export type ITableEventActions = 'row_click' | 'details_click' | 'edit_click' | 'delete_click' | string;

export interface ITableEvent {
    action: ITableEventActions;
    row: any;
}
