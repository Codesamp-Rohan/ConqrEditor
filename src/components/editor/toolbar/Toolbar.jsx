"use client";

import { useEffect, useState } from "react";
import { Bold, Italic, Underline, List, ListOrdered, LucideMessageSquareQuote, Code2, AlignLeft,AlignCenter,AlignRight,AlignJustify, Palette, Type, Highlighter, BetweenHorizonalStart } from "lucide-react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import HeadingDropdown from "./HeadingDropdown";
import ToolbarButton from "./ToolbarButton";
import {$createQuoteNode} from "@lexical/rich-text";
import {$createCodeNode,} from "@lexical/code";
import {$setBlocksType,} from "@lexical/selection";
import {INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND,} from "@lexical/list";
import {FORMAT_ELEMENT_COMMAND} from "lexical";
import {$patchStyleText} from "@lexical/selection";
import ColorPicker from "./ColorPicker";
import FontSizeDropdown from "./FontSizeDropdown";
import {$getSelectionStyleValueForProperty} from "@lexical/selection";
import HighlightPicker from "./HighlightPicker";
import FontWeightDropdown from "./FontWeightDropdown";
import { Divider } from "@/components/ui/Divider";

export default function Toolbar() {
    const [editor] = useLexicalComposerContext();
    const [activeFormats, setActiveFormats] = useState({bold: false,italic: false,underline: false});
    const [alignment, setAlignment] = useState("left");
    const [showColors, setShowColors] = useState(false);
    const [fontSize, setFontSize] = useState("16");
    const [showFontSizes, setShowFontSizes] = useState(false);
    const [showHighlights, setShowHighlights] = useState(false);
    const [showFontWeights, setShowFontWeights] = useState(false);

    useEffect(() => {
        return editor.registerUpdateListener(
            ({ editorState }) => {
                editorState.read(() => {
                    const selection =
                        $getSelection();

                    // IMPORTANT FIX
                    if (
                        !$isRangeSelection(
                            selection
                        )
                    ) {
                        return;
                    }

                    const node =
                        selection.anchor.getNode();

                    if (
                        typeof node.getStyle ===
                        "function"
                    ) {
                        const style =
                            node.getStyle();

                        const match =
                            style.match(
                                /font-size:\s*(\d+)px/
                            );

                        setFontSize(
                            match
                                ? match[1]
                                : "16"
                        );
                    }

                    setActiveFormats({
                        bold: selection.hasFormat(
                            "bold"
                        ),
                        italic:
                            selection.hasFormat(
                                "italic"
                            ),
                        underline:
                            selection.hasFormat(
                                "underline"
                            ),
                    });

                    const anchorNode =
                        selection.anchor
                            .getNode()
                            .getTopLevelElement();

                    if (anchorNode) {
                        const format =
                            anchorNode.getFormatType();

                        setAlignment(
                            format || "left"
                        );
                    }
                });
            }
        );
    }, [editor]);

    return (
        <div className={`sticky top-0 z-50 flex items-center !gap-[3.5px] p-1 border-b border-b-[var(--border-muted)] bg-[var(--conqr-muted)] shadow-xl shadow-white/20`}>
            <HeadingDropdown />
            <ToolbarButton
                active={activeFormats.bold}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}
            >
                <Bold size={14} />
            </ToolbarButton>

            <ToolbarButton
                active={activeFormats.italic}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
            >
                <Italic size={14} />
            </ToolbarButton>

            <ToolbarButton
                active={activeFormats.underline}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }}
            >
                <Underline size={14} />
            </ToolbarButton>
            <Divider />
            <ToolbarButton
  onClick={() => {
    editor.dispatchCommand(
      INSERT_UNORDERED_LIST_COMMAND,
      undefined
    );
  }}
>
  <List size={14} />
</ToolbarButton>

<ToolbarButton
  onClick={() => {
    editor.dispatchCommand(
      INSERT_ORDERED_LIST_COMMAND,
      undefined
    );
  }}
>
  <ListOrdered size={14} />
