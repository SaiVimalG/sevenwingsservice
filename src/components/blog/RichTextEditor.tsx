import { useCallback, useEffect, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import { Node, Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle, Color, FontSize } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Trash2,
  Columns,
  Rows,
  Merge,
  Split,
  Heading,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  onUploadImage: (file: File) => Promise<string>;
}

const FONT_SIZES = [
  { label: "Small", value: "13px" },
  { label: "Normal", value: "16px" },
  { label: "Large", value: "20px" },
  { label: "X-Large", value: "26px" },
  { label: "Huge", value: "34px" },
];

const COLORS = ["#0d2e7d", "#c79a3b", "#1f2937", "#dc2626", "#16a34a", "#2563eb", "#7c3aed", "#000000"];

const LINE_HEIGHTS = [
  { label: "Tight", value: "1.2" },
  { label: "Normal", value: "1.5" },
  { label: "Relaxed", value: "1.8" },
  { label: "Loose", value: "2.2" },
  { label: "Extra Loose", value: "2.6" },
];

type CtaVariant = "eligibility" | "contact" | "both";

const CTA_CONTENT: Record<
  CtaVariant,
  { title: string; text: string; buttons: { label: string; href: string; style: "primary" | "outline" }[] }
> = {
  eligibility: {
    title: "Check your eligibility in minutes",
    text: "Use our free assessment tool to see which immigration program fits you best.",
    buttons: [{ label: "Check Your Eligibility", href: "/eligibility", style: "primary" }],
  },
  contact: {
    title: "Have questions? Let's talk.",
    text: "Book a free consultation with a senior 7 Wings immigration consultant.",
    buttons: [{ label: "Contact Us", href: "/contact", style: "primary" }],
  },
  both: {
    title: "Ready to take the next step?",
    text: "Check your eligibility instantly, or talk to a senior 7 Wings consultant today.",
    buttons: [
      { label: "Check Your Eligibility", href: "/eligibility", style: "primary" },
      { label: "Contact Us", href: "/contact", style: "outline" },
    ],
  },
};

function ctaSpec(variant: CtaVariant) {
  const c = CTA_CONTENT[variant] ?? CTA_CONTENT.both;
  return [
    "div",
    { "data-cta": variant, class: "blog-cta" },
    ["p", { class: "blog-cta-title" }, c.title],
    ["p", { class: "blog-cta-text" }, c.text],
    [
      "div",
      { class: "blog-cta-actions" },
      ...c.buttons.map((b) => ["a", { href: b.href, class: `blog-cta-btn blog-cta-btn-${b.style}` }, b.label]),
    ],
  ];
}

// Custom block that renders a branded CTA card. It serializes to plain HTML
// (<div data-cta="...">…</div>) so the published article shows the same card.
const CtaCard = Node.create({
  name: "ctaCard",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      variant: {
        default: "both",
        parseHTML: (el) => (el as HTMLElement).getAttribute("data-cta") || "both",
        renderHTML: () => ({}),
      },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-cta]" }];
  },
  renderHTML({ node }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ctaSpec(node.attrs.variant as CtaVariant) as any;
  },
});

