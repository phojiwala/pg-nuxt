<script setup>
const { data } = await useAsyncData("revenue", () => fetchLatestInvoices());

const headers = computed(() => {
  if (!data.value || data.value.length === 0) return [];
  return Object.keys(data.value[0]);
});
</script>

<template>
  <div>
    <h2>Revenue Data</h2>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">
            {{ header.charAt(0).toUpperCase() + header.slice(1) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td v-for="header in headers" :key="header">
            <img
              v-if="header === 'image_url'"
              :src="item[header]"
              alt="Customer Image"
              width="50"
              height="50"
            />
            <template v-else>{{ item[header] }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