</ToolbarButton>
                <Divider />
            <ToolbarButton
                onClick={() => {
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $setBlocksType(selection, () =>
                                $createQuoteNode()
                            );
                        }
                    });
                }}
            >
                <LucideMessageSquareQuote size={14} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => {
                    editor.update(() => {
                        const selection = $getSelection();

                        if ($isRangeSelection(selection)) {
                            $setBlocksType(selection, () =>
                                $createCodeNode()
                            );
                        }
                    });
                }}
            >
                <Code2 size={14} />
            </ToolbarButton>
                <Divider />
            <ToolbarButton
            active={alignment === "left"}
  onClick={() => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      "left"
    );
  }}
>
  <AlignLeft size={14} />
</ToolbarButton>

<ToolbarButton
active={alignment === "center"}
  onClick={() => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      "center"
    );
  }}
>
  <AlignCenter size={14} />
</ToolbarButton>

<ToolbarButton
active={alignment === "right"}
  onClick={() => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      "right"
    );
  }}
>
  <AlignRight size={14} />
</ToolbarButton>

<ToolbarButton
active={alignment === "justify"}
  onClick={() => {
    editor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      "justify"
    );
  }}
>
  <AlignJustify size={14} />
</ToolbarButton>
                <Divider />

    {/* Colour */}
    <div className="relative">
  <ToolbarButton
    onClick={() =>
      setShowColors(
        (prev) => !prev
      )
    }
  >
    <Palette size={14} />
  </ToolbarButton>

  {showColors && (
    <ColorPicker
      onSelect={(color) => {
        editor.update(() => {
  const selection =
    $getSelection();

  if (
    $isRangeSelection(
      selection
    )
  ) {
    $patchStyleText(
      selection,
      {
        color:
          color || "inherit",
      }
    );
  }
});
        setShowColors(false);
      }}
    />
  )}
</div>

{/* Highlight color */}
<div className="relative">
  <ToolbarButton
    onClick={() =>
      setShowHighlights(
        (prev) => !prev
      )
    }
  >
    <Highlighter size={14} />
  </ToolbarButton>

  {showHighlights && (
    <HighlightPicker
      onSelect={(color) => {
        editor.update(() => {
          const selection =
            $getSelection();

          if (
            $isRangeSelection(
              selection
            )
          ) {editor.update(() => {
  const selection =
    $getSelection();

  if (
    $isRangeSelection(
      selection
    )
  ) {
    $patchStyleText(
      selection,
      {
        "background-color":
          color || "transparent",
      }
    );
  }
});

setShowHighlights(false);
          }
        });

        setShowHighlights(false);
      }}
    />
  )}
</div>

                <Divider />


{/* Size Dropdown */}
<div className="relative">
  <ToolbarButton
    onClick={() =>
      setShowFontSizes(
        (prev) => !prev
      )
    }
  >
      <div className="flex items-end gap-[1px]">
  <span className="text-[11px] font-medium">
    {fontSize}
  </span>

          <span className="text-[10px] text-[var(--text-muted)]">
    px
  </span>
      </div>
  </ToolbarButton>

  {showFontSizes && (
    <FontSizeDropdown
      onSelect={(size) => {
        editor.update(() => {
          const selection =
            $getSelection();

          if (
            $isRangeSelection(
              selection
            )
          ) {
              $patchStyleText(
                  selection,
                  {
                      "font-size":
                          `${size}px`,
                  }
              );
          }
        });

        setShowFontSizes(false);
      }}
    />
  )}
</div>

{/* Font Weight */}
<div className="relative">
  <ToolbarButton
    onClick={() =>
      setShowFontWeights(
        (prev) => !prev
      )
    }
  >
    <BetweenHorizonalStart size={14} />
  </ToolbarButton>

  {showFontWeights && (
    <FontWeightDropdown
      onSelect={(weight) => {
        editor.update(() => {
          const selection =
            $getSelection();

          if (
            $isRangeSelection(
              selection
            )
          ) {
            $patchStyleText(
              selection,
              {
                "font-weight":
                  weight,
              }
            );
          }
        });

        setShowFontWeights(false);
      }}
    />
  )}
</div>

        </div>
    );
}