export interface CursorPosition {
    left: number;
    width: number;
};

interface Tab {
    href: string;
    label: string;
    qnnty?: number;
}

export interface PaginationProps {
    tabs: Tab[];
}