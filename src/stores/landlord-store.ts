import { defineStore } from "pinia";

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female'
}

export type Gender = typeof GENDER;

export interface LandLord {
  id: number;
  gender?: Gender;
  first_name?: string;
  last_name?: string;
  created_at?: string;
  updated_at?: string;
  full_name?: string;
  house?: string;
}

export const useLandlordStore = defineStore('landlord', {
  state: () => ({
    landlordList: [] as LandLord[],
    landlordById: new Map() as Map<number, LandLord>
  }),
  getters: {
    getLandlords: (state) => state.landlordList,
    getById: (state) => {
      return (id: number) => state.landlordById.get(id)   
    }
  },
  actions: {
    retrieveLandlords(list: LandLord[]) {
      this.landlordList = list;
      for (const landlord of this.landlordList) {
        this.landlordById.set(landlord.id, landlord);
      }
    },
    addLandlord(landlord: LandLord) {
      this.landlordList.push(landlord);
      this.landlordById.set(landlord.id, landlord);
    }
  },
});
