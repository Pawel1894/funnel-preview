import { List, ListItem } from "@/libs/ui";
import { Page } from "./domain/funnel";
import { createPageName } from "./pages";

type FunnelSidebarProps = {
  pages: Page[];
  currentPage?: Page;
  onPageSelection: (pageId: string) => void;
};

export function FunnelSidebar({ pages, onPageSelection, currentPage }: FunnelSidebarProps) {
  const hasPages = pages && pages.length > 0;

  return (
    <aside className="flex flex-col border border-muted rounded-md h-full min-h-0 overflow-hidden">
      <nav className="mt-4 space-y-2 h-full">
        {hasPages ? (
          <List
            className="w-full min-h-full h-0 overflow-y-auto"
            selectedItem={currentPage?.id}
            onSelect={onPageSelection}
          >
            <div className="px-4">
              {pages.map((page, i) => (
                <ListItem title={createPageName(i)} className="truncate" key={page.id} id={page.id}>
                  {createPageName(i)}
                </ListItem>
              ))}
            </div>
          </List>
        ) : (
          <span className="text-sm text-muted-foreground">No pages found</span>
        )}
      </nav>
    </aside>
  );
}
