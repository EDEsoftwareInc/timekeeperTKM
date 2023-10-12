<template>
  <q-carousel
    v-model="slide"
    swipeable
    animated
    navigation
    padding
    height="300px"
    class="bg-white text-black rounded-borders shadow-3"
    style="width: 1060px"
  >
    <q-carousel-slide name="style" class="row items-center">
      <div class="col-6">
        <q-img src="~assets/employee-benefits.png" />
      </div>
      <div class="col-6">
        <p class="right-text-carousel">{{ lorem }}</p>
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="tv" class="column no-wrap flex-center">
      <q-icon name="live_tv" size="56px" />
      <div class="q-mt-md text-center">
        {{ lorem }}
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="layers" class="column no-wrap flex-center">
      <q-icon name="layers" size="56px" />
      <div class="q-mt-md text-center">
        {{ lorem }}
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref("style"),
      lorem:
        "We prioritize our employees' health by offering competitive medical insurance plans, ensuring that you and your family receive top-notch care.",
    };
  },
};
</script>

<style>
/* .q-carousel__navigation .q-btn {
  margin: 0 !important;
  padding: 0 !important;
} */
.q-carousel__control.q-carousel__navigation.no-wrap.absolute.flex.q-carousel__navigation--buttons.q-carousel__navigation--bottom {
  border-radius: 50px;
  background: var(--materials-ultrathin, rgba(37, 37, 37, 0.55));
  width: 100px;
  margin: 0 auto;
}

.q-carousel__navigation-inner.flex.flex-center.no-wrap {
  width: 100%;
  height: 24px;
  max-width: 64px;
  margin: 0 auto;
}
.right-text-carousel {
  color: #000;
  text-align: center;
  font-family: Nunito;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.1px;
}
</style>
