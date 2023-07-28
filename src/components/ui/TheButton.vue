<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {
  name: 'the-button',
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 2px solid teal;
  &--form {
    margin-top: 15px;
    align-self: end;
  }
}
</style>
