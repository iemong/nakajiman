<template lang="pug">
  - path = "~/assets/img/contact/"
  .form-message
    label.label(for="message")
      img(src=`${path}message.svg` alt="message")
    textarea.input(@input="textareaResize" maxlength="1000" id="message" name="message" v-model="message" ref="textarea" placeholder="お問い合わせ内容をご入力ください" required @focus="isFocus(true)" @blur="isFocus(false)")
    .bar(:data-is-focus="isFocused")
</template>

<script>
import _ from 'lodash'
import UA from '@/assets/helper/getUA'
export default {
    components: {
        name: 'formMessage'
    },
    data() {
        return {
            message: '',
            isFocused: false
        }
    },
    watch: {
        message: function(newValue) {
            this.$emit('update', newValue)
        }
    },
    mounted() {
        this.textareaResize()
    },
    methods: {
        textareaResize(e) {
            this.$refs.textarea.style.height = UA.isPC ? '20px' : '21px'

            const maxHeight = UA.isPC ? 84 : 80
            let height = _.clamp(
                this.$refs.textarea.scrollHeight,
                0,
                maxHeight
            )
            this.$refs.textarea.style.height = height + 'px'
        },
        isFocus(bool) {
            this.isFocused = bool
        }
    }
}
</script>

<style lang="stylus" scoped>
  .label
    display: block
    margin-bottom: 9px
    +sp-layout()
      line-height: 0
      height: 8px
      & > img
        height: 8px

  .input
    resetTextarea()

  .input
    display: block
    size: 100% 17px
    margin-bottom: 12px
    font-size 14px
    +ks-placeholder()
      color: rgba(0, 0, 0, 0.5)
    +sp-layout()
      font-size: 12px
      margin-bottom: 8px
      line-height: 1.67

  .bar
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    &[data-is-focus="true"]
      border-bottom: 1px solid rgba(0, 0, 0, 1);

</style>
