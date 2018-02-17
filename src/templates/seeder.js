module.exports = function(model, path = '../../app/models/', faker) {

  const modelName = `${model}Model`;

  return (`
const ${modelName} = require('${path}${modelName}');

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
        let user = new ${modelName}(record);
        models.push(user.save());
      });

      return Promise.all(models).then(() => Promise.resolve);
    });
  },
  down(){
    return ${modelName}.remove({});
  }
}
`);
};
