export class CateInit {
  load() {
    if (
      localStorage.getItem('categories') === null ||
      localStorage.getItem('categories') == undefined
    ) {
      console.log('No categories Found... Creating...');
      let categories = [
        {
          id: 1,
          name: 'dog',
        },
        {
          id: 2,
          name: 'cat',
        },
        {
          id: 3,
          name: 'bird',
        },
      ];

      localStorage.setItem('categories', JSON.stringify(categories));
      return;
    } else {
      console.log('Found categories ...');
    }
  }
}
