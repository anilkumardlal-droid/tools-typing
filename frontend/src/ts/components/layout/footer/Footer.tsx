import { JSXElement } from "solid-js";
import { getIsScreenshotting } from "../../../states/core";
import { isFocusMode } from "../../../states/test";
import { cn } from "../../../utils/cn";
import { Button } from "../../common/Button";
import { isLoadingShown } from "../../core/PageSwitcher";
import { ThemeIndicator } from "./ThemeIndicator";

export function Footer(): JSXElement {
  return (
    <footer
      class={cn("relative text-xs text-sub", {
        "opacity-0": getIsScreenshotting(),
      })}
      data-focused={isFocusMode() ? "" : undefined}
      inert={isLoadingShown()}
    >
      <div
        class={cn("flex flex-wrap items-center justify-between gap-x-4 gap-y-2 transition-opacity", {
          "opacity-0": isFocusMode(),
        })}
      >
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Button variant="text" text="terms" href="/terms-of-service.html" />
          <Button variant="text" text="privacy" href="/privacy-policy.html" />
        </div>
        <ThemeIndicator />
      </div>
    </footer>
  );
}
