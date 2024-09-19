<script setup>
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-vue-next";

let mobileLinkClass =
  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="flex flex-col">
      <nav class="grid gap-2 text-lg font-medium">
        <Logo />
        <br>
        <a
          v-for="item in navItems"
          :key="item.link"
          :href="item.link"
          :class="mobileLinkClass"
        >
          <component :is="item.icon" />
          {{ item.title }}
        </a>
      </nav>
    </SheetContent>
  </Sheet>
</template>
