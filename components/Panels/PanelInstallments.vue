<template>
  <Panel name="panel-installments" headerTheme="dark" class="panel-installments">
    <template v-slot:title>ПОКУПКИ В РАССРОЧКУ</template>
    <template v-slot:content>
      <div class="panel-installments__content p-4">
        <h5 class="pb-4">ПРОДАЖА В РАССРОЧКУ ОСУЩЕСТВЛЯЕТСЯ ПРИ СОТРУДНИЧЕСТВЕ С BGŻ BNP PARIBAS.</h5>
        <p class="text-14">Если в предложении другого магазина вы найдете интересующий вас товар по цене ниже, чем предложенная на сайте wonder.pl, свяжитесь с нами - при его покупке вы получите соответствующую скидку. <b>Как это сделать?</b></p>
        <div class="panel-installments__list mt-3">
          <div class="bg-pale border-bottom border-white p-4 flex">
            <div class="panel-installments__icon bg-orange color-white p-1 shrink-0 mr-2">
              <svgCheckmark width="35" />
            </div>
             <p class="text-14">
                Вы выбираете один из двух возможных вариантов погашения: 10 или 20 равных 0% платежей - без скрытых затрат, только стоимость покупок.
              </p>
          </div>
          <div class="bg-pale border-bottom border-white p-4 flex">
            <div class="panel-installments__icon bg-orange color-white p-1 shrink-0 mr-2">
              <svgCheckmark width="35" />
            </div>
             <p class="text-14">
               Продажа в рассрочку распространяется только на заказы на сумму более 300 злотых (в случае 10 платежей) или 600 злотых (в случае 20 платежей).
              </p>
          </div>
          <div class="bg-pale border-bottom border-white p-4 flex">
            <div class="panel-installments__icon bg-orange color-white p-1 shrink-0 mr-2">
              <svgCheckmark width="35" />
            </div>
             <p class="text-14">
               Банк отправляет вам заявку на получение кредита с просьбой заполнить ее.
              </p>
          </div>
          <div class="bg-pale border-bottom border-white p-4 flex">
            <div class="panel-installments__icon bg-orange color-white p-1 shrink-0 mr-2">
              <svgCheckmark width="35" />
            </div>
             <p class="text-14">
              В случае положительного решения Банк связывается с wonder.shop для подтверждения готовности к отправке товара.
              </p>
          </div>
        </div>
        <div class="btn btn-black w-100 pt-3 pb-3 font-bold mt-3">Контакт</div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import svgCheckmark from "@/assets/icons/checkmark.svg";
export default {
  components: {
    Panel,
    svgCheckmark,
  },
  data() {
    return {
      tabActive: 1,
    };
  },
  methods: {
    selectTab(id) {
      this.tabActive = id;
    },
  },
};
</script>

<style lang="scss">
.panel-installments {
  &__icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>