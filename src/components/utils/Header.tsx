import { A } from "@solidjs/router";
import Logo from "./Logo";
import { AlignEndHorizontal, AlignRight, ArrowUpRight, ChevronDown } from "lucide-solid";
import { navLists } from "~/lib/data";
import { For, Match, Switch } from "solid-js";
import { Button } from "@kobalte/core/button";

export default function Header() {
  return (
    <div class={`bg-transparent`}>
      <div class="bodySize flex items-center justify-between py-2">
        <Logo />

        <div class="hidden md:flex">
          <ul class="flex items-center gap-8 text-sm">
            <For each={navLists}>
              {(item, idx) => (
                <Switch>
                  <Match when={item.isButton}>
                    <A href={item.url}>
                      <Button class="bg-black text-white px-4 py-2 rounded-full flex gap-2 items-center">{item.title}
                        <ArrowUpRight/>
                      </Button>
                    </A>
                  </Match>
                  <Match when={!item.isButton}>
                    <A href={item.url}>
                      <li>{item.title}</li>
                    </A>
                  </Match>
                </Switch>
              )}
            </For>
            {/* <A href="/">Index</A>
          <A href="/about">About</A> */}
          </ul>
        </div>

        <div class="md:hidden">
          <AlignRight />
        </div>
      </div>
    </div>
  );
}
