<template>
  <div class="welfare-container">
    <div class="operate">
      <el-button type="danger" size="small" @click="deleteAll" v-if="isButtonOperated">批量删除<i class="el-icon-delete"></i></el-button>
      <el-button type="danger" size="small"  disabled v-else>批量删除<i class="el-icon-delete"></i></el-button>
      <el-button type="primary" size="small" v-popover:popover4>添加<i class="el-icon-circle-plus-outline"></i></el-button>
    </div>
    <hr>
    <div class="table-container">
      <template>
        <el-table
          :data="welfareData"
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
            prop="welfareId"
            label="ID"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="left"
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="yanglao"
            label="养老保险"
            width="150">
          </el-table-column>
          <el-table-column
            prop="yiliao"
            label="医疗保险"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="gongshang"
            label="工伤保险"
            width="120">
          </el-table-column>
          <el-table-column
            prop="shiye"
            label="失业保险"
            width="100">
          </el-table-column>
          <el-table-column
            prop="shengyu"
            label="生育保险"
            width="100">
          </el-table-column>
          <el-table-column
            prop="zhufang"
            label="住房公积金"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jiangjin"
            label="奖金"
            width="100">
          </el-table-column>
          <el-table-column
            prop="type"
            label="jichu"
            width="100">
          </el-table-column>
          <el-table-column
            prop="personalPer"
            label="个人工资保险比例"
            width="100">
          </el-table-column>
          <el-table-column
            prop="companyPer"
            label="公司负担保险比例"
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
        welfareData: [
          {
            // 复选框是否选中
            isSelected: false,
            // id
            welfareId: 754239701,
            // 姓名
            name: '李晓苏',
            // 养老保险
            yanglao: '******************************',
            // 医疗保险
            yiliao: '2016-05-03',
            // 工伤保险
            gongshang: '2016-05-03',
            // 失业保险
            shiye: '王小虎',
            // 生育保险
            shengyu: 200000,
            // 住房公积金
            zhufang: 800000,
            // 奖金
            jiangjin: '支付宝',
            // 基础薪资
            jichu: '出账',
            // 个人工资保险比例
            personalPer: '王晓红、李大嘴',
            // 公司负担保险比例
            companyPer: '天天用时时用',
            // 备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // id
            welfareId: 754239701,
            // 姓名
            name: '李晓苏',
            // 养老保险
            yanglao: '******************************',
            // 医疗保险
            yiliao: '2016-05-03',
            // 工伤保险
            gongshang: '2016-05-03',
            // 失业保险
            shiye: '王小虎',
            // 生育保险
            shengyu: 200000,
            // 住房公积金
            zhufang: 800000,
            // 奖金
            jiangjin: '支付宝',
            // 基础薪资
            jichu: '出账',
            // 个人工资保险比例
            personalPer: '王晓红、李大嘴',
            // 公司负担保险比例
            companyPer: '天天用时时用',
            // 备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // id
            welfareId: 754239701,
            // 姓名
            name: '李晓苏',
            // 养老保险
            yanglao: '******************************',
            // 医疗保险
            yiliao: '2016-05-03',
            // 工伤保险
            gongshang: '2016-05-03',
            // 失业保险
            shiye: '王小虎',
            // 生育保险
            shengyu: 200000,
            // 住房公积金
            zhufang: 800000,
            // 奖金
            jiangjin: '支付宝',
            // 基础薪资
            jichu: '出账',
            // 个人工资保险比例
            personalPer: '王晓红、李大嘴',
            // 公司负担保险比例
            companyPer: '天天用时时用',
            // 备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // id
            welfareId: 754239701,
            // 姓名
            name: '李晓苏',
            // 养老保险
            yanglao: '******************************',
            // 医疗保险
            yiliao: '2016-05-03',
            // 工伤保险
            gongshang: '2016-05-03',
            // 失业保险
            shiye: '王小虎',
            // 生育保险
            shengyu: 200000,
            // 住房公积金
            zhufang: 800000,
            // 奖金
            jiangjin: '支付宝',
            // 基础薪资
            jichu: '出账',
            // 个人工资保险比例
            personalPer: '王晓红、李大嘴',
            // 公司负担保险比例
            companyPer: '天天用时时用',
            // 备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // id
            welfareId: 754239701,
            // 姓名
            name: '李晓苏',
            // 养老保险
            yanglao: '******************************',
            // 医疗保险
            yiliao: '2016-05-03',
            // 工伤保险
            gongshang: '2016-05-03',
            // 失业保险
            shiye: '王小虎',
            // 生育保险
            shengyu: 200000,
            // 住房公积金
            zhufang: 800000,
            // 奖金
            jiangjin: '支付宝',
            // 基础薪资
            jichu: '出账',
            // 个人工资保险比例
            personalPer: '王晓红、李大嘴',
            // 公司负担保险比例
            companyPer: '天天用时时用',
            // 备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },

          {
            // 复选框是否选中
            isSelected: false,
            // id
            welfareId: 754239701,
            // 姓名
            name: '李晓苏',
            // 养老保险
            yanglao: '******************************',
            // 医疗保险
            yiliao: '2016-05-03',
            // 工伤保险
            gongshang: '2016-05-03',
            // 失业保险
            shiye: '王小虎',
            // 生育保险
            shengyu: 200000,
            // 住房公积金
            zhufang: 800000,
            // 奖金
            jiangjin: '支付宝',
            // 基础薪资
            jichu: '出账',
            // 个人工资保险比例
            personalPer: '王晓红、李大嘴',
            // 公司负担保险比例
            companyPer: '天天用时时用',
            // 备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // id
            welfareId: 754239701,
            // 姓名
            name: '李晓苏',
            // 养老保险
            yanglao: '******************************',
            // 医疗保险
            yiliao: '2016-05-03',
            // 工伤保险
            gongshang: '2016-05-03',
            // 失业保险
            shiye: '王小虎',
            // 生育保险
            shengyu: 200000,
            // 住房公积金
            zhufang: 800000,
            // 奖金
            jiangjin: '支付宝',
            // 基础薪资
            jichu: '出账',
            // 个人工资保险比例
            personalPer: '王晓红、李大嘴',
            // 公司负担保险比例
            companyPer: '天天用时时用',
            // 备注
            remarks: '这是财务备注',
            // 附件（发票等）
            accessory: '这是附件'
          },
          {
            // 复选框是否选中
            isSelected: false,
            // id
            welfareId: 754239701,
            // 姓名
            name: '李晓苏',
            // 养老保险
            yanglao: '******************************',
            // 医疗保险
            yiliao: '2016-05-03',
            // 工伤保险
            gongshang: '2016-05-03',
            // 失业保险
            shiye: '王小虎',
            // 生育保险
            shengyu: 200000,
            // 住房公积金
            zhufang: 800000,
            // 奖金
            jiangjin: '支付宝',
            // 基础薪资
            jichu: '出账',
            // 个人工资保险比例
            personalPer: '王晓红、李大嘴',
            // 公司负担保险比例
            companyPer: '天天用时时用',
            // 备注
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
.welfare-container {
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