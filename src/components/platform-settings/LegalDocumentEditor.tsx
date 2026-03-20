import { FileText, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ToolbarItem {
  id: string
  label?: string
  className?: string
  icon?: LucideIcon
}

interface LegalDocumentEditorProps {
  content: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  toolbarGroups?: ToolbarItem[][]
}

const defaultToolbarGroups: ToolbarItem[][] = [
  [
    { id: "bold", label: "B", className: "font-semibold" },
    { id: "italic", label: "/", className: "italic" },
    { id: "underline", label: "U", className: "underline" },
  ],
  [
    { id: "h1", label: "H1" },
    { id: "h2", label: "H2" },
    { id: "h3", label: "H3" },
  ],
  [
    { id: "document", icon: FileText },
    { id: "list", label: "List" },
  ],
] as const

function LegalDocumentEditor({
  content,
  onChange,
  toolbarGroups = defaultToolbarGroups,
}: LegalDocumentEditorProps) {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <div className="flex h-11 items-center gap-1 border-b border-slate-200 bg-slate-50 px-3">
        {toolbarGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-0.5">
            {group.map((toolbarItem) => (
              <Button
                key={toolbarItem.id}
                type="button"
                variant="ghost"
                className="h-8 rounded-md px-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                {"icon" in toolbarItem && toolbarItem.icon ? (
                  <toolbarItem.icon className="h-4 w-4" />
                ) : (
                  <span className={toolbarItem.className}>
                    {toolbarItem.label ?? ""}
                  </span>
                )}
              </Button>
            ))}

            {groupIndex < toolbarGroups.length - 1 ? (
              <div className="mx-1 h-5 w-px bg-slate-200" />
            ) : null}
          </div>
        ))}
      </div>

      <textarea
        value={content}
        className="min-h-96 w-full resize-none border-0 p-6 text-base leading-7 text-slate-900 focus-visible:outline-none"
        onChange={onChange}
      />
    </div>
  )
}

export default LegalDocumentEditor
