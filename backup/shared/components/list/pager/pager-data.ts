export interface PagerData {
    current_page: number;
    from: number;
    to: number;
    total: number;
    last_page: number;
    per_page: number;
}

export interface PagerJSONData extends PagerData {
	data: { [key: string] : any }[];
}
