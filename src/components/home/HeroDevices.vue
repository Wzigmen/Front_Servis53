<template>

<div class="hero-image">


<div class="circle circle-one"></div>

<div class="circle circle-two"></div>



<img
src="@/assets/images/hero/laptop.png"
class="device laptop"
/>



<img
src="@/assets/images/hero/phone.png"
class="device phone"
/>



<img
src="@/assets/images/hero/headphones.png"
class="device headphones"
/>


</div>


</template>



<style scoped>


.hero-image{

position:relative;

height:600px;

}



.device{

position:absolute;

z-index:2;

filter:drop-shadow(0 25px 35px rgba(0,0,0,.15));

}



.laptop{

width:380px;

top:120px;

left:50%;

transform:translateX(-50%);

animation:floatLaptop 6s infinite ease-in-out;

}



.phone{

width:130px;

bottom:120px;

left:80px;

animation:floatPhone 4.5s infinite ease-in-out;

}



.headphones{

width:150px;

right:50px;

top:100px;

animation:floatHeadphones 5.5s infinite ease-in-out;

}





.circle{

position:absolute;

border-radius:50%;

filter:blur(60px);

}



.circle-one{

width:300px;

height:300px;

background:#bfdbfe;

right:100px;

top:80px;

}



.circle-two{

width:250px;

height:250px;

background:#dbeafe;

left:80px;

bottom:80px;

}




@keyframes floatLaptop{


0%,100%{

transform:translateX(-50%) translateY(0);

}


50%{

transform:translateX(-50%) translateY(-25px);

}


}



@keyframes floatPhone{


0%,100%{

transform:translateY(0);

}


50%{

transform:translateY(-20px);

}


}



@keyframes floatHeadphones{


0%,100%{

transform:translateY(0);

}


50%{

transform:translateY(-18px);

}


}


</style>