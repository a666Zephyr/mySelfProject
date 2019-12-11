<template>
  <div class="finance-group-container">
    <div class="operate">
      <el-button type="danger" size="small" @click="deleteAll" v-if="isButtonOperated">批量删除<i class="el-icon-delete"></i></el-button>
      <el-button type="danger" size="small"  disabled v-else>批量删除<i class="el-icon-delete"></i></el-button>
      <el-button type="primary" size="small" v-popover:popover1>添加<i class="el-icon-circle-plus-outline"></i></el-button>
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
            fixed="left"
            prop="name"
            label="资产名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="count"
            label="数量"
            width="60">
          </el-table-column>
          <el-table-column
            prop="money"
            label="价格"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="durableYear"
            label="使用年限"
            width="90">
          </el-table-column>
          <el-table-column
            prop="invoice"
            label="是否开具发票"
            width="110">
          </el-table-column>
          <el-table-column
            prop="btime"
            label="购买时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="bperson"
            label="购买负责人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="财务确认状态"
            width="110">
          </el-table-column>
          <el-table-column
            prop="confirmTime"
            label="财务确认时间"
            width="110">
          </el-table-column>
          <el-table-column
            prop="compensation"
            label="赔偿金"
            width="80">
          </el-table-column>
          <el-table-column
            prop="channel"
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
    <div class="add-account-container">
      <el-popover
        ref="popover1"
        placement="right"
        trigger="click"
        width="600"
        title="添加组">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="组名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="简要" prop="comment">
            <el-input v-model="form.comment"></el-input>
          </el-form-item>
          <el-form-item label="组长" prop="leaderName">
            <el-input v-model="form.leaderName"></el-input>
          </el-form-item>
          <el-form-item label="副组长" prop="assistantName">
            <el-input v-model="form.assistantName"></el-input>
          </el-form-item>
          <el-form-item label="组类型" prop="type">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="组成员" prop="member">
            <el-input v-model="form.member"></el-input>
          </el-form-item>
          <!-- <el-form-item label="组头像">
            <el-upload
              class="avatar-uploader"
              action=" "
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :limit="1"
              v-model="form.image">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item> -->
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-popover>
    </div>
    <div class="see-account-container">
      <el-dialog title="查看组信息" :visible.sync="dialogFormVisible" top="50px" :modal="false" left="300px">
        <el-form ref="form2" :model="form2" label-width="80px" :disabled="true">
          <el-form-item label="组ID" prop="id">
            <el-input v-model="form2.id"></el-input>
          </el-form-item>
          <el-form-item label="组名" prop="name">
            <el-input v-model="form2.name"></el-input>
          </el-form-item>
          <el-form-item label="简要" prop="comment">
            <el-input v-model="form2.comment"></el-input>
          </el-form-item>
          <el-form-item label="组长" prop="leaderName">
            <el-input v-model="form2.leaderName"></el-input>
          </el-form-item>
          <el-form-item label="副组长" prop="assistantName">
            <el-input v-model="form2.assistantName"></el-input>
          </el-form-item>
          <el-form-item label="组类型" prop="type">
            <el-input v-model="form2.type"></el-input>
          </el-form-item>
          <el-form-item label="组成员" prop="member">
            <el-input v-model="form2.member"></el-input>
          </el-form-item>
          <!-- <el-form-item label="组头像">
            <el-upload
              class="avatar-uploader"
              action=" "
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :limit="1"
              v-model="form2.image">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item> -->
        </el-form>
      </el-dialog>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  // import addAccount from './AddAccount'
  export default {
    data() {
      return {
        showAddAccount: false,
        // 进出账信息
        groupData: [
          /* {
            // 复选框是否选中
            isSelected: false,
            // 组 id
            groupId:0,
            // 名称
            name: '财务A组',
            // 组头像
            groupImg: '',
            // 组长
            leader: '组长A',
            // 副组长
            leaderFu: '副组长A',
            // 组类型
            type: '出纳',
            // 简要
            jianyao: '我们是有爱的财务部出纳小组',
            // 创建时间
            ctime: '2016-12-09',
            // 人数
            memberCount: 7,
            // 成员
            member: '李芳、王小红'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 组 id
            groupId:0,
            // 名称
            name: '财务A组',
            // 组头像
            groupImg: '',
            // 组长
            leader: '组长A',
            // 副组长
            leaderFu: '副组长A',
            // 组类型
            type: '出纳',
            // 简要
            jianyao: '我们是有爱的财务部出纳小组',
            // 创建时间
            ctime: '2016-12-09',
            // 人数
            memberCount: 7,
            // 成员
            member: '李芳、王小红'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 组 id
            groupId:0,
            // 名称
            name: '财务A组',
            // 组头像
            groupImg: '',
            // 组长
            leader: '组长A',
            // 副组长
            leaderFu: '副组长A',
            // 组类型
            type: '出纳',
            // 简要
            jianyao: '我们是有爱的财务部出纳小组',
            // 创建时间
            ctime: '2016-12-09',
            // 人数
            memberCount: 7,
            // 成员
            member: '李芳、王小红'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 组 id
            groupId:0,
            // 名称
            name: '财务A组',
            // 组头像
            groupImg: '',
            // 组长
            leader: '组长A',
            // 副组长
            leaderFu: '副组长A',
            // 组类型
            type: '出纳',
            // 简要
            jianyao: '我们是有爱的财务部出纳小组',
            // 创建时间
            ctime: '2016-12-09',
            // 人数
            memberCount: 7,
            // 成员
            member: '李芳、王小红'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 组 id
            groupId:0,
            // 名称
            name: '财务A组',
            // 组头像
            groupImg: '',
            // 组长
            leader: '组长A',
            // 副组长
            leaderFu: '副组长A',
            // 组类型
            type: '出纳',
            // 简要
            jianyao: '我们是有爱的财务部出纳小组',
            // 创建时间
            ctime: '2016-12-09',
            // 人数
            memberCount: 7,
            // 成员
            member: '李芳、王小红'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 组 id
            groupId:0,
            // 名称
            name: '财务A组',
            // 组头像
            groupImg: '',
            // 组长
            leader: '组长A',
            // 副组长
            leaderFu: '副组长A',
            // 组类型
            type: '出纳',
            // 简要
            jianyao: '我们是有爱的财务部出纳小组',
            // 创建时间
            ctime: '2016-12-09',
            // 人数
            memberCount: 7,
            // 成员
            member: '李芳、王小红'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 组 id
            groupId:0,
            // 名称
            name: '财务A组',
            // 组头像
            groupImg: '',
            // 组长
            leader: '组长A',
            // 副组长
            leaderFu: '副组长A',
            // 组类型
            type: '出纳',
            // 简要
            jianyao: '我们是有爱的财务部出纳小组',
            // 创建时间
            ctime: '2016-12-09',
            // 人数
            memberCount: 7,
            // 成员
            member: '李芳、王小红'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 组 id
            groupId:0,
            // 名称
            name: '财务A组',
            // 组头像
            groupImg: '',
            // 组长
            leader: '组长A',
            // 副组长
            leaderFu: '副组长A',
            // 组类型
            type: '出纳',
            // 简要
            jianyao: '我们是有爱的财务部出纳小组',
            // 创建时间
            ctime: '2016-12-09',
            // 人数
            memberCount: 7,
            // 成员
            member: '李芳、王小红'
          } */
        ],
        currPage: 1,
        // 表格每一页展示的行数
        pageSize: 3,
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
      this.getGroupList()
    },
    methods: {
      getGroupList() {
        this.$http.get('http://121.41.67.25:8062/group/select/1/5').then(res => {
          // console.log(res)
          if(res.status === 200) {
            this.groupData = res.data.data.records
            this.currPage = res.data.data.current
            this.pageSize = res.data.data.size
            this.total = res.data.data.total
          }
        })
      },
      // 根据 id 查看
      seeById(id) {
        console.log(id);
        this.$http.get(' http://121.41.67.25:8062/group/selectbyid/'+ id)
          .then (res => {
            if(res.status === 200) {
              // console.log(res.data)
              let formData = res.data.data
              this.form2.id = formData.id
              this.form2.name = formData.name
              this.form2.comment = formData.comment
              this.form2.leaderName = formData.leaderName
              this.form2.assistantName = formData.assistantName
              this.form2.type = formData.type
              // 后端没给 member
              // this.form.member = formData.member   
              this.form2.image = formData.image
              console.log(this.form2)
              this.dialogFormVisible = true
            }
          })
      },
      //选中列表行
      handleSelectionChange(val) {
        // val是 选中的行的信息对象 组成的数组
        // console.log(val)
        console.log('选中')
        // "批量删除"按钮 是否可以操作
        this.isButtonOperated = val.length > 0 ? true: false
        // let selectedIdArr = []
        val.forEach(item => {
          this.selectedIdArr.push(item.id)
        })
        // 去重
        this.selectedIdArr = [...new Set(this.selectedIdArr)]
        console.log(this.selectedIdArr)
        console.log(this.selectedIdArrStr = this.selectedIdArr.toString())
        console.log(this.selectedIdArrStr)
      },
      selectable() {          
        /* if(row.status == 1){
          return true
        }else {
          return false
        } */
        return true
      },
      // “批量删除”
      deleteAll() {
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: true
        }).then(() => {
          this.$http.post('http://121.41.67.25:8062/group/delete', this.selectedIdArr)
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
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
      deleteOne(id) {
        this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          showClose: true
        }).then(() => {
          this.$http.get('http://121.41.67.25:8062/group/deletebyid/'+ id)
            .then(res => {
              if(res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.$http.get('http://121.41.67.25:8062/group/select/'+ this.currPage + '/' + this.pageSize).then(res => {
                  if(res.status === 200) {
                    this.groupData = res.data.data.records
                    // console.log(this.groupData)
                    this.currPage = res.data.data.current
                    this.pageSize = res.data.data.size
                    this.total = res.data.data.total
                  }
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 添加
      /* add() {
        this.showAddAccount = true
      }, */
      // 提交添加的账单信息
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // alert('submit!')
            // console.log(this.form)
            this.$http.post('http://121.41.67.25:8062/group/add', this.form)
              .then(res => {
                if(res.status === 200) {
                  this.$refs.popover1.doClose()
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      // 取消
      cancel() {
        this.$refs.popover1.doClose()
      },
      close() {
        this.$refs.popover2.doClose()
      },
      // 切换当前页
      handleCurrentChange(cpage) {
        this.currPage = cpage
        // console.log('当前页：'+cpage)
        this.$http.get('http://121.41.67.25:8062/group/select/'+ cpage + '/' + this.pageSize).then(res => {
          // console.log(res)
          if(res.status === 200) {
            this.groupData = res.data.data.records
            // console.log(this.groupData)
            this.currPage = res.data.data.current
            this.pageSize = res.data.data.size
            this.total = res.data.data.total
          }
        })
      },
      // 切换一页展示的条数
      handleSizeChange(psize) {
        this.pageSize = psize
        // console.log('展示条数：'+psize)
        this.$http.get('http://121.41.67.25:8062/group/select/'+ this.currPage + '/' + psize).then(res => {
          // console.log(res)
          if(res.status === 200) {
            this.groupData = res.data.data.records
            console.log(this.groupData)
            this.currPage = res.data.data.current
            this.pageSize = res.data.data.size
            this.total = res.data.data.total
          }
        })
      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    components: {
      // addAccount
    }
  }
</script>

<style lang="less" scoped>
.finance-group-container {
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
  .el-dialog__header {
    background-color: #001529!important;
  }
}
</style>