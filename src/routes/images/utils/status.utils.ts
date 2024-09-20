type Status = {
  message: string;
  fileName?: string;
};

const statusList: Record<string, Status> = {};

const setStatus = (fileId: string, newStatus: Status) => {
  statusList[fileId] = newStatus;
};

const getStatus = (fileId: string) => {
  return statusList[fileId];
};

const checkStatusExistance = (fileId: string) => {
  return fileId in statusList;
};

export { getStatus, setStatus, checkStatusExistance };
