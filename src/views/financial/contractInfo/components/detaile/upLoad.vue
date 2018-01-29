<template>
  <div class="upFiles">
    <div class="item">
      <label>附件说明：</label>
      <textarea rows="3" cols="20"></textarea>
    </div>
    <div class="item">
      <label>上传人：</label>
      <input type="text">
    </div>
    <div class="item">
      <label>上传时间：</label>
      <input type="text">
    </div>
    <div class="item">
      <label>添加附件：</label>
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" on-remove="handleRemove" before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>

</script>

<style>

</style>
