<template>
    <div class="modal-loading">
        <Loader />
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" >
.modal-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    z-index: 999;
}
</style>