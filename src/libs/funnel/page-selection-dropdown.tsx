import { Dropdown, List, ListItem, DropdownContent } from "@/libs/ui";
import { Page } from "./funnel";
import { createPageName } from "./pages";

export function PageSelectionDropdown({
  pages,
  currentPage,
  onPageChange,
}: {
  pages: Page[];
  currentPage?: Page;
  onPageChange: (pageId: string) => void;
}) {
  return (
    <Dropdown
      selectedText={createPageName(pages.findIndex((p) => p.id === currentPage?.id))}
      placeholder="Select page"
      className="w-full"
    >
      <DropdownContent>
        <List selectedItem={currentPage?.id} onSelect={onPageChange}>
          {pages.map((page, i) => (
            <ListItem
              key={page.id}
              title={createPageName(i)}
              className="truncate"
              id={page.id}
            >
              {createPageName(i)}
            </ListItem>
          ))}
        </List>
      </DropdownContent>
    </Dropdown>
  );
}
