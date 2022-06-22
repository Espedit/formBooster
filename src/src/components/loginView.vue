<template>
<div class="registerView">
      <form>
  <div class="form-group">
    <label for="formGroupExampleInput">Username</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Username">
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">E-amil</label>
    <input type="email" class="form-control" id="formGroupExampleInput2" placeholder="email">

  </div>
<div class="form-group">
<button type="submit" class="btn btn-primary">Sign In</button>

</div>
</form>
</div>
</template>


<script>

export default  {


    name : 'registerView'
}









</script>




<style scoped>


.registerView{

  display: flex;
  justify-content: center;
  align-items: center;


}

form{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: darkgray;
  width:350px;
  padding:30px;


}

label{

    font-weight: bold;
}


</style>