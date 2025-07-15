const { Op } = require("sequelize");
const sequelize = require("../config/database");

const SharedDescriptionModel = require("../models/SharedDescriptionModel");

const eightTitle = ["online", "offline", "home visit"];
const tenthTitle = ["online chat", "online call", "offline", "home visit"];
const eleventDescriptionMap = {
  1: ["chat", "Chat"],
  2: ["call", "Meet"],
};

const DescriptionIdMap = {
  serviceDescriptions: {
    individualOnline: [8, 9, 10, 11],
    individualOffline: [8, 9, 10],
  },
  serviceNotices: [1, 2, 3],
  homeVisitNotices: [1, 2, 3, 6],
  class: [1, 7],
  counselorNotices: [1, 2, 4],
  counselorDescriptions: {
    junior: [17, 20],
    middle: [18, 20],
    senior: [19, 20],
  },
};

const replaceCharactersByIndex = (text, masterValues, indexArray) => {
  let i = 0;

  return text.replace(/{.*?}/g, () => {
    const index = indexArray[i++];
    return masterValues[index] ?? "";
  });
};

const formatTitleFromItemType = (itemType) => {
  if (!itemType) return "";
  return itemType.includes("-")
    ? itemType
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : itemType.charAt(0).toUpperCase() + itemType.slice(1);
};

// Get Description and Notice datas for Detail page
const getDescriptionsAndNotices = async ({ type, id, itemType } = {}) => {
  const idNum = parseInt(id);
  const itemTypeValue = itemType?.toLowerCase();

  let descriptionIds = [];
  let noticeIds = [];

  if (type.includes("service")) {
    if (idNum < 3)
      descriptionIds = DescriptionIdMap.serviceDescriptions.individualOnline;
    else if (idNum >= 3 || idNum <= 4)
      descriptionIds = DescriptionIdMap.serviceDescriptions.individualOffline;

    noticeIds =
      idNum === 4
        ? DescriptionIdMap.homeVisitNotices
        : DescriptionIdMap.serviceNotices;
  } else if (type.includes("class")) {
    noticeIds = DescriptionIdMap.class;
  } else if (type.includes("counselor")) {
    if (itemTypeValue.includes("junior"))
      descriptionIds = DescriptionIdMap.counselorDescriptions.junior;
    else if (itemTypeValue.includes("middle"))
      descriptionIds = DescriptionIdMap.counselorDescriptions.middle;
    else if (itemTypeValue.includes("senior"))
      descriptionIds = DescriptionIdMap.counselorDescriptions.senior;

    noticeIds = DescriptionIdMap.counselorNotices;
  }

  const orderClause = (ids) => [
    sequelize.literal(
      `CASE "sharedDescriptionId" ${ids.map((id, i) => `WHEN ${id} THEN ${i}`).join(" ")} ELSE ${ids.length} END`
    ),
  ];

  const fetchDescriptions =
    descriptionIds.length > 0
      ? SharedDescriptionModel.findAll({
          attributes: ["sharedDescriptionId", "title", "description"],
          where: { sharedDescriptionId: { [Op.in]: descriptionIds } },
          order: orderClause(descriptionIds),
        })
      : Promise.resolve([]);

  const fetchNotices =
    noticeIds.length > 0
      ? SharedDescriptionModel.findAll({
          attributes: ["sharedDescriptionId", "title", "description"],
          where: { sharedDescriptionId: { [Op.in]: noticeIds } },
          order: orderClause(noticeIds),
        })
      : Promise.resolve([]);
  // Query both in parallel
  const [descriptions, notices] = await Promise.all([
    fetchDescriptions,
    fetchNotices,
  ]);

  const processedDescriptions = descriptions.map((desc) => {
    const { sharedDescriptionId, title, description } = desc.toJSON();

    if (sharedDescriptionId === 8) {
      const idToIndex = { 1: 0, 2: 0, 3: 1, 4: 2 };
      const index = idToIndex[idNum] ?? 0;
      const value = eightTitle[index];

      return {
        ...desc.toJSON(),
        title: replaceCharactersByIndex(title, [value], [0]),
      };
    }

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

// Get Title and Subtitle datas for List page
const getTitlesAndSubtitles = async ({ type, itemType } = {}) => {
  let data, title, description, result;

  if (type.includes("service") || type.includes("class")) {
    title = formatTitleFromItemType(itemType);

    result = await SharedDescriptionModel.findOne({
      where: {
        title: {
          [Op.iLike]: title, // case-insensitive match
        },
      },
    });
  } else if (type.includes("counselor")) {
    const pattern = `%itu ${itemType} expert%`;

    result = await SharedDescriptionModel.findOne({
      where: {
        title: {
          [Op.iLike]: pattern, // case-insensitive match
        },
      },
    });

    title = `${formatTitleFromItemType(itemType)} Expert`;
  }

  if (!result) return {};
  data = result.toJSON();
  description = data.description;

  return {
    title,
    description,
  };
};

module.exports = {
  getDescriptionsAndNotices,
  getTitlesAndSubtitles,
};
