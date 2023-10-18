function apiDataConverter(data) {
  const newObj = {
    id: data.id,
    name: data.name,
    height: data.height.metric,
    weight: data.weight.metric,
    life_span: data.life_span,
    image: data.image.url,
    temperament: data.temperament ? data.temperament.split(", ") : [],
    created: false,
  };
  return newObj;
}

module.exports = apiDataConverter;
