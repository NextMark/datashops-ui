<template>
  <div>
    <div class="button-box clearflex">
      <el-button @click="addUser" type="primary">新增用户</el-button>
    </div>
    <el-table :data="tableData" border stripe>
      <el-table-column label="ID" min-width="20" prop="id"></el-table-column>
      <el-table-column label="头像" min-width="50" align="center">
        <template slot-scope="scope">
          <div :style="{'textAlign':'left'}">
            <CustomPic :picSrc="scope.row.avatar" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="100" prop="name"></el-table-column>

      <el-table-column label="电话" min-width="100" prop="phone"></el-table-column>
      <el-table-column label="邮箱" min-width="100" prop="email"></el-table-column>
      <el-table-column label="用户角色" min-width="180">
        <template slot-scope="scope">
          <span v-for="role of scope.row.roleList" :key="role.id">
            {{role.name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定要删除此用户吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定</el-button>
            </div>
            <el-button type="danger" icon="el-icon-delete" size="small" slot="reference">删除</el-button>
          </el-popover>
          <el-button type="primary" icon="el-icon-edit" size="small" slot="reference"
                     @click="modifyRole(scope.row)">权限
          </el-button>
        </template>
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

    <el-dialog :visible.sync="addUserDialog" custom-class="user-dialog" title="新增用户">
      <el-form :rules="rules" ref="userForm" :model="userInfo">
        <el-form-item label="用户名" label-width="80px" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px" prop="phone">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" label-width="80px" prop="authorityId">
          <el-checkbox-group v-model="userInfo.roleIds">
            <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeAddUserDialog">取 消</el-button>
        <el-button @click="enterAddUserDialog" type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="modifyRoleDialog" custom-class="user-dialog" title="修改角色" destroy-on-close>
      <el-form :rules="rules" ref="userForm" :model="userInfo">
        <el-form-item label="用户角色" label-width="80px" prop="authorityId">
          <el-checkbox-group v-model="userInfo.roleIds">
            <el-checkbox v-for="role in roleList" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="closeModifyRoleDialog">取 消</el-button>
        <el-button @click="changeRole(userInfo)" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
// 获取列表内容封装在mixins内部  getTableData方法 初始化已封装完成
const path = process.env.VUE_APP_BASE_API;
import {
  getUserList,
  changeRole,
  register,
  deleteUser
} from "@/api/user";
import { asyncRoles } from "@/api/authority";
import infoList from "@/mixins/infoList";
import { mapGetters } from "vuex";
import CustomPic from "@/components/customPic";
export default {
  name: "Api",
  mixins: [infoList],
  components: { CustomPic },
  data() {
    return {
      listApi: getUserList,
      path: path,
      roleList: [],
      addUserDialog: false,
      modifyRoleDialog: false,
      userInfo: {
        id: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        avatar: "",
        roleIds: [],
        roleList: []
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, message: "最低6位字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, message: "最低6位字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("user", ["token"])
  },
  methods: {
    async deleteUser(row) {
      const res = await deleteUser({ id: row.id });
      if (res.code === 1000) {
        this.getTableData();
        row.visible = false;
      }
    },
    async enterAddUserDialog() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          const res = await register(this.userInfo);
          if (res.code === 1000) {
            this.$message({ type: "success", message: "创建成功" });
          }
          await this.getTableData();
          this.closeAddUserDialog();
        }
      });
    },
    closeAddUserDialog() {
      this.$refs.userForm.resetFields();
      this.addUserDialog = false;
    },

    closeModifyRoleDialog() {
      this.$refs.userForm.resetFields();
      this.modifyRoleDialog = false;
    },

    modifyRole(row) {
      let ids = []
      this.userInfo.roleIds = []
      this.userInfo.id = row.id
      if (row.roleList) {
        row.roleList.map(r => ids.push(r.id))
        this.userInfo.roleIds = ids
      }
      this.modifyRoleDialog = true;
    },

    addUser() {
      this.addUserDialog = true;
    },
    async changeRole(row) {
      const res = await changeRole({
        id: row.id,
        roleIds: row.roleIds
      });
      if (res.code === 1000) {
        this.$message({ type: "success", message: "角色设置成功" });
      }
      await this.getTableData();
      this.modifyRoleDialog = false;
    }
  },
  async created() {
    this.getTableData();
    const res = await asyncRoles({ pageNum: 1, pageSize: 999 });
    this.roleList = res.data.content
  }
};
</script>
<style lang="scss">

.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}

.user-dialog {
  .header-img-box {
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  border-radius: 20px;
  text-align: center;
  line-height: 200px;
  cursor: pointer;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
