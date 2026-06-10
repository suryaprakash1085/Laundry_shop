import { useState } from "react";
import { Plus, Shirt } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { DataTableColumn } from "@/components/admin/DataTable";
import EntityModal from "@/components/admin/EntityModal";
import { RowActionType } from "@/components/admin/RowActions";
import { Button } from "@/components/ui/button";
import { clothingItems, type ClothingItem } from "@/data/itemPricing";
import { toast } from "sonner";

const fmt = (n: number) => (n > 0 ? `$${n}` : "—");

const AdminItemPricing = () => {
  const [items, setItems] = useState<ClothingItem[]>(clothingItems);
  const [mode, setMode] = useState<RowActionType | null>(null);
  const [selected, setSelected] = useState<ClothingItem | null>(null);

  const columns: DataTableColumn<ClothingItem>[] = [
    {
      key: "name", header: "Item", render: (r) => (
        <span className="inline-flex items-center gap-2 font-medium">
          <span className="h-8 w-8 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center shadow-soft">
            <Shirt className="h-4 w-4" />
          </span>
          {r.name}
        </span>
      ),
    },
    { key: "category", header: "Category", hideOnMobile: true, render: (r) => <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">{r.category}</span> },
    { key: "wash", header: "Wash", align: "right", render: (r) => <span className="font-semibold">{fmt(r.wash)}</span> },
    { key: "dryClean", header: "Dry Clean", align: "right", hideOnMobile: true, render: (r) => <span className="font-semibold">{fmt(r.dryClean)}</span> },
    { key: "iron", header: "Iron", align: "right", hideOnMobile: true, render: (r) => <span className="font-semibold">{fmt(r.iron)}</span> },
    { key: "premium", header: "Premium", align: "right", render: (r) => <span className="font-semibold text-gradient">{fmt(r.premium)}</span> },
    { key: "turnaround", header: "TAT", hideOnMobile: true, render: (r) => <span className="text-xs text-muted-foreground">{r.turnaround}</span> },
  ];

  const handleConfirm = () => {
    if (!selected || !mode) return;
    if (mode === "delete") {
      setItems(items.filter((i) => i.id !== selected.id));
      toast.success(`${selected.name} removed`);
    } else {
      toast.success(`${selected.name} updated`);
    }
  };

  return (
    <>
      <PageHeader
        title="Item Pricing"
        subtitle="Per-garment price list — wash, dry clean, iron & premium."
        actions={<Button variant="hero" size="sm" onClick={() => toast("New item form (demo)")}><Plus className="h-4 w-4" /> New Item</Button>}
      />
      <DataTable<ClothingItem>
        columns={columns}
        rows={items}
        searchPlaceholder="Search items..."
        searchKeys={["name", "category"]}
        onAction={(row, a) => { setSelected(row); setMode(a); }}
      />
      <EntityModal
        open={!!mode}
        onOpenChange={(v) => !v && setMode(null)}
        mode={mode}
        title={selected?.name || ""}
        subtitle={selected ? `${selected.category} • ${selected.turnaround}` : ""}
        fields={selected ? [
          { label: "Name", value: selected.name },
          { label: "Category", value: selected.category },
          { label: "Wash", value: fmt(selected.wash) },
          { label: "Dry Clean", value: fmt(selected.dryClean) },
          { label: "Iron", value: fmt(selected.iron) },
          { label: "Premium", value: fmt(selected.premium) },
          { label: "Turnaround", value: selected.turnaround, full: true },
        ] : []}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default AdminItemPricing;
