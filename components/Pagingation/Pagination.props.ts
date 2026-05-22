export interface CursorPosition {
    left: number;
    width: number;
};

interface Tab {
    href: string;
    label: string;
}

export interface PaginationProps {
    tabs: Tab[];
    isLoading: boolean;
}