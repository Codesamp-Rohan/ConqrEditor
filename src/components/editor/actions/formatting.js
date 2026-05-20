import {
    $getSelection,
    $isRangeSelection,
    FORMAT_TEXT_COMMAND,
} from "lexical";

import {
    $patchStyleText,
} from "@lexical/selection";

export function toggleFormat(
    editor,
    format
) {
    editor.dispatchCommand(
        FORMAT_TEXT_COMMAND,
        format
    );
}

export function applyFontSize(
    editor,
    size
) {
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
}

export function applyColor(
    editor,
    color
) {
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
}

export function applyHighlight(
    editor,
    color
) {
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
                    "background-color":
                        color || "transparent",
                }
            );
        }
    });
}

export function applyFontWeight(
    editor,
    weight
) {
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
}