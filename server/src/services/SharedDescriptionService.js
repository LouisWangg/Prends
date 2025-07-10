const { Op } = require("sequelize");
const sequelize = require("../config/database");

const sharedDescriptionModel = require("../models/SharedDescriptionModel");

const tenthTitle = ["online chat", "online call", "offline", "home visit"];
const eleventDescriptionMap = {
  1: ["chat", "Chat"],
  2: ["call", "Meet"],
};

const replaceCharactersByIndex = (text, masterValues, indexArray) => {
  let i = 0;

  return text.replace(/{.*?}/g, () => {
    const index = indexArray[i++];
    return masterValues[index] ?? "";
  });
};

// Get Description and Notice datas for Detail page
const getDescriptionsAndNotices = async ({ type, id } = {}) => {
    const idNum = parseInt(id);
    let descriptionIds = [];
    let noticeIds = [];

    if (type.includes("service")) {
      if (idNum < 3) {
        descriptionIds.push(8, 9, 10, 11);
        noticeIds.push(1, 2, 3);
      } else if (idNum == 3) {
        descriptionIds.push(8, 9, 10);
        noticeIds.push(1, 2, 3);
      } else if (idNum == 4) {
        descriptionIds.push(8, 9, 10);
        noticeIds.push(1, 2, 3, 6);
      }
    } else if (type.includes("class")) {
      noticeIds.push(1, 7);
    } else if (type.includes("counselor")) {
      if (idNum < 4) {
        descriptionIds.push(17, 20);
      } else if (idNum > 3 && idNum < 7) {
        descriptionIds.push(18, 20);
      } else if (idNum > 6) {
        descriptionIds.push(19, 20);
      }
      noticeIds.push(1, 2, 4);
    }

    const orderClause = (ids) => [
      sequelize.literal(
        `CASE "sharedDescriptionId" ${ids.map((id, i) => `WHEN ${id} THEN ${i}`).join(" ")} ELSE ${ids.length} END`
      ),
    ];

    const fetchDescriptions = descriptionIds.length > 0
      ? sharedDescriptionModel.findAll({
        attributes: ["sharedDescriptionId", "title", "description"],
        where: { sharedDescriptionId: { [Op.in]: descriptionIds } },
        order: orderClause(descriptionIds),
      })
      : Promise.resolve([]);
    ;

    const fetchNotices = noticeIds.length > 0
      ? sharedDescriptionModel.findAll({
        attributes: ["sharedDescriptionId", "title", "description"],
        where: { sharedDescriptionId: { [Op.in]: noticeIds } },
        order: orderClause(noticeIds),
      })
      : Promise.resolve([]);
    ;

    // Query both in parallel
    const [descriptions, notices] = await Promise.all([fetchDescriptions, fetchNotices]);

    const processedDescriptions = descriptions.map((desc) => {
      const { sharedDescriptionId, title, description } = desc.toJSON();

      if (sharedDescriptionId === 10) {
        const value = tenthTitle[idNum - 1];
        return {
          ...desc.toJSON(),
          title: replaceCharactersByIndex(title, [value], [0]),
        };
      }

      if (sharedDescriptionId === 11 && eleventDescriptionMap[idNum]) {
        const values = eleventDescriptionMap[idNum];
        return {
          ...desc.toJSON(),
          title: replaceCharactersByIndex(title, [values[0]], [0]),
          description: replaceCharactersByIndex(description, values, [0, 1]),
        };
      }
      return desc;
    });

    return { descriptions: processedDescriptions, notices };
};

module.exports = {
  getDescriptionsAndNotices,
};
