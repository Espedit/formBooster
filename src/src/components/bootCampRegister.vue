<template>
<div class="bootcamp-register contanier">
  <p  id="feedback" v-if="feedback">{{feedback}}</p>
      <form  class="card-panel green-text"  @submit.prevent="registerBootcamp" novalidate>
<h2 class="center">Register for Bootcamp</h2>
<div class="field">
<label for="name">Name</label>
<input type="text" v-model="bootcamp.name" 
id="name"
placeholder="name"  
@blur="$v.bootcamp.name.$touch()">
<template v-if="$v.bootcamp.name.$error">
<p class="errorMessage" v-if="!$v.bootcamp.name.required">Name is required</p>
<p class="errorMessage" v-if="!$v.bootcamp.name.minLength">Name must be atleast 3 characters </p>
<p class="errorMessage" v-if="!$v.bootcamp.name.maxLength">Name must be maxim  50 characters </p>
</template>
</div>
<div class="field">
<label for="emal">Email</label>
<input type="email" id="email" v-model="bootcamp.email" 
placeholder="email"  
@blur="$v.bootcamp.email.$touch()">
<template v-if="$v.bootcamp.email.$error">
<p class="errorMessage" v-if="!$v.bootcamp.email.required">E-mail is required</p>
<p class="errorMessage" v-if="!$v.bootcamp.email.email">E-mail format is invalid</p>
<p class="errorMessage" v-if="!$v.bootcamp.email.uniqueEmail">E-mail was already register</p>

</template>
</div>
<div class="field">
<label ifor="location">Location</label>
<input  id="location" type="text" v-model="bootcamp.location" 
placeholder="location"  
@blur="$v.bootcamp.location.$touch()">
<template v-if="$v.bootcamp.location.$error">
<p class="errorMessage"  v-if="!$v.bootcamp.location.required">Location is required</p>
</template>
</div>
<div class="field">
<label  for="Contact">Contact Number</label>
<input id="phoneNUmber" type="text" v-model="bootcamp.phone_number" 
placeholder="phone number"  
@blur="$v.bootcamp.phone_number.$touch()">
<template v-if="$v.bootcamp.phone_number.$error">
<p class="errorMessage"  v-if="!$v.bootcamp.phone_number.required">Phone is required</p>
<p class="errorMessage"  v-if="!$v.bootcamp.phone_number.numeric">Only digits are allowed</p>
<p class="errorMessage"  v-if="!$v.bootcamp.phone_number.ensureOnly10DigitsLong">Contact number must be 1-10 digits long</p>

</template>
</div>
<div class="field center">
<button class="btn green" :disabled="$v.$invalid">Register</button>
</div>
</form>
</div>
</template>


<script>

import axios from 'axios'

import {required,email,minLength,maxLength,numeric}  from 'vuelidate/lib/validators'

export default  {


    name : 'bootCampRegister',



    data(){


      return {

       bootcamp: this.createFreshBootcamp(),

       feedback : ''

      }
    },

    validations :{

bootcamp :{

  name :{

    required,
    minLength : minLength(3),
    maxLength : maxLength(50)
  },
    email :{

    required,
    email,
     async uniqueEmail (value){

    if(value === '') return true;
      
      const  response = await axios.get("http://localhost:3000/registrations");
      const registrations = response.data;

const alreadyDoneRegistrations =registrations.find( registration => registration.email  === value)
    if(alreadyDoneRegistrations){

      return false
    }

    return true;


  },

    },



    location :{

    required
  },



    phone_number :{

    required,
    numeric,
    ensureOnly10DigitsLong(value){

      return value.trim().length === 10;
    }
  }

}



    },


    methods :{


   
   createFreshBootcamp(){

return {

        name : '',
        email : '',
        location : '',
        phone_number : ''
       }

      },







registerBootcamp(){


  this.$v.$touch();

  if(!this.$v.invalid){

    console.log('form got successufully submitted..');
    console.log(this.bootcamp);


    axios.post("http://localhost:3000/registrations",this.bootcamp).then(
      response => {


        console.log(response.data);
        this.feedback="Thank you registering to bootcamp";
        this.bootcamp = this.createFreshBootcamp();
        this.$v.bootcamp.$reset();
        setTimeout(

          ()  =>{


            this.feedback =''
          },2000)



      }
    ).catch(console.error)


  }




}









    }


    
    }










</script>




<style scoped>


.bootcamp-register {
position: relative;
  margin: 25px;
  

}


form  {

    position: relative;
 top:286px;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
margin-top:60px;
}


.bootcamp-register h2{

  font-size: 2.4em;
}


.bootcamp-register  .field{

  margin-bottom:16px;
}

.errorMessage{

  color:brown;
}


#feedback{

  position: relative;
  top:12px;
  font-weight: bold;
  font-size: 20px;
}

</style>