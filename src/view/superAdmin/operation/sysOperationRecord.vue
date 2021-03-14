<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="请求路径">
          <el-input placeholder="搜索条件" v-model="searchInfo.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      border
      ref="multipleTable"
      stripe
      style="width: 100%"
      tooltip-effect="dark"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="操作人" width="140">
        <template slot-scope="scope">
          <div>{{scope.row.operator}}</div>
        </template>
      </el-table-column>
      <el-table-column label="请求ip" prop="ip" width="160"></el-table-column>
      <el-table-column label="请求方法" prop="method" width="120"></el-table-column>
      <el-table-column label="请求路径" prop="path" width="300"></el-table-column>
      <el-table-column label="响应时间" width="140">
        <template slot-scope="scope">
          <div>{{scope.row.spend}} ms</div>
        </template>
      </el-table-column>

      <el-table-column label="日期" width="180">
        <template slot-scope="scope">{{scope.row.createTime|formatDate}}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNum"
      :page-size="pageSize"
      :page-sizes="[10, 30, 50, 100]"
      :style="{float:'right',padding:'20px'}"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
import {
  deleteSysOperationRecord,
  getSysOperationRecords,
  deleteSysOperationRecordByIds
} from "@/api/sysOperationRecord"; //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import infoList from "@/mixins/infoList";

export default {
  name: "SysOperationRecord",
  mixins: [infoList],
  data() {
    return {
      listApi: getSysOperationRecords,
      dialogFormVisible: false,
      visible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        ip: null,
        method: null,
        path: null,
        status: null,
        latency: null,
        agent: null,
        error_message: null,
        user_id: null
      }
    };
  },
  filters: {
    formatDate: function(time) {
      if (time != null && time != "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
      } else {
        return "";
      }
    },
    formatBoolean: function(bool) {
      if (bool != null) {
        return bool ? "是" : "否";
      } else {
        return "";
      }
    }
  },
  methods: {
    //条件搜索前端看此方法
    onSubmit() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.getTableData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async onDelete() {
      const ids = [];
      this.multipleSelection &&
        this.multipleSelection.map(item => {
          ids.push(item.ID);
        });
      const res = await deleteSysOperationRecordByIds({ ids });
      if (res.code === 1000) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        if (this.tableData.length == ids.length) {
          this.pageNum--;
        }
        this.deleteVisible = false;
        this.getTableData();
      }
    },
    async deleteSysOperationRecord(row) {
      this.visible = false;
      const res = await deleteSysOperationRecord({ ID: row.ID });
      if (res.code === 1000) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        if (this.tableData.length == 1) {
          this.pageNum--;
        }
        this.getTableData();
      }
    },
    fmtBody(value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return value;
      }
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="scss">
.table-expand {
  padding-left: 60px;
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}
.popover-box {
  background: #112435;
  color: #f08047;
  height: 600px;
  width: 420px;
  overflow: auto;
}
.popover-box::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
