const { Op } = require("sequelize");
const sequelize = require("../config/database");

const SharedDescriptionModel = require("../models/SharedDescriptionModel");

const thirdDescription = ["Konseling", "sesi"];
const eightTitle = ["online", "offline", "home visit"];
const tenthTitle = ["online chat", "online call", "offline", "home visit"];
const eleventDescriptionMap = {
  1: ["chat", "Chat"],
  2: ["call", "Meet"],
};

const descriptionIdMap = {
  serviceDescriptions: {
    individualOnline: [8, 9, 10, 11],
    individualOffline: [8, 9, 10],
    couple: [13, 14],
    family: [30, 31],
    assessment: [15],
    theraphy: [32],
    interview: [34, 35],
  },
  serviceNotices: {
    individualAndInterview: [1, 2, 3],
    individualHomeVisit: [1, 2, 3, 6],
    coupleAndFamily: [1, 2, 4],
    assessment: [1, 2, 5],
    theraphy: [33, 1, 2, 3],
  },
  class: [1, 7],
  counselorNotices: [1, 2, 4],
  counselorDescriptions: {
    junior: [17, 20],
    middle: [18, 20],
    senior: [19, 20],
  },
};

const serviceMapping = [
  {
    key: "individu",
    match: (v) => v.includes("individu"),
    description: (idNum) =>
      idNum < 3
        ? descriptionIdMap.serviceDescriptions.individualOnline
        : descriptionIdMap.serviceDescriptions.individualOffline,
    notice: (idNum) => 
      idNum === 4 
        ? descriptionIdMap.serviceNotices.individualHomeVisit
        : descriptionIdMap.serviceNotices.individualAndInterview,
  },
  {
    key: "pasangan",
    match: (v) => v.includes("pasangan"),
    description: () => descriptionIdMap.serviceDescriptions.couple,
    notice: () => descriptionIdMap.serviceNotices.coupleAndFamily,
  },
  {
    key: "keluarga",
    match: (v) => v.includes("keluarga"),
    description: () => descriptionIdMap.serviceDescriptions.family,
    notice: () => descriptionIdMap.serviceNotices.coupleAndFamily,
  },
  {
    key: "assessment",
    match: (v) => v.includes("assessment"),
    description: () => descriptionIdMap.serviceDescriptions.assessment,
    notice: () => descriptionIdMap.serviceNotices.assessment,
  },
  {
    key: "theraphy",
    match: (v) => v.includes("theraphy"),
    description: () => descriptionIdMap.serviceDescriptions.theraphy,
    notice: () => descriptionIdMap.serviceNotices.theraphy,
  },
  {
    key: "wawancara",
    match: (v) => v.includes("wawancara"),
    description: () => descriptionIdMap.serviceDescriptions.interview,
    notice: () => descriptionIdMap.serviceNotices.individualAndInterview,
  },
];

const counselorMapping = [
  {
    key: "junior",
    match: (v) => v.includes("junior"),
    description: () => descriptionIdMap.counselorDescriptions.junior,
    notice: () => descriptionIdMap.counselorNotices,
  }, 
  {
    key: "middle",
    match: (v) => v.includes("middle"),
    description: () => descriptionIdMap.counselorDescriptions.middle,
    notice: () => descriptionIdMap.counselorNotices,
  }, 
  {
    key: "senior",
    match: (v) => v.includes("senior"),
    description: () => descriptionIdMap.counselorDescriptions.senior,
    notice: () => descriptionIdMap.counselorNotices,
  },
];

const replaceCharactersByIndex = (text, masterValues, indexArray) => {
  let i = 0;

  return text.replace(/{.*?}/g, () => {
    const index = indexArray[i++];
    return masterValues[index] ?? "";
  });
};

const formatTitleFromType = (type) => {
  if (!type) return "";
  return type.includes("-")
    ? type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    : type.charAt(0).toUpperCase() + type.slice(1);
};

// Get Description and Notice datas for Detail page
const getDescriptionsAndNotices = async ({ itemType, id, subType } = {}) => {
  const idNum = parseInt(id);
  const subTypeValue = subType?.toLowerCase();
  if (!subTypeValue) return { descriptions: [], notices: [] };

  let descriptionIds = [];
  let noticeIds = [];

  if (itemType.includes("service")) {
    const dataFound = serviceMapping.find((data) => data.match(subTypeValue));

    if (dataFound) {
      descriptionIds = dataFound.description(idNum);
      noticeIds = dataFound.notice(idNum);
    }
  } else if (itemType.includes("class")) {
    noticeIds = descriptionIdMap.class;
  } else if (itemType.includes("counselor")) {
    const dataFound = counselorMapping.find((data) => data.match(subTypeValue));
    
    if (dataFound) {
      descriptionIds = dataFound.description();
      noticeIds = dataFound.notice();
    }
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

  const processedNotices = notices.map((not) => {
    const { sharedDescriptionId, description } = not.toJSON();

    if (sharedDescriptionId === 3) {
      const index = subTypeValue?.includes("individu") ? 0 : 1;
      const value = thirdDescription[index];

      return {
        ...not.toJSON(),
        description: replaceCharactersByIndex(description, [value], [0]),
      };
    }
    return not;
  });

  return { descriptions: processedDescriptions, notices: processedNotices };
};

// Get Title and Subtitle datas for List page
const getTitlesAndSubtitles = async ({ itemType, subType } = {}) => {
  let data, title, description, result;

  if (itemType.includes("service") || itemType.includes("class")) {
    const results = await SharedDescriptionModel.findAll({
      where: {
        title: {
          [Op.like]: `%${formatTitleFromType(subType)}%`, 
        },
      },
    });

    if (results.length > 1) {
      result = results.find((item) => item.description === null);
    } else {
      result = results[0];
    }
  } else if (itemType.includes("counselor")) {
    const pattern = `%itu ${subType} expert%`;

    result = await SharedDescriptionModel.findOne({
      where: {
        title: {
          [Op.iLike]: pattern, // case-insensitive match
        },
      },
    });

    title = `${formatTitleFromType(subType)} Expert`;
  }

  if (!result) return {};
  data = result.toJSON();

  if (itemType.includes("service") || itemType.includes("class")) title = data.title;
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
