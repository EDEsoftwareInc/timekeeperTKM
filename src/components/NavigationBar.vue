<template>
  <div class="row justify-center q-mr-xl">
    <span @click="$emit('prev')" style="cursor: pointer; margin-right: 15px"
      ><q-icon class="text-h4" name="mdi-chevron-left"
    /></span>
    <span @click="$emit('next')" style="cursor: pointer"
      ><q-icon class="text-h4" name="mdi-chevron-right"
    /></span>
    <!-- <div class="q-pa-md q-gutter-sm row">
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('today')">
        Today
      </q-btn>
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('prev')">
        &lt; Prev
      </q-btn>
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('next')">
        Next &gt;
      </q-btn>
    </div> -->
  </div>
</template>
