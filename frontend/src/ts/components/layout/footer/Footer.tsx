import { JSXElement } from "solid-js";
import { getIsScreenshotting } from "../../../states/core";
import { isFocusMode } from "../../../states/test";
import { showModal } from "../../../states/modals";
import { cn } from "../../../utils/cn";
import { Button } from "../../common/Button";
import { isLoadingShown } from "../../core/PageSwitcher";

export function Footer(): JSXElement {
  return (
    <footer
      class={cn("relative w-full border-t border-sub-alt px-2 py-5 text-sm text-sub sm:py-6", {
        "opacity-0": getIsScreenshotting(),
      })}
      data-focused={isFocusMode() ? "" : undefined}
      inert={isLoadingShown()}
    >
      <div class={cn("transition-opacity", { "opacity-0": isFocusMode() })}>
        <div class="mx-auto grid max-w-3xl grid-cols-2 items-center justify-items-center gap-x-3 gap-y-3 text-center sm:flex sm:flex-wrap sm:justify-center sm:gap-5">
          <Button variant="text" text="Contact" class="w-full justify-center sm:w-auto" onClick={() => showModal("Contact")} />
          <Button variant="text" text="About Us" class="w-full justify-center sm:w-auto" to="/about" />
          <Button variant="text" text="Privacy Policy" class="w-full justify-center sm:w-auto" href="/privacy-policy.html" />
          <Button variant="text" text="Terms & Conditions" class="w-full justify-center sm:w-auto" href="/terms-of-service.html" />
        </div>
      </div>
    </footer>
  );
}
