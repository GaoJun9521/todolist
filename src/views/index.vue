<template lang="pug">
  .index
    Input(style="width: 600px", @on-enter='onEnter', v-model="todo", placeholder="What's your main focus?")
    Table(width="700", border, :columns="columns", :data="todoData")
    Modal(v-model="isShow" @on-ok="onUpdate", title="修改todo")
      Input(placeholder="What's your main focus?", v-model="updateTodo")
</template>

<script>
import { add, get, remove, update, done } from '@/assets/api'
import moment from 'moment'

export default {
  data () {
    return {
      todo: '',
      todoData: [],
      updateId: '',
      updateTodo: '',
      isShow: false,
      columns: [{
        title: 'Todo',
        key: 'todo',
        width: 450
      }, {
        title: 'TimeSpending',
        key: 'finish',
        width: 150
      }, {
        title: 'Action',
        fixed: 'right',
        width: 120,
        render: (h, params) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  this.done(params.row)
                }
              }
            }, '完成'),
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  this.remove(params.row)
                }
              }
            }, '取消'),
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  this.update(params.row)
                }
              }
            }, '更改')
          ])
        }
      }]
    }
  },
  methods: {
    onEnter () {
      var params = {}
      params.todo = this.todo
      params.done = false
      add(params).then(res => {
        this.stateCheck(res)
      })
    },
    stateCheck (res) {
      if (res.data.code === 200) {
        this.todoData = res.data.data.map((item) => {
          if (item.finish === 0) {
            item.finish = '--'
          } else {
            item.finish = moment(moment(item.id)).fromNow(true)
          }
          return item
        })
        this.todo = ''
      } else {
        this.$Message.error(res.data.data)
      }
    },
    remove (params) {
      remove({'id': params.id}).then(res => {
        this.stateCheck(res)
      })
    },
    update (params) {
      this.isShow = true
      this.updateId = params.id
      this.updateTodo = params.todo
    },
    onUpdate () {
      var result = {
        todo: this.updateTodo,
        id: this.updateId
      }
      update(result).then(res => {
        this.stateCheck(res)
      })
    },
    done (params) {
      done({ id: params.id }).then(res => {
        this.stateCheck(res)
      })
    }
  },
  created () {
    get().then(res => {
      this.stateCheck(res)
    })
  }
}
</script>

<style lang="scss">
.ivu-table-wrapper {
  margin: 50px auto;
}
</style>
