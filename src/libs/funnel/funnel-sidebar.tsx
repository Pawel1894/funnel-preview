import { List, ListItem } from "@/libs/ui";
import { Page } from "./funnel";

type FunnelSidebarProps = {
  pages?: Page[];
  hasFunnel: boolean; // New prop that indicates if a funnel was uploaded
  onPageSelection?: (pageId: string) => void;
};

export function FunnelSidebar({ pages, onPageSelection, hasFunnel }: FunnelSidebarProps) {
  const hasPages = pages && pages.length > 0;

  return (
    <aside className="flex flex-col p-4 border border-muted rounded-md h-full">
      <h2 className="text-lg font-semibold">Funnel pages</h2>
      <nav className="mt-4 space-y-2">
        {hasPages && (
          <List className="w-full" initialSelectedId={pages[0].id} onSelect={onPageSelection}>
            {pages.map((page, i) => (
              <ListItem title={getPageTitle(i)} className="truncate" key={page.id} id={page.id}>
                {getPageTitle(i)}
              </ListItem>
            ))}
          </List>
        )}
        {hasFunnel && !hasPages && <span>Uploaded funnel has no pages.</span>}
      </nav>
    </aside>
  );
}

function getPageTitle(index: number) {
  return `Page no. ${index + 1}`;
}
