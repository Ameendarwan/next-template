export interface SidebarItem {
  id: string;
  title: string;
  path: string;
  icon: JSX.Element;
  step?: number;
  children: SidebarItem[];
}
