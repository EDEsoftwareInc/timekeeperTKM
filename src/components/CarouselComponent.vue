<template>
  <q-carousel
    v-model="slide"
    swipeable
    animated
    navigation
    padding
    height="400px"
    class="bg-white text-black rounded-borders shadow-3 carousel-slide"
    style="width: 100%; max-width: 1100px; padding: 0 !important"
  >
    <q-carousel-slide name="style" class="row items-center">
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <q-img src="~assets/employee-benefits1.png" />
      </div>
      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 text-layout">
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
  background: #d9d9d9;
  width: 134px;
  height: 28px;
  left: 765px;
  align-items: center;
}

i.q-icon.notranslate.material-icons {
  font-size: 10px;
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
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 120% */
  letter-spacing: 0.1px;
  width: 100%;
  max-width: 533px;
  margin-inline: auto;
}
.q-carousel__slide.row.items-center {
  padding: 0;
}

/* Media query for tablet and smaller screens */
@media (max-width: 768px) {
  .q-carousel__control.q-carousel__navigation.no-wrap.absolute.flex.q-carousel__navigation--buttons.q-carousel__navigation--bottom {
    left: 50%; /* Center the navigation control */
    transform: translateX(-50%);
  }
}
</style>
