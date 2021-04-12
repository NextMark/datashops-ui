<template>
  <el-table :data="list" border height="350">
    <el-table-column
            label="序号"
            type="index"
            width="50">
    </el-table-column>
    <el-table-column label="节点类型" width="80">
      <template slot-scope="scope">
        {{ scope.row.type | typeFilter}}
      </template>
    </el-table-column>
    <el-table-column label="主机名" width="200" align="center">
      <template slot-scope="scope">
        {{ scope.row.host }}
      </template>
    </el-table-column>
    <el-table-column label="IP" width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.ip }}
      </template>
    </el-table-column>
    <el-table-column label="内核" width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.cpu }}
      </template>
    </el-table-column>
    <el-table-column label="内存" width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.memory }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">
          {{ scope.row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        fail: 'danger',
        running: 'success'
      }
      return statusMap[status]
    },
    typeFilter(nodeType) {
      if (nodeType === 1) {
        return 'master'
      }
      if (nodeType === 2) {
        return 'worker'
      }
      return 'worker'
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.list = [
        {
          type: 1,
          host: 'master-100',
          status: 'running',
          ip: '',
          cpu: 4,
          memory: 1
        },
        {
          type: 1,
          host: 'master-101',
          status: 'running',
          ip: '',
          cpu: 4,
          memory: 1
        },
        {
          type: 1,
          host: 'master-102',
          status: 'running',
          ip: '',
          cpu: 4,
          memory: 1
        },
        {
          type: 2,
          host: 'worker-100',
          status: 'running',
          ip: '',
          cpu: 4,
          memory: 1
        },
        {
          type: 2,
          host: 'worker-101',
          status: 'running',
          ip: '',
          cpu: 4,
          memory: 1
        },
        {
          type: 2,
          host: 'worker-102',
          status: 'running',
          ip: '',
          cpu: 4,
          memory: 1
        },
        {
          type: 2,
          host: 'worker-103',
          status: 'running',
          ip: '',
          cpu: 8,
          memory: 1
        },
        {
          type: 2,
          host: 'worker-104',
          status: 'running',
          ip: '',
          cpu: 8,
          memory: 1
        },
      ]
    }
  }
}
</script>
