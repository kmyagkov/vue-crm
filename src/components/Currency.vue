<template>
  <div class="card orange darken-3 bill-card">
    <div class="card-content white-text">
      <div class="card-header">
        <span class="card-title">Курс валют</span>
      </div>
      <table>
        <thead>
        <tr>
          <th>Валюта</th>
          <th>Курс</th>
          <th>Дата</th>
        </tr>
        </thead>
        <tbody v-for="(rate, name) of rates"
               :key="name"
        >
        <tr>
          <td>{{ name }}</td>
          <td>{{ rate.toFixed(5) }}</td>
          <td>{{ date | date('date') }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Currency',
    props: ['rates', 'date']
  }
</script>
