import { ObjectId } from "mongodb";
export const replaceMongoIdInArraySingle = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item?._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObjectSingle = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id?.toString() };
  return updatedObj;
};

export const replaceMongoIdInArray = (arr) => {
  if (!Array.isArray(arr)) {
    return arr;
  }
  return arr.map((obj) => {
    const updatedObj = { ...obj };
    Object.keys(updatedObj).forEach((key) => {
      if (key.startsWith("_")) {
        const value = updatedObj[key].toString();
        updatedObj["id"] = value;
        delete updatedObj[key];
      } else if (
        typeof updatedObj[key] === "object" &&
        updatedObj[key] !== null
      ) {
        if (Array.isArray(updatedObj[key])) {
          updatedObj[key] = updatedObj[key].map((item) =>
            typeof item === "object" && item !== null
              ? replaceMongoIdInObject(item)
              : item
          );
        } else {
          updatedObj[key] = replaceMongoIdInObject([updatedObj[key]]);
        }
      } else if (updatedObj[key] instanceof ObjectId) {
        updatedObj[key] = updatedObj[key].toString();
      }
    });
    return updatedObj;
  });
};

export const replaceMongoIdInObject = (obj) => {
  const updatedObj = { ...obj };
  Object.keys(updatedObj).forEach((key) => {
    if (key === "_id") {
      updatedObj["id"] = updatedObj._id.toString();
      delete updatedObj["_id"];
    } else if (Array.isArray(updatedObj[key])) {
      updatedObj[key] = updatedObj[key].map((item) =>
        typeof item === "object" && item !== null
          ? replaceMongoIdInObject(item)
          : item
      );
    } else if (
      typeof updatedObj[key] === "object" &&
      updatedObj[key] !== null
    ) {
      updatedObj[key] = replaceMongoIdInObject(updatedObj[key]);
    } else if (updatedObj[key] instanceof ObjectId) {
      updatedObj[key] = updatedObj[key].toString();
    }
  });
  return updatedObj;
};
