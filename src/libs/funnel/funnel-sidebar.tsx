import { List, ListItem } from "@/libs/ui";
import { Page } from "./funnel";
import { createPageName } from "./pages";

type FunnelSidebarProps = {
  pages: Page[];
  currentPage?: Page;
  onPageSelection: (pageId: string) => void;
};

export function FunnelSidebar({ pages, onPageSelection, currentPage }: FunnelSidebarProps) {
  const hasPages = pages && pages.length > 0;

  return (
    <aside className="flex flex-col p-4 border border-muted rounded-md h-full">
      <h2 className="text-lg font-semibold">Funnel pages</h2>
      <nav className="mt-4 space-y-2">
        {hasPages ? (
          <List className="w-full" selectedItem={currentPage?.id} onSelect={onPageSelection}>
            {pages.map((page, i) => (
              <ListItem title={createPageName(i)} className="truncate" key={page.id} id={page.id}>
                {createPageName(i)}
              </ListItem>
            ))}
          </List>
        ) : (
          <span className="text-sm text-muted-foreground">No pages found</span>
        )}
      </nav>
    </aside>
  );
}