const LineHeight = Extension.create({
  name: "lineHeight",
  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight?.replace(/px$/, "") || null,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) return {};
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ chain }) => {
          return chain()
            .focus()
            .updateAttributes("paragraph", { lineHeight })
            .updateAttributes("heading", { lineHeight })
            .run();
        },
      unsetLineHeight:
        () =>
        ({ chain }) => {
          return chain()
            .focus()
            .updateAttributes("paragraph", { lineHeight: null })
            .updateAttributes("heading", { lineHeight: null })
            .run();
        },
    };
  },
});

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`grid h-8 w-8 place-items-center rounded-md border text-navy-deep transition-colors disabled:opacity-40 ${
        active ? "border-gold bg-gold/15" : "border-black/10 bg-white hover:border-gold"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-0.5 h-6 w-px self-center bg-black/10" />;
}

export function RichTextEditor({ value, onChange, onUploadImage }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" } },
        heading: { levels: [2, 3] },
      }),
      TextStyle,
      Color,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, HTMLAttributes: { class: "rounded-xl" } }),
      TableKit.configure({ table: { resizable: true } }),
      LineHeight,
      CtaCard,
    ],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class: "blog-content focus:outline-none min-h-[360px]",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync external value changes (e.g. when loading an existing post).
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value && value !== current) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  const handleFile = useCallback(
    async (file: File) => {
      if (!editor) return;
      try {
        const url = await onUploadImage(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (e) {
        alert(e instanceof Error ? e.message : "Image upload failed");
      }
    },
    [editor, onUploadImage],
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return <div className="min-h-[360px] rounded-xl border border-black/10 bg-white" />;
  }

  const e = editor as Editor;
  const inTable = e.isActive("table");

  return (
    <div className="rounded-xl border border-black/10 bg-white">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-t-xl border-b border-black/10 bg-cream/60 p-2 backdrop-blur">
        <Btn title="Undo" onClick={() => e.chain().focus().undo().run()} disabled={!e.can().undo()}>
          <Undo className="h-4 w-4" />
        </Btn>
        <Btn title="Redo" onClick={() => e.chain().focus().redo().run()} disabled={!e.can().redo()}>
          <Redo className="h-4 w-4" />
        </Btn>
        <Divider />

        <Btn title="Paragraph" active={e.isActive("paragraph")} onClick={() => e.chain().focus().setParagraph().run()}>
          <Pilcrow className="h-4 w-4" />
        </Btn>
        <Btn title="Heading 2" active={e.isActive("heading", { level: 2 })} onClick={() => e.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </Btn>
        <Btn title="Heading 3" active={e.isActive("heading", { level: 3 })} onClick={() => e.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="h-4 w-4" />
        </Btn>
        <Divider />

        {/* Font size */}
        <select
          title="Font size"
          value={(e.getAttributes("textStyle").fontSize as string) || ""}
          onChange={(ev) => {
            const v = ev.target.value;
            if (!v) e.chain().focus().unsetFontSize().run();
            else e.chain().focus().setFontSize(v).run();
          }}
          className="h-8 rounded-md border border-black/10 bg-white px-2 text-xs text-navy-deep outline-none focus:border-gold"
        >
          <option value="">Size</option>
          {FONT_SIZES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        {/* Line height */}
        <select
          title="Line height"
          value={(e.getAttributes("paragraph").lineHeight as string) || (e.getAttributes("heading").lineHeight as string) || ""}
          onChange={(ev) => {
            const v = ev.target.value;
            if (!v) e.chain().focus().unsetLineHeight().run();
            else e.chain().focus().setLineHeight(v).run();
          }}
          className="h-8 rounded-md border border-black/10 bg-white px-2 text-xs text-navy-deep outline-none focus:border-gold"
        >
          <option value="">Line Gap</option>
          {LINE_HEIGHTS.map((lh) => (
            <option key={lh.value} value={lh.value}>
              {lh.label}
            </option>
          ))}
        </select>

        {/* Color */}
        <label className="relative grid h-8 w-8 cursor-pointer place-items-center rounded-md border border-black/10 bg-white hover:border-gold" title="Text color">
          <span className="h-4 w-4 rounded-full border border-black/20" style={{ background: (e.getAttributes("textStyle").color as string) || "#1f2937" }} />
          <input
            type="color"
            value={(e.getAttributes("textStyle").color as string) || "#1f2937"}
            onChange={(ev) => e.chain().focus().setColor(ev.target.value).run()}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
        <div className="flex items-center gap-0.5">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              title={c}
              onClick={() => e.chain().focus().setColor(c).run()}
              className="h-5 w-5 rounded-full border border-black/15"
              style={{ background: c }}
            />
          ))}
        </div>
        <Divider />

        <Btn title="Bold" active={e.isActive("bold")} onClick={() => e.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </Btn>
        <Btn title="Italic" active={e.isActive("italic")} onClick={() => e.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </Btn>
        <Btn title="Underline" active={e.isActive("underline")} onClick={() => e.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="h-4 w-4" />
        </Btn>
        <Btn title="Strikethrough" active={e.isActive("strike")} onClick={() => e.chain().focus().toggleStrike().run()}>
          <Strikethrough className="h-4 w-4" />
        </Btn>
        <Divider />

        <Btn title="Align left" active={e.isActive({ textAlign: "left" })} onClick={() => e.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="h-4 w-4" />
        </Btn>
        <Btn title="Align center" active={e.isActive({ textAlign: "center" })} onClick={() => e.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="h-4 w-4" />
        </Btn>
        <Btn title="Align right" active={e.isActive({ textAlign: "right" })} onClick={() => e.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="h-4 w-4" />
        </Btn>
        <Divider />

        <Btn title="Bullet list" active={e.isActive("bulletList")} onClick={() => e.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </Btn>
        <Btn title="Numbered list" active={e.isActive("orderedList")} onClick={() => e.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </Btn>
        <Btn title="Quote" active={e.isActive("blockquote")} onClick={() => e.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </Btn>
        <Divider />

        <Btn title="Add/edit link" active={e.isActive("link")} onClick={setLink}>
          <LinkIcon className="h-4 w-4" />
        </Btn>
        <Btn title="Remove link" disabled={!e.isActive("link")} onClick={() => e.chain().focus().unsetLink().run()}>
          <Unlink className="h-4 w-4" />
        </Btn>
        <Btn title="Insert image" onClick={() => fileRef.current?.click()}>
          <ImageIcon className="h-4 w-4" />
        </Btn>
        <Btn title="Insert table" onClick={() => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon className="h-4 w-4" />
        </Btn>

        <select
          title="Insert a call-to-action card"
          value=""
          onChange={(ev) => {
            const v = ev.target.value as CtaVariant | "";
            if (!v) return;
            e.chain().focus().insertContent({ type: "ctaCard", attrs: { variant: v } }).run();
            ev.currentTarget.value = "";
          }}
          className="h-8 rounded-md border border-black/10 bg-white px-2 text-xs font-medium text-navy-deep outline-none focus:border-gold"
        >
          <option value="">+ CTA card</option>
          <option value="eligibility">Check Eligibility button</option>
          <option value="contact">Contact Us button</option>
          <option value="both">Eligibility + Contact</option>
        </select>



        {inTable && (
          <>
            <Divider />
            <Btn title="Add column" onClick={() => e.chain().focus().addColumnAfter().run()}>
              <Columns className="h-4 w-4" />
            </Btn>
            <Btn title="Add row" onClick={() => e.chain().focus().addRowAfter().run()}>
              <Rows className="h-4 w-4" />
            </Btn>
            <Btn title="Delete column" onClick={() => e.chain().focus().deleteColumn().run()}>
              <Columns className="h-4 w-4 text-red-600" />
            </Btn>
            <Btn title="Delete row" onClick={() => e.chain().focus().deleteRow().run()}>
              <Rows className="h-4 w-4 text-red-600" />
            </Btn>
            <Btn title="Merge cells" disabled={!e.can().mergeCells()} onClick={() => e.chain().focus().mergeCells().run()}>
              <Merge className="h-4 w-4" />
            </Btn>
            <Btn title="Split cell" disabled={!e.can().splitCell()} onClick={() => e.chain().focus().splitCell().run()}>
              <Split className="h-4 w-4" />
            </Btn>
            <Btn title="Toggle header row" onClick={() => e.chain().focus().toggleHeaderRow().run()}>
              <Heading className="h-4 w-4" />
            </Btn>
            <Btn title="Delete table" onClick={() => e.chain().focus().deleteTable().run()}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Btn>
          </>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(ev) => ev.target.files?.[0] && handleFile(ev.target.files[0])}
        />
      </div>

      <EditorContent editor={editor} className="max-h-[70vh] overflow-y-auto px-4 py-3" />
    </div>
  );
}
