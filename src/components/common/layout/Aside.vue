<template>
  <div class="aside-container">
    <div class="empty"></div>
    <!-- 用户登录信息 -->
    <div class="user">
      <div class="user-avatar">
        <img src="@/assets/images/publicLayout/aside/user-avatar.jpg" alt="">
      </div>
      <div class="user-name">
        <p>你好！{{userName}}，欢迎登录！</p>
      </div>
    </div>
    <!-- 管理系统列表 -->
    <el-col :span="12">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="isUniqueOpened"
        v-for="(systems, index) in systems" :key="index">
        <el-submenu :index="'+index+1+'" class="aside-submenu">
          <template slot="title">
            <i :class="systems.iconClassName"></i>
            <span>{{ systems.systemName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="aside-item" v-for="(item, index) in systems.children" :key="index" @click="$router.push(item.path)"><i class="el-icon-arrow-right"></i>{{ item.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: 'Jack',
      isUniqueOpened: true,
      systems: [
        {
          systemName: '超级管理系统',
          systemsId: 1,
          iconClassName: 'el-icon-edit-outline',
          children: [
            {
              name: '子项目一',
              path: '/'
            },
            {
              name: '子项目二',
              path: '/'
            },
            {
              name: '子项目三',
              path: '/'
            },
            {
              name: '子项目四',
              path: '/'
            },
            {
              name: '子项目五',
              path: '/'
            },
            {
              name: '子项目六',
              path: '/'
            }
          ]
        },
        {
          systemName: '财务管理系统',
          systemsId: 2,
          iconClassName: 'el-icon-news',
          children: [
            {
              name: '公司账目列表',
              path: '/finance/company'
            },
            {
              name: '固定资产管理',
              path: '/finance/fixed-assets'
            },
            {
              name: '报销管理',
              path: '/finance/apply'
            },
            {
              name: '福利保险管理',
              path: '/finance/welfare'
            },
            {
              name: '工资管理',
              path: '/finance/wage'
            },
            {
              name: '组管理',
              path: '/finance/group'
            }
          ]
        },
        {
          systemName: '人事管理系统',
          systemsId: 3,
          iconClassName: 'el-icon-service',
          children: [
            {
              name: '子项目一',
              path: '/'
            },
            {
              name: '子项目二',
              path: '/'
            },
            {
              name: '子项目三',
              path: '/'
            },
            {
              name: '子项目四',
              path: '/'
            },
            {
              name: '子项目五',
              path: '/'
            },
            {
              name: '子项目六',
              path: '/'
            }
          ]
        },
        {
          systemName: '技术管理系统',
          systemsId: 4,
          iconClassName: 'el-icon-edit',
          children: [
            {
              name: '子项目一',
              path: '/'
            },
            {
              name: '子项目二',
              path: '/'
            },
            {
              name: '子项目三',
              path: '/'
            },
            {
              name: '子项目四',
              path: '/'
            },
            {
              name: '子项目五',
              path: '/'
            },
            {
              name: '子项目六',
              path: '/'
            }
          ]
        },
        {
          systemName: '销售管理系统',
          systemsId: 5,
          iconClassName: 'el-icon-edit',
          children: [
            {
              name: '子项目一',
              path: '/'
            },
            {
              name: '子项目二',
              path: '/'
            },
            {
              name: '子项目三',
              path: '/'
            },
            {
              name: '子项目四',
              path: '/'
            },
            {
              name: '子项目五',
              path: '/'
            },
            {
              name: '子项目六',
              path: '/'
            }
          ]
        },
        {
          systemName: '日志管理系统',
          systemsId: 6,
          iconClassName: 'el-icon-edit',
          children: [
            {
              name: '子项目一',
              path: '/'
            },
            {
              name: '子项目二',
              path: '/'
            },
            {
              name: '子项目三',
              path: '/'
            },
            {
              name: '子项目四',
              path: '/'
            },
            {
              name: '子项目五',
              path: '/'
            },
            {
              name: '子项目六',
              path: '/'
            }
          ]
        },
        {
          systemName: '统计分析系统',
          systemsId: 7,
          iconClassName: 'el-icon-edit',
          children: [
            {
              name: '公司每月进出账情况',
              path: '/'
            },
            {
              name: '公司每月的员工招聘和流失情况',
              path: '/'
            },
            {
              name: '公司每月的各个部门的考勤统计',
              path: '/'
            },
            {
              name: '首页（服务器信息统计）',
              path: '/'
            },
            {
              name: '请求统计',
              path: '/'
            },
            {
              name: '财务相关统计',
              path: '/'
            },
            {
              name: '技术相关统计',
              path: '/'
            },
            {
              name: '销售相关统计',
              path: '/'
            },
            {
              name: '人事相关统计',
              path: '/'
            },
            {
              name: 'IM相关统计',
              path: '/'
            },
            {
              name: '支付相关统计',
              path: '/'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen() {
      // console.log(key, keyPath);
    },
    handleClose() {
      // console.log(key, keyPath);
    },
  }
}
</script>

<style lang="less">
.aside-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  min-height: 100vh;
  background-color: #001529;
  color: #333;
  text-align: center;
  color: #fff;
  .empty {
    left: 0;
    top: 0;
    position: fixed;
    width: 220px;
    height: 100vh;
    background-color: #001529;
    z-index: -1;
  }
  .user {
    .user-avatar {
      margin-top: 30px;
      width: 80px;
      height: 80px;
      margin-left: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name {
      p {
        margin: 16px 0;
        font-size: 14px;
      }
    }
  }
  .el-col {
    width: 100%;
    .el-submenu.aside-submenu {
      &:hover {
        background-color: rgb(78,84,101)!important;
      }
    }
    .el-menu-item-group__title {
      padding: 0;
    }
    .el-menu-item.aside-item {
      background-color: rgb(0,15,29)!important;
      font-size: 12px;
      display: flex;
      align-items: center;
      padding-left: 60px!important;
      &:hover {
        background-color: rgb(78,84,101)!important;
      }
      &:active {
        background-color: rgb(34, 86, 231)!important;
      }
      i {
        color: #fff;
        font-size: 12px;
      }
    }
  }
}
</style>