<template>
  <div class="block-three-col bg-grey pt-7 pb-7">
    <div class="container">
      <h3 class="text-center mb-6">ЗАЧЕМ ПОКУПАТЬ В WONDER?</h3>
      <div class="flex md-column justify-cennter text-center">
        <div class="col pr-3 pl-3">
          <div class="icon">
            <svgPeople width="28" />
          </div>

          <div class="col__text">
            <div
              class="col__title text-16 font-bold uppercase mt-3 mb-3"
            >КОМАНДА ПРОФЕССИОНАЛЬНЫХ КОНСУЛЬТАНТОВ</div>
            <div
              class="text-14"
            >Знания, опыт и индивидуальный подход к клиенту на каждом этапе выполнения заказа.</div>
          </div>
        </div>

        <div class="col pr-3 pl-3">
          <div class="icon">
            <svgDelivery width="34" />
          </div>
          <div class="col__text">
            <div class="col__title text-16 font-bold uppercase mt-3 mb-3">БЫСТРАЯ И БЕЗОПАСНАЯ ДОСТАВКА НА РАБЕ</div>
            <div
              class="text-14"
            >Тысячи товаров доступны сразу, только проверенные курьерские компании</div>
          </div>
        </div>
        <div class="col pr-3 pl-3">
          <div class="icon">
            <svgCreditCard width="32" />
          </div>
          <div class="col__text">
            <div class="col__title text-16 font-bold uppercase mt-3 mb-3">ЦЕНЫ ВАМ ПОНРАВЯТСЯ</div>
            <div class="text-14">Мебель, освещение и аксессуары с гарантией самой низкой цены</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgPeople from "@/assets/icons/team.svg";
import svgDelivery from "@/assets/icons/delivery.svg";
import svgCreditCard from "@/assets/icons/credit-card.svg";
export default {
  components: {
    svgPeople,
    svgDelivery,
    svgCreditCard,
  },
};
</script>

<style lang="scss">
.block-three-col {
  .col {
    width: 33.3333%;
    
    @include md {
        text-align: left;
        display: flex;
        align-items: flex-start;
        width: 100%;   
        margin-bottom: 1.2rem; 
    }
   
  }
  .col__text {
      @include md {
          padding:0 1rem;
      }
  }
  .col__title {
      @include md {
          margin-top: 0;
          font-size: 14px;
          margin-bottom: 0;
      }
  }
  
  .icon {
      flex-shrink: 0;
  }
}
</style>