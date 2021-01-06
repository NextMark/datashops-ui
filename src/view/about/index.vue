<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card>
          <div slot="header">gin-vue-admin</div>
          <div>
            <el-row>
              <el-col :span="8" :offset="8">
                <a href="https://github.com/NextMark/datashops">
                  <img
                    class="org-img dom-center"
                    src="@/assets/logo.png"
                    alt="gin-vue-admin"
                  />
                </a>
              </el-col>
            </el-row>
          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Timeline from "timeline-vuejs";
export default {
  name: "Test",
  components: {
    Timeline,
  },
  data() {
    return {
      messageWhenNoItems: "There arent commits",
      members: [],
      dataTimeline: [],
      page: 0,
    };
  },
  created() {

  },
  methods: {
    loadMore() {
      this.page++;
      this.loadCommits();
    }
  },
};
</script>

<style scoped>
.load-more {
  margin-left: 120px;
}

.avatar-img {
  float: left;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  margin-top: 15px;
}

.org-img {
  height: 150px;
  width: 150px;
}

.author-name {
  float: left;
  line-height: 65px !important;
  margin-left: 10px;
  color: darkblue;
  line-height: 100px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.dom-center {
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
