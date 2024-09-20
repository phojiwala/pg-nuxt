<script setup>
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import tasks from "../utils/tasks.json";

const cols = [
  { field: "no", title: "#", type: "number", sort: false },
  { field: "season", title: "Season", sort: false },
  { field: "blind_no", title: "Blind No." },
  { field: "type", title: "Type" },
  { field: "description", title: "Description" },
  { field: "license_status", title: "License Status" },
  { field: "actions", title: "", sort: false },
];

// const blinds = await fetchFilteredBlinds(query, currentPage);
</script>

<template>
  <main class="flex flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex flex-1 rounded-lg border border-dashed shadow-sm">
      <CustomTable storeKey="blinds" :cols="cols" addDialogId="add-dashboard" />
    </div>
  </main>
</template>
