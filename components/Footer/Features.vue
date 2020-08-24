<template>
  <div class="bg-grey">
    <div class="container">
      <div class="pt-4 pb-4 pl-2 pr-2 flex justify-between overflow-auto mt-2 ">
        <div class="flex align-center mr-5 shrink-0 ">
          <svgCreditCard class="mr-3" width="24" />
          <span class="font-bold uppercase">БЕЗОПАСНЫЕ ПЛАТЕЖИ</span>
        </div>
        <div class="flex align-center mr-5 shrink-0 ">
          <svgFlatbed class="mr-3" width="24" />
          <span class="font-bold uppercase">БЕЗОПАСНАЯ ДОСТАВКА</span>
        </div>
        <div class="flex align-center mr-5 shrink-0 ">
          <svgHandShaking class="mr-3" width="24" />
          <span class="font-bold uppercase">БОЛЕЕ 100 БРЕНДОВ</span>
        </div>
        <div class="flex align-center shrink-0 ">
          <svgSofa class="mr-3" width="24" />
          <span class="font-bold uppercase">БОЛЕЕ 40 000 ТОВАРОВ</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgCreditCard from "@/assets/icons/credit-card.svg";
import svgFlatbed from "@/assets/icons/doly-flatbed.svg";
import svgHandShaking from "@/assets/icons/handshaking.svg";
import svgSofa from "@/assets/icons/sofa.svg";
export default {
  components: {
    svgCreditCard,
    svgFlatbed,
    svgHandShaking,
    svgSofa,
  },
};
</script>

<style lang="scss" >
</style>