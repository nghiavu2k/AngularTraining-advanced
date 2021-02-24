import { Hero } from "../model/hero";

export class Init {
  load() {
    if (
      localStorage.getItem('heroes') === null ||
      localStorage.getItem('heroes') == undefined
    ) {
      console.log('No heroes Found... Creating...');
      let heroes: Hero[] = [
        // {
        //   id: 1,
        //   name: 'Nghia',
        //   age: 20,
        //   address: 'Hanoi, Vietnam',
        //   dob: new Date('2000/09/16'),
        //   email: 'vtnghia@cmc.com.vn',
        //   career: 'fresher',
        //   hobby: 'basketball',
        // },
        // {
        //   id: 2,
        //   name: 'Duong',
        //   age: 22,
        //   address: 'Hanoi, Vietnam',
        //   dob: '09/16/2000',
        //   email: 'nqduong@cmc.com.vn',
        //   career: 'fresher',
        //   hobby: 'football',
        // },
        // {
        //   id: 3,
        //   name: 'Tuan',
        //   age: 24,
        //   address: 'Bangkok, Thailand',
        //   dob: '09/16/2000',
        //   email: 'nmtuan3@cmc.com.vn',
        //   career: 'fresher',
        //   hobby: 'soccer',
        // },
      ];

      localStorage.setItem('heroes', JSON.stringify(heroes));
      return;
    } else {
      console.log('Found heroes...');
    }
  }
}
