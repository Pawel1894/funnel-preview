import { List, ListItem } from "@/libs/ui";

export function FunnelSidebar() {
  return (
    <aside className="flex flex-col p-4 border border-muted rounded-md h-full">
      <h2 className="text-lg font-semibold">Funnel pages</h2>
      <nav className="mt-4 space-y-2">
        <List className="w-full" ordered initialSelectedId="item1">
          <ListItem id="item1">Value proposition</ListItem>
          <ListItem id="item2">Goal</ListItem>
          <ListItem id="item3">Position</ListItem>
          <ListItem id="item4">Budget</ListItem>
        </List>
      </nav>
    </aside>
  );
}
