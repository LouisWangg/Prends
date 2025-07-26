const convertImageSameField = (data, imageKey = "image") => {
  const process = (item) => {
    const plain = item.get({ plain: true });
    const imageBuffer = plain[imageKey];
    
    plain[imageKey] = imageBuffer ? imageBuffer.toString("base64") : null;
    return plain;
  };

  if (Array.isArray(data)) return data.map(process);
  if (data && typeof data.get === "function") return process(data);
  return null;
};

const convertArticleImages = (data, imageKey = "ArticleImage") => {
  const process = (article) => {
    const plain = article.get({ plain: true });
    const imageObj = plain[imageKey];

    if (imageObj && imageObj.image) {
      imageObj.image = imageObj.image.toString("base64");
    } else if (imageObj) {
      imageObj.image = null;
    }

    return plain;
  };

  if (Array.isArray(data)) return data.map(process);
  if (data && typeof data.get === "function") return process(data);
  return null;
};

const convertImages = (data, imageKey = "Images") => {
  const process = (item) => {
    const plain = item.get({ plain: true });
    const images = plain[imageKey] || [];

    plain[imageKey] = images.map((img) => ({
      ...img,
      image: img.image ? img.image.toString("base64") : null,
    }));

    return plain;
  };

  if (Array.isArray(data)) return data.map(process);
  if (data && typeof data.get === "function") return process(data);
  return null;
};

module.exports = {
  convertImageSameField,
  convertArticleImages,
  convertImages,
};
