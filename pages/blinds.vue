<script setup>
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import tasks from '../utils/tasks.json'
import { columns } from '@/components/columns'
</script>

<template>
  <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex flex-1 rounded-lg border border-dashed shadow-sm">
      <DataTable :data="tasks" :columns="columns" />
    </div>
  </main>
</template>
