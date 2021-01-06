import { getDict } from "@/utils/dictionary";
export default {
    data() {
        return {
            pageNum: 1,
            total: 10,
            pageSize: 10,
            tableData: [],
            searchInfo: {}
        }
    },
    methods: {
        filterDict(value, type) {
            const rowLabel = this[type + "Options"] && this[type + "Options"].filter(item => item.value == value)
            return rowLabel && rowLabel[0] && rowLabel[0].label
        },
        async getDict(type) {
            const dicts = await getDict(type)
            this[type + "Options"] = dicts
            return dicts
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.getTableData()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.getTableData()
        },
        async getTableData(pageNum = this.pageNum, pageSize = this.pageSize) {
            const table = await this.listApi({ pageNum, pageSize, ...this.searchInfo })
            if (table.code ===  1000) {
                this.tableData = table.data.content
                this.total = table.data.total
                this.pageNum = table.data.pageNum
                this.pageSize = table.data.pageSize
            }
        }
    }
}
