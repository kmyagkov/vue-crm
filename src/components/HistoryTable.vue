<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, i) of records"
        :key="record.id"
    >
      <td>{{ i + 1 }}</td>
      <td>{{ record.amount | currency('RUB') }}</td>
      <td>{{ record.date | date('date') }}</td>
      <td>{{ record.category }}</td>
      <td>
        <span class="white-text badge"
              :class="record.type === 'income' ? 'green' : 'red'"
        >
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push(`/detail/${record.id}`)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

  export default {
    name: 'HistoryTable',
    props: {
      records: {
        required: true
      }
    }
  }
</script>
