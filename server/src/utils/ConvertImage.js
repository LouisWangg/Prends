const convertImageSameField = (items, imageKey = "image") =>
    items.map((item) => {
        const plain = item.get({ plain: true });
        const imageBuffer = plain[imageKey];

        plain[imageKey] = imageBuffer ? imageBuffer.toString("base64") : null;

        return plain;
    });

const convertArticleImages = (articles, imageKey = "ArticleImage") =>
    articles.map((article) => {
        const plain = article.get({ plain: true });
        const imageObj = plain[imageKey];

        if (imageObj && imageObj.image) {
            imageObj.image = imageObj.image.toString("base64");
        } else if (imageObj) {
            imageObj.image = null;
        }

        return plain;
    });


const convertImages = (items, imageKey = "Images") =>
    items.map((item) => {
        const plain = item.get({ plain: true });
        const images = plain[imageKey] || [];

        plain[imageKey] = images.map((img) => ({
            ...img,
            image: img.image ? img.image.toString("base64") : null,
        }));

        return plain;
    });

module.exports = {
  convertImageSameField,
  convertArticleImages,
  convertImages,
};