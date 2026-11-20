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
      class={cn("relative text-sm text-sub", {
        "opacity-0": getIsScreenshotting(),
      })}
      data-focused={isFocusMode() ? "" : undefined}
      inert={isLoadingShown()}
    >
      <div class={cn("transition-opacity", { "opacity-0": isFocusMode() })}>
        <div class="grid grid-cols-2 items-center gap-x-2 gap-y-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          <Button variant="text" text="Contact" class="justify-center" onClick={() => showModal("Contact")} />
          <Button variant="text" text="About Us" class="justify-center" to="/about" />
          <Button variant="text" text="Privacy Policy" class="justify-center" href="/privacy-policy.html" />
          <Button variant="text" text="Terms & Conditions" class="justify-center" href="/terms-of-service.html" />
        </div>
      </div>
    </footer>
  );
}
