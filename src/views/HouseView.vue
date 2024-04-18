<template>
  <div>
    <h1>Houses :</h1>
    <div v-for="landlord in landlords" :key="landlord.id" class="house-list">
      <house-item :landlord-id="landlord.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HouseItem from '../components/HouseItem.vue';
import { LandLord, useLandlordStore } from '../stores/landlord-store';

export default defineComponent({
  components: {
    HouseItem
  },
  setup() {
    const store = useLandlordStore();

    return { store }
  },
  computed: {
    landlords(): LandLord[] {
      return this.store.getLandlords;
    }
  }
})
</script>


<style>

h1 {
    margin-bottom: 16px;
}

.house-list {
    display: flex;
    flex-direction: row;
}
</style>
