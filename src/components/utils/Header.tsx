import { Button } from "@kobalte/core/button";
import { A, useLocation } from "@solidjs/router";
import {
  AlignRight,
  ArrowUpRight,
  ChevronDown
} from "lucide-solid";
import { For, Match, Switch } from "solid-js";
import { navLists } from "~/lib/data";
import Logo from "./Logo";

export default function Header() {
  const location = useLocation()
  // console.log( location.pathname);
  
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
                      <Button class="bg-black text-white px-4 py-2 rounded-full flex gap-2 items-center">
                        {item.title}
                        <ArrowUpRight />
                      </Button>
                    </A>
                  </Match>
                  <Match when={item.withIcon}>
                    <A href={item.url} class={`${location.pathname == item.url && "border-b border-b-black"}`}>
                      <li class="flex items-center">
                        {item.title} <ChevronDown />
                      </li>
                    </A>
                  </Match>
                  <Match when={!item.isButton} >
                    <A href={item.url} class={`${location.pathname == item.url && "border-b border-b-black"}`}>
                      <li>{item.title}</li>
                    </A>
                  </Match>
                </Switch>
              )}
            </For>
          </ul>
        </div>

        <div class="md:hidden">
          <AlignRight />
        </div>
      </div>
    </div>
  );
}
