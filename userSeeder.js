
const undefinedModel = require('../../app/models/undefinedModel');

module.exports = {
  up(fake){
    const data = [];
    const models = [];

    for(let i = 0; i < 100; i++) {
      data.push({
          example: faker.first_name,
      });
    }

    return this.drop().then(() => {
      data.forEach((record) => {
        let user = new undefinedModel(record);
        models.push(user.save());
      });

      return Promise.all(models).then(() => Promise.resolve);
    });
  },
  down(){
    return undefinedModel.remove({});
  }
}
