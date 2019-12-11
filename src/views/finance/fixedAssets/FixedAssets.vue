<template>
  <div class="fixed-assets-container">
    <div class="operate">
      <el-button type="danger" size="small" @click="deleteAll" v-if="isButtonOperated">批量删除<i class="el-icon-delete"></i></el-button>
      <el-button type="danger" size="small"  disabled v-else>批量删除<i class="el-icon-delete"></i></el-button>
      <el-button type="primary" size="small">添加<i class="el-icon-circle-plus-outline"></i></el-button>
    </div>
    <hr>
    <div class="table-container">
      <template>
        <el-table
          :data="fixedAssetsData"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <!-- 复选框 -->
          <el-table-column 
            fixed="left"
            type="selection" 
            width="35" 
            :selectable="selectable">
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="资产名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
            width="60">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="use"
            label="使用年限"
            width="90">
          </el-table-column>
          <el-table-column
            prop="isInvoice"
            label="是否开具发票"
            width="110">
          </el-table-column>
          <el-table-column
            prop="date"
            label="购买时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="purchaserId"
            label="购买负责人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="isApprove"
            label="财务确认状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="approveDate"
            label="财务确认时间"
            width="110">
          </el-table-column>
          <el-table-column
            prop="damage"
            label="赔偿金"
            width="80">
          </el-table-column>
          <el-table-column
            prop="use"
            label="用途"
            width="100">
          </el-table-column>
          <el-table-column
            prop="accessory"
            label="附件"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteOne">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showAddAccount: false,
        // 进出账信息
        fixedAssetsData: [],
        // "批量删除"按钮 是否可以操作
        isButtonOperated: false,
        currPage: 1,
        // 表格每一页展示的行数
        pageSize: 2,
        // "批量删除"按钮 是否可以操作
        isButtonOperated: false,
        // 添加组信息的表单
        form: {
          name: '',
          comment: '',
          leaderName: '',
          assistantName: '',
          type: '',
          member: '',
          image: '',
        },
        // 查看组信息的表单
        form2: {
          id: 0,
          name: '',
          comment: '',
          leaderName: '',
          assistantName: '',
          type: '',
          member: '',
          image: '',
        },
        dialogFormVisible: false,
        total: 0,
        imageUrl: '',
        // 表单验证规则
        rules: {
          name: [
            {required: true, message: '请输入组名', trigger: 'blur'},
            {min: 1, max: 10, message: '长度为 1 到 10 个字符', trigger: 'blur'}
          ],
          comment: [
            {required: true, message: '请输入简要', trigger: 'blur'},
            {min: 3, max: 30, message: '长度为 3 到 30 个字符', trigger: 'blur'}
          ],
          leaderName: [
            {required: true, message: '请输入组长名字', trigger: 'blur'},
            {min: 2, max: 10, message: '长度为 2 到 10 个字符', trigger: 'blur'}
          ],
          assistantName: [
            {required: true, message: '请输入副组长名字', trigger: 'blur'},
            {min: 2, max: 10, message: '长度为 2 到 10 个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入类型', trigger: 'blur'},
            {min: 2, max: 5, message: '长度为 2 到 5 个字符', trigger: 'blur'}
          ]
        },
        // 选择框为选中状态的数据的 id 组成的数组
        selectedIdArr: [],
        selectedIdArrStr: ''
      }
    },
    created() {
      this.getFixedAssetsData()
    },
    methods: {
      getFixedAssetsData() {
        this.$http.get('http://121.41.67.25:8062/property/select/'+this.currPage + '/' +this.pageSize)
          .then(res => {
            if(res.status === 200) {
              if (res.data.code === 200) {
                this.fixedAssetsData = res.data.data.records
                this.currPage = res.data.data.current
                this.pageSize = res.data.data.size
                this.total = res.data.data.total
              }
            }
          })
      },
      handleClick(row) {
        console.log(row);
      },
      //选中列表行
      handleSelectionChange(val) {
        // val是 选中的行的信息对象 组成的数组
        console.log(val)
        this.isButtonOperated = val.length > 0 ? true: false
      },
      selectable() { 
        return true
      },
      // “批量删除”
      deleteAll() {
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // “单个删除”
      deleteOne() {
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 切换当前页
      handleCurrentChange(cpage) {
        this.currPage = cpage
        // console.log('当前页：'+cpage)
        this.getFixedAssetsData()
      },
      // 切换一页展示的条数
      handleSizeChange(psize) {
        this.pageSize = psize
        // console.log('展示条数：'+psize)
        this.getFixedAssetsData()
      },
    }
  }
</script>

<style lang="less" scoped>
.fixed-assets-container {
  .operate{
    margin-bottom: 5px;
    i {
      margin-left: 3px;
    }
  }
  .table-container {
    margin-top: 10px;
  }
  .pagination {
    margin-top: 10px;
    margin-right: 20px;
    float: right;
  }
}
</style>