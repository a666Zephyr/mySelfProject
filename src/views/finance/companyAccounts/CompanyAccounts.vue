<template>
  <div class="company-accounts-container">
    <div class="operate">
      <el-button type="danger" size="small" @click="deleteAll" v-if="isButtonOperated">批量删除<i class="el-icon-delete"></i></el-button>
      <el-button type="danger" size="small"  disabled v-else>批量删除<i class="el-icon-delete"></i></el-button>
      <el-button type="primary" size="small" v-popover:popover4>添加<i class="el-icon-circle-plus-outline"></i></el-button>
    </div>
    <hr>
    <div class="table-container">
      <template>
        <el-table
          :data="billData"
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
            label="名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jianyao"
            label="简要"
            width="150">
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="创建时间"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="mtime"
            label="修改时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="mperson"
            label="修改人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="useMoney"
            label="金额"
            width="100">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="余额"
            width="100">
          </el-table-column>
          <el-table-column
            prop="channel"
            label="渠道"
            width="100">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="usePerson"
            label="使用人"
            width="100">
          </el-table-column>
          <el-table-column
            prop="useProject"
            label="使用项目"
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
        ref="popover4"
        placement="right"
        trigger="click"
        width="600"
        title="添加公司账目">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账目名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="简要">
            <el-input v-model="form.jianyao"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="form.money"></el-input>
          </el-form-item>
          <el-form-item label="使用渠道">
            <el-select v-model="form.channel" placeholder="请选择账单支付方式">
              <el-option label="支付宝" value="zhifubao"></el-option>
              <el-option label="微信" value="weixin"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账单类型">
            <el-radio-group v-model="form.type">
              <el-radio label="入账"></el-radio>
              <el-radio label="出账"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用人">
            <el-input v-model="form.usePerson"></el-input>
          </el-form-item>
          <el-form-item label="使用项目">
            <el-input v-model="form.useProject"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-popover>
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
        billData: [
          {
            // 复选框是否选中
            isSelected: false,
            // 名称
            name: '买电脑',
            // 简要
            jianyao: '******************************',
            // 创建时间
            ctime: '2016-05-03',
            // 修改时间
            mtime: '2016-05-03',
            // 修改人
            mperson: '王小虎',
            // 金额
            useMoney: 200000,
            // 余额
            balance: 800000,
            // 渠道，0支付宝、1微信
            channel: '支付宝',
            // 类型，0进账、1出账
            type: '出账',
            // 使用人
            usePerson: '王晓红、李大嘴',
            // 使用项目
            useProject: '天天用时时用',
            // 审批人
            approver: '总管李',
            // 审批人备注
            remarksOfApprover: '审核通过',
            // 确认状态，0审核通过，1待审核，2审核未通过
            status: 0,
            // 财务备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 名称
            name: '买电脑',
            // 简要
            jianyao: '******************************',
            // 创建时间
            ctime: '2016-05-03',
            // 修改时间
            mtime: '2016-05-03',
            // 修改人
            mperson: '王小虎',
            // 金额
            useMoney: 200000,
            // 余额
            balance: 800000,
            // 渠道，0支付宝、1微信
            channel: '支付宝',
            // 类型，0进账、1出账
            type: '出账',
            // 使用人
            usePerson: '王晓红、李大嘴',
            // 使用项目
            useProject: '天天用时时用',
            // 审批人
            approver: '总管李',
            // 审批人备注
            remarksOfApprover: '审核通过',
            // 确认状态，0审核通过，1待审核，2审核未通过
            status: 0,
            // 财务备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 名称
            name: '买电脑',
            // 简要
            jianyao: '******************************',
            // 创建时间
            ctime: '2016-05-03',
            // 修改时间
            mtime: '2016-05-03',
            // 修改人
            mperson: '王小虎',
            // 金额
            useMoney: 200000,
            // 余额
            balance: 800000,
            // 渠道，0支付宝、1微信
            channel: '支付宝',
            // 类型，0进账、1出账
            type: '出账',
            // 使用人
            usePerson: '王晓红、李大嘴',
            // 使用项目
            useProject: '天天用时时用',
            // 审批人
            approver: '总管李',
            // 审批人备注
            remarksOfApprover: '审核通过',
            // 确认状态，0审核通过，1待审核，2审核未通过
            status: 0,
            // 财务备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 名称
            name: '买电脑',
            // 简要
            jianyao: '******************************',
            // 创建时间
            ctime: '2016-05-03',
            // 修改时间
            mtime: '2016-05-03',
            // 修改人
            mperson: '王小虎',
            // 金额
            useMoney: 200000,
            // 余额
            balance: 800000,
            // 渠道，0支付宝、1微信
            channel: '支付宝',
            // 类型，0进账、1出账
            type: '出账',
            // 使用人
            usePerson: '王晓红、李大嘴',
            // 使用项目
            useProject: '天天用时时用',
            // 审批人
            approver: '总管李',
            // 审批人备注
            remarksOfApprover: '审核通过',
            // 确认状态，0审核通过，1待审核，2审核未通过
            status: 0,
            // 财务备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 名称
            name: '买电脑',
            // 简要
            jianyao: '******************************',
            // 创建时间
            ctime: '2016-05-03',
            // 修改时间
            mtime: '2016-05-03',
            // 修改人
            mperson: '王小虎',
            // 金额
            useMoney: 200000,
            // 余额
            balance: 800000,
            // 渠道，0支付宝、1微信
            channel: '支付宝',
            // 类型，0进账、1出账
            type: '出账',
            // 使用人
            usePerson: '王晓红、李大嘴',
            // 使用项目
            useProject: '天天用时时用',
            // 审批人
            approver: '总管李',
            // 审批人备注
            remarksOfApprover: '审核通过',
            // 确认状态，0审核通过，1待审核，2审核未通过
            status: 0,
            // 财务备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // 名称
            name: '买电脑',
            // 简要
            jianyao: '******************************',
            // 创建时间
            ctime: '2016-05-03',
            // 修改时间
            mtime: '2016-05-03',
            // 修改人
            mperson: '王小虎',
            // 金额
            useMoney: 200000,
            // 余额
            balance: 800000,
            // 渠道，0支付宝、1微信
            channel: '支付宝',
            // 类型，0进账、1出账
            type: '出账',
            // 使用人
            usePerson: '王晓红、李大嘴',
            // 使用项目
            useProject: '天天用时时用',
            // 审批人
            approver: '总管李',
            // 审批人备注
            remarksOfApprover: '审核通过',
            // 确认状态，0审核通过，1待审核，2审核未通过
            status: 0,
            // 财务备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          }
        ],
        // "批量删除"按钮 是否可以操作
        isButtonOperated: false,
        form: {
          name: '',
          jianyao: '',
          money: '',
          channel: '',
          type: '',
          usePerson: '',
          useProject: '',
        }
      }
    },
    methods: {
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
      // 添加
      /* add() {
        this.showAddAccount = true
      }, */
      // 提交添加的账单信息
      onSubmit() {
        console.log('submit!');
      },
      // 取消
      cancel() {
        this.$refs.popover4.doClose()
      }
    },
    components: {
      // addAccount
    }
  }
</script>

<style lang="less" scoped>
.company-accounts-container {
  .operate{
    margin-bottom: 5px;
    i {
      margin-left: 3px;
    }
  }
  .table-container {
    margin-top: 10px;
  }
}
</style>