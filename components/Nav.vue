<script setup>
let linkClass =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
</script>

<template>
  <div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Logo />
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
          <a
            v-for="item in navItems"
            :key="item.link"
            :href="item.link"
            :class="linkClass"
          >
            <component :is="item.icon" />
            {{ item.title }}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
